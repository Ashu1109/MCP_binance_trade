import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  AggTrades,
  CurrentAvgPrice,
  Depth,
  ExchangeInfoOfAllSymbole,
  ExchangeInfoOfASymbole,
  getTradeData,
  PriceTickerIn24Hr,
  RollingWindowTicker,
  SymbolOrderBookTicker,
  SymbolPriceTicker,
  TradeHistory,
  TradingDayTicker,
} from "./getTradeData.ts";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

server.tool(
  "ExchangeInfoOfASymbole",
  { symbol: z.string() },
  async ({ symbol }) => {
    const data = await ExchangeInfoOfASymbole({ symbol });
    return { content: [{ type: "text", text: String(data) }] };
  }
);

server.tool("ExchangeInfoOfAllSymbole", {}, async () => {
  const data = await ExchangeInfoOfAllSymbole();
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool(
  "getTradeData",
  {
    symbol: z.string(),
    interval: z.string(),
    startTime: z.number().optional(),
    endTime: z.number().optional(),
    limit: z.number().optional(),
  },
  async (params) => {
    const data = await getTradeData(params);
    return { content: [{ type: "text", text: String(data) }] };
  }
);

server.tool("AggTrades", { symbol: z.string() }, async ({ symbol }) => {
  const data = await AggTrades({ symbol });
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool("TradeHistory", { symbol: z.string() }, async ({ symbol }) => {
  const data = await TradeHistory({ symbol });
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool("Depth", { symbol: z.string() }, async ({ symbol }) => {
  const data = await Depth({ symbol });
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool("CurrentAvgPrice", { symbol: z.string() }, async ({ symbol }) => {
  const data = await CurrentAvgPrice({ symbol });
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool("PriceTickerIn24Hr", { symbol: z.string() }, async ({ symbol }) => {
  const data = await PriceTickerIn24Hr({ symbol });
  return { content: [{ type: "text", text: String(data) }] };
});

server.tool(
  "TradingDayTicker",
  { symbols: z.array(z.string()) },
  async ({ symbols }) => {
    const data = await TradingDayTicker({ symbols });
    return { content: [{ type: "text", text: String(data) }] };
  }
);

server.tool(
  "SymbolPriceTicker",
  {
    symbol: z.string().optional(),
    symbols: z.array(z.string()).optional(),
  },
  async (params) => {
    const data = await SymbolPriceTicker(params);
    return { content: [{ type: "text", text: String(data) }] };
  }
);

server.tool(
  "SymbolOrderBookTicker",
  {
    symbol: z.string().optional(),
    symbols: z.array(z.string()).optional(),
  },
  async (params) => {
    const data = await SymbolOrderBookTicker(params);
    return { content: [{ type: "text", text: String(data) }] };
  }
);

server.tool(
  "RollingWindowTicker",
  {
    symbol: z.string().optional(),
    symbols: z.array(z.string()).optional(),
    windowSize: z.string().optional(),
    type: z.enum(["FULL", "MINI"]).optional(),
  },
  async (params) => {
    const data = await RollingWindowTicker(params);
    return { content: [{ type: "text", text: String(data) }] };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
