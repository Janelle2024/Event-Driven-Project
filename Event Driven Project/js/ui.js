const UI = (function () {
  const el = {
    amount: document.getElementById("amount"),
    from: document.getElementById("from"),
    to: document.getElementById("to"),
    fromSearch: document.getElementById("from-search"),
    toSearch: document.getElementById("to-search"),
    swap: document.getElementById("swap"),
    refresh: document.getElementById("refresh"),
    resultValue: document.getElementById("result-value"),
    resultRate: document.getElementById("result-rate"),
    status: document.getElementById("status"),
    lastUpdated: document.getElementById("last-updated")
  };

  function buildOptions(codes) {
    let html = "";
    for (const region in CONFIG.REGIONS) {
      const list = CONFIG.REGIONS[region].filter(function (c) { return codes.indexOf(c) !== -1; });
      if (!list.length) continue;
      html += '<optgroup label="' + region + '">';
      list.forEach(function (code) {
        const name = CONFIG.CURRENCY_NAMES[code] || code;
        html += '<option value="' + code + '">' + code + " — " + name + "</option>";
      });
      html += "</optgroup>";
    }
    return html;
  }

  function populateSelects(fromDefault, toDefault) {
    const all = [];
    for (const r in CONFIG.REGIONS) all.push.apply(all, CONFIG.REGIONS[r]);

    el.from.dataset.all = all.join(",");
    el.to.dataset.all = all.join(",");

    el.from.innerHTML = buildOptions(all);
    el.to.innerHTML = buildOptions(all);
    el.from.value = fromDefault;
    el.to.value = toDefault;
    syncSearch("from");
    syncSearch("to");
  }

  function filterSelect(select, query) {
    const all = select.dataset.all.split(",");
    const q = query.trim().toLowerCase();
    const keep = select.value;
    const match = all.filter(function (code) {
      if (!q) return true;
      const name = (CONFIG.CURRENCY_NAMES[code] || code).toLowerCase();
      return code.toLowerCase().indexOf(q) !== -1 || name.indexOf(q) !== -1;
    });
    select.innerHTML = buildOptions(match);
    const kept = Array.prototype.find.call(select.options, function (o) { return o.value === keep; });
    if (kept) select.value = keep;
    else if (select.options.length) select.selectedIndex = 0;
  }

  function syncSearch(which) {
    const select = which === "from" ? el.from : el.to;
    const box = which === "from" ? el.fromSearch : el.toSearch;
    if (!select.value) return;
    box.value = select.value + " — " + (CONFIG.CURRENCY_NAMES[select.value] || select.value);
  }

  function getValues() {
    return { amount: el.amount.value, from: el.from.value, to: el.to.value };
  }

  function showResult(value, rateText) {
    el.resultValue.textContent = value;
    el.resultRate.textContent = rateText;
  }

  function showStatus(message, type) {
    el.status.textContent = message;
    el.status.className = "status";
    if (type === "ok") el.status.classList.add("status--ok");
    if (type === "error") el.status.classList.add("status--error");
  }

  function showLastUpdated(date) {
    el.lastUpdated.textContent = date
      ? "Last updated " + date.toLocaleTimeString() + " · auto-refresh every 5 min"
      : "";
  }

  function setLoading(isLoading) {
    el.refresh.disabled = isLoading;
    el.refresh.textContent = isLoading ? "Refreshing…" : "Refresh Rates";
  }

  function swapCurrencies() {
    const v = getValues();
    el.from.value = v.to;
    el.to.value = v.from;
    syncSearch("from");
    syncSearch("to");
  }

  function bind(handlers) {
    el.amount.addEventListener("input", handlers.onChange);
    el.swap.addEventListener("click", handlers.onSwap);
    el.refresh.addEventListener("click", handlers.onRefresh);

    el.fromSearch.addEventListener("input", function () {
      filterSelect(el.from, el.fromSearch.value);
      handlers.onChange();
    });
    el.toSearch.addEventListener("input", function () {
      filterSelect(el.to, el.toSearch.value);
      handlers.onChange();
    });
    el.from.addEventListener("change", function () {
      syncSearch("from");
      handlers.onChange();
    });
    el.to.addEventListener("change", function () {
      syncSearch("to");
      handlers.onChange();
    });
  }

  return {
    populateSelects: populateSelects,
    getValues: getValues,
    showResult: showResult,
    showStatus: showStatus,
    showLastUpdated: showLastUpdated,
    setLoading: setLoading,
    swapCurrencies: swapCurrencies,
    bind: bind
  };
})();
