// config.js — settings and currency lists
const CONFIG = {
  API_BASE:"https://open.er-api.com/v6/latest",
  CACHE_TTL_MS: 5 * 60 * 1000,
  DEFAULT_FROM: "USD",
  DEFAULT_TO: "PHP",

  REGIONS: {
    Americas: ["USD", "CAD", "MXN", "BRL", "ARS", "CLP", "COP", "PEN"],
    Europe: ["EUR", "GBP", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RUB", "TRY"],
    Asia: ["PHP", "JPY", "CNY", "KRW", "INR", "SGD", "HKD", "THB", "MYR", "IDR", "VND", "TWD", "PKR", "BDT"],
    "Middle East": ["AED", "SAR", "QAR", "KWD", "ILS"],
    Africa: ["ZAR", "EGP", "NGN", "KES", "MAD"],
    Oceania: ["AUD", "NZD"]
  },

  CURRENCY_NAMES: {
    USD: "US Dollar", CAD: "Canadian Dollar", MXN: "Mexican Peso", BRL: "Brazilian Real",
    ARS: "Argentine Peso", CLP: "Chilean Peso", COP: "Colombian Peso", PEN: "Peruvian Sol",
    EUR: "Euro", GBP: "British Pound", CHF: "Swiss Franc", SEK: "Swedish Krona",
    NOK: "Norwegian Krone", DKK: "Danish Krone", PLN: "Polish Zloty", CZK: "Czech Koruna",
    HUF: "Hungarian Forint", RUB: "Russian Ruble", TRY: "Turkish Lira",
    PHP: "Philippine Peso", JPY: "Japanese Yen", CNY: "Chinese Yuan", KRW: "South Korean Won",
    INR: "Indian Rupee", SGD: "Singapore Dollar", HKD: "Hong Kong Dollar", THB: "Thai Baht",
    MYR: "Malaysian Ringgit", IDR: "Indonesian Rupiah", VND: "Vietnamese Dong",
    TWD: "Taiwan Dollar", PKR: "Pakistani Rupee", BDT: "Bangladeshi Taka",
    AED: "UAE Dirham", SAR: "Saudi Riyal", QAR: "Qatari Riyal", KWD: "Kuwaiti Dinar",
    ILS: "Israeli Shekel", ZAR: "South African Rand", EGP: "Egyptian Pound", NGN: "Nigerian Naira",
    KES: "Kenyan Shilling", MAD: "Moroccan Dirham", AUD: "Australian Dollar", NZD: "New Zealand Dollar"
  }
};
