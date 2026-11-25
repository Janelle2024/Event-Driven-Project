// converter.js — conversion math only
const Converter = {
  // every rate arrives as "1 USD = X <currency>", so cross-rates go through USD
  convert(amount, from, to, rates) {
    if (!rates || rates[from] == null || rates[to] == null) {
      throw new Error("Missing rate for selected currency");
    }
    
    const cleanAmount = String(amount).replace(/,/g, "").trim();
    const num = Number(cleanAmount) || 0;
    
    const inUsd = num / rates[from];
    return inUsd * rates[to];
  },

  formatCurrency(value, code) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: code,
        maximumFractionDigits: 2
      }).format(value);
    } catch (e) {
      return value.toFixed(2) + " " + code;
    }
  }
};