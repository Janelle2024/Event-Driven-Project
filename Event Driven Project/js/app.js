// app.js — connects the UI, the converter and the API
document.addEventListener("DOMContentLoaded", function () {
  try {
    UI.populateSelects(CONFIG.DEFAULT_FROM, CONFIG.DEFAULT_TO);
    start();
  } catch (err) {
    UI.showStatus("Startup error: " + err.message, "error");
    console.error(err);
  }

  function start() {
    let currentRates = null;
    let inFlight = false;

    async function loadRates() {
      if (inFlight) return;
      inFlight = true;
      UI.setLoading(true);
      try {
        currentRates = await RateAPI.fetchRates();
        UI.showStatus("Live rates · " + new Date().toLocaleTimeString(), "ok");
        UI.showLastUpdated(RateAPI.getLastUpdated()); // Inayos ang RateAPI
        render();
      } catch (err) {
        UI.showStatus("Error: " + err.message, "error");
        UI.showResult("—", "Could not load rates — check your connection, then hit Refresh.");
        UI.showLastUpdated(null);
      } finally {
        inFlight = false;
        UI.setLoading(false);
      }
    }

    function render() {
      if (!currentRates) return;
      const v = UI.getValues();
      
      if (v.amount.trim() === "") {
        UI.showResult("—", "Enter an amount to convert");
        return;
      }

      try {
        const converted = Converter.convert(v.amount, v.from, v.to, currentRates);
        const unit = Converter.convert(1, v.from, v.to, currentRates);
        
        UI.showResult(
          Converter.formatCurrency(converted, v.to),
          "1 " + v.from + " = " + unit.toFixed(4) + " " + v.to
        );
      } catch (err) {
        UI.showResult("—", err.message);
      }
    }

    UI.bind({
      onChange: function () { render(); },
      onSwap: function () {
        UI.swapCurrencies();
        render();
      },
      onRefresh: function () {
        RateAPI.clearCache();
        loadRates();
      }
    });

    setInterval(loadRates, 60000);
    loadRates();
  } 
});