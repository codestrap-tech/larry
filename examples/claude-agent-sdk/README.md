# Claude Agent SDK + Larry Generators

This example shows how to build a custom Claude agent using the [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) with Larry generators as tools.

Use it as a starting point for building your own agent workflows — the pattern here (define tools, register them in an MCP server, run an interactive agent loop) applies to any set of tools, not just Larry generators.

## Setup

```bash
cd examples/claude-agent-sdk
npm install
```

Set environment variables:

```bash
export ANTHROPIC_API_KEY=your-anthropic-key
export LARRY_API_KEY=your-larry-key
```

Get your Larry API key from [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/).

## Run

```bash
npm run start
```

## How it works

Each tool is defined with the Agent SDK's `tool()` helper, wrapping a public generator from `@codestrap/node-generators` via the `toolsRegistry`. Tools are grouped into an MCP server with `createSdkMcpServer()` and passed to `query()`, which runs the agent loop.

### React tools

| Tool | Generates |
| --- | --- |
| `react_component_generator` | Component + Stories + CSS Module |
| `react_hook_generator` | Custom hook |
| `react_module_generator` | Glue module wiring components and hooks |
| `tanstack_query_generator` | Data fetching service hook |
| `tanstack_table_generator` | Table component |
| `tanstack_form_generator` | Form with validation |

### Palantir Foundry tools

| Tool | Generates |
| --- | --- |
| `palantir_compute_module_generator` | Compute module harness |
| `palantir_dao` | Data access object |
| `palantir_dao_delegate` | DAO delegate (CRUD operations) |
| `curry_factory` | Curried factory |
| `types_generator` | Shared TypeScript types |
