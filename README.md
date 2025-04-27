# mcp

A Model Context Protocol (MCP) server for interacting with Binance market data using Bun and TypeScript.

## Features
- Query Binance for real-time and historical market data
- Expose endpoints for:
  - Symbol exchange info
  - Trade history
  - Order book depth
  - Current average price
  - 24hr price ticker
  - Rolling window ticker
  - Aggregated trades
  - Kline/candlestick data

## Setup

Install dependencies:

```bash
bun install
```

## Running the Server

```bash
bun run index.ts
```

## Available Tools (API Endpoints)

- `ExchangeInfoOfASymbole`: Get exchange info for a symbol
- `ExchangeInfoOfAllSymbole`: Get exchange info for all symbols
- `getTradeData`: Get kline/candlestick data
- `AggTrades`: Get recent aggregated trades
- `TradeHistory`: Get recent trade history
- `Depth`: Get current order book depth
- `CurrentAvgPrice`: Get current average price
- `PriceTickerIn24Hr`: Get 24hr price ticker
- `TradingDayTicker`: Get trading day ticker for symbols
- `SymbolPriceTicker`: Get price ticker for symbol(s)
- `SymbolOrderBookTicker`: Get order book ticker for symbol(s)
- `RollingWindowTicker`: Get rolling window ticker for symbol(s)

## Example Usage

You can interact with the MCP server using any MCP-compatible client or by extending the server with your own logic.

---

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
