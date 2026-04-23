# Cursor Setup

## Quick start

Add the Larry MCP server to your Cursor config. Choose the option that fits your workflow:

### Option A — Project config (recommended for teams)

Create or edit `.cursor/mcp.json` in your repo root:

```json
{
  "mcpServers": {
    "codestrap-node-generators": {
      "cwd": "${workspaceFolder}",
      "env": { "LARRY_API_KEY": "${env:LARRY_API_KEY}" },
      "command": "npx",
      "args": ["-y", "@codestrap/node-generators@latest"]
    }
  }
}
```

Cursor resolves `${env:LARRY_API_KEY}` from your environment at startup. Set the variable in your shell profile (`~/.zshrc`, `~/.bashrc`, etc.) or a `.env` file your shell sources on startup — do not commit the key itself.

This config file is safe to commit: it contains no secrets.

### Option B — Global config (personal machine)

Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "codestrap-node-generators": {
      "cwd": "${workspaceFolder}",
      "env": { "LARRY_API_KEY": "your-api-key-here" },
      "command": "npx",
      "args": ["-y", "@codestrap/node-generators@latest"]
    }
  }
}
```

Replace `your-api-key-here` with your API key from [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/). The global config lives outside any repo, so hardcoding the key here is safe.

That's it. Cursor now has access to Larry's React generators.

## What this does

**MCP server** — Cursor connects to the Larry generator tools as an MCP server. During a session, the agent can call generators like `react_component_generator`, `tanstack_query_generator`, etc. directly.

## Prerequisites

- Node.js 18+
- [Cursor](https://cursor.com/) installed
- A `LARRY_API_KEY` — sign in with GitHub at [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/) and generate one from the dashboard

## Options

### The `cwd` field

The `"cwd": "${workspaceFolder}"` field sets the working directory for the MCP server process to the repo root. Cursor resolves `${workspaceFolder}` automatically. This ensures generators write files relative to your project, not an arbitrary temp directory. The field is optional but recommended.

> **Note:** The `mcpServers` root key is required. If the file exists but the key is missing or misspelled, Cursor silently ignores it with no error message.

### Skills

Cursor Agent Skills (`.cursor/skills/`) are not yet supported by the `install-skills` command. Skill installation for Cursor is coming soon.

## Verify

Open a Cursor agent session and ask it to list its available MCP tools. You should see Larry generators:

- `react_component_generator`
- `react_hook_generator`
- `react_module_generator`
- `tanstack_form_generator`
- `tanstack_query_generator`
- `tanstack_table_generator`

Then try a prompt like:

> Generate a UserCard component with an avatar on the left, name and email on the right, and a Follow button.

Cursor will use the MCP tools to craft a high-quality generator call and write the files to your project.
