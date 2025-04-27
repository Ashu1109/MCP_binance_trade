import axios from "axios";
const URL = "https://api.binance.com/api/v3/";

const serializeParams = (params: Record<string, any>) => {
  const result: Record<string, any> = {};
  for (const key in params) {
    if (Array.isArray(params[key])) {
      result[key] = JSON.stringify(params[key]);
    } else if (params[key] !== undefined) {
      result[key] = params[key];
    }
  }
  return result;
};

export const ExchangeInfoOfASymbole = async ({
  symbol,
}: {
  symbol: string;
}) => {
  const { data } = await axios.get(`${URL}exchangeInfo`, {
    params: { symbol },
  });
  return JSON.stringify(data);
};

export const ExchangeInfoOfAllSymbole = async () => {
  const { data } = await axios.get(`${URL}exchangeInfo`);
  return data;
};
ExchangeInfoOfAllSymbole();

export const getTradeData = async ({
  symbol,
  interval,
  startTime,
  endTime,
  limit,
}: {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}) => {
  const { data } = await axios.get(`${URL}klines`, {
    params: { symbol, interval, startTime, endTime, limit },
  });
  return JSON.stringify(data);
};

export const AggTrades = async ({ symbol }: { symbol: string }) => {
  const { data } = await axios.get(`${URL}aggTrades`, {
    params: { symbol, limit: 20 },
  });
  return JSON.stringify(data);
};

export const TradeHistory = async ({ symbol }: { symbol: string }) => {
  const { data } = await axios.get(`${URL}historicalTrades`, {
    params: { symbol, limit: 20 },
  });
  return JSON.stringify(data);
};

export const Depth = async ({ symbol }: { symbol: string }) => {
  const { data } = await axios.get(`${URL}depth`, { params: { symbol } });
  return JSON.stringify(data);
};

export const CurrentAvgPrice = async ({ symbol }: { symbol: string }) => {
  const { data } = await axios.get(`${URL}avgPrice`, { params: { symbol } });
  return JSON.stringify(data);
};

export const PriceTickerIn24Hr = async ({ symbol }: { symbol: string }) => {
  const { data } = await axios.get(`${URL}ticker/24hr`, { params: { symbol } });
  return JSON.stringify(data);
};

export const TradingDayTicker = async ({ symbols }: { symbols: string[] }) => {
  const { data } = await axios.get(`${URL}ticker/tradingDay`, {
    params: serializeParams({ symbols }),
  });
  return JSON.stringify(data);
};

export const SymbolPriceTicker = async ({
  symbol,
  symbols,
}: {
  symbol?: string;
  symbols?: string[];
}) => {
  const { data } = await axios.get(`${URL}ticker/price`, {
    params: serializeParams({ symbol, symbols }),
  });
  return JSON.stringify(data);
};

export const SymbolOrderBookTicker = async ({
  symbol,
  symbols,
}: {
  symbol?: string;
  symbols?: string[];
}) => {
  const { data } = await axios.get(`${URL}ticker/bookTicker`, {
    params: serializeParams({ symbol, symbols }),
  });
  return JSON.stringify(data);
};

export const RollingWindowTicker = async ({
  symbol,
  symbols,
  windowSize,
  type,
}: {
  symbol?: string;
  symbols?: string[];
  windowSize?: string;
  type?: "FULL" | "MINI";
}) => {
  const { data } = await axios.get(`${URL}ticker`, {
    params: serializeParams({ symbol, symbols, windowSize, type }),
  });
  return JSON.stringify(data);
};
