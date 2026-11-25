const RateAPI = (function () {
  const PIVOT = "USD"; 
  let cache = { rates: null, timestamp: 0 };

  async function fetchRates() {
    const now = Date.now();

    if (cache.rates && now - cache.timestamp < CONFIG.CACHE_TTL_MS) {
      return cache.rates;
    }

    const res = await fetch(CONFIG.API_BASE + "/" + PIVOT);
    if (!res.ok) throw new Error("API error " + res.status);

    const data = await res.json();
    if (data.result !== "success") throw new Error("Failed to load rates");

    cache = { rates: data.rates, timestamp: now };
    return data.rates;
  }

  function clearCache() {
    cache = { rates: null, timestamp: 0 };
  }

  function getLastUpdated() {
    return cache.timestamp ? new Date(cache.timestamp) : null;
  }

  return {
    fetchRates: fetchRates,
    clearCache: clearCache,
    getLastUpdated: getLastUpdated,
    get base() { return PIVOT; }
  };
})();
