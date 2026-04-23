# Antigravity Setup

## Quick start

Add the Larry MCP server via the Antigravity UI:

1. Open the Agent panel, click the `...` menu → **MCP Servers** → **Manage MCP Servers** → **View raw config**
2. Add the following to `~/.gemini/antigravity/mcp_config.json`:

   ```json
   {
     "mcpServers": {
       "codestrap-node-generators": {
         "command": "npx",
         "args": ["-y", "@codestrap/node-generators@latest"],
         "env": { "LARRY_API_KEY": "your-api-key-here" }
       }
     }
   }
   ```

3. Save the file, then click **Refresh** in the Manage MCP Servers panel.

Replace `your-api-key-here` with your API key from [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/). This file lives at `~/.gemini/antigravity/mcp_config.json` — outside any repo and not under version control — so hardcoding the key here is safe.

That's it. Antigravity now has access to Larry's React generators.

## What this does

**MCP server** — Antigravity connects to the Larry generator tools as an MCP server. During a session, the agent can call generators like `react_component_generator`, `tanstack_query_generator`, etc. directly.

## Prerequisites

- Node.js 18+
- [Antigravity](https://deepmind.google/technologies/gemini/antigravity/) installed
- A `LARRY_API_KEY` — sign in with GitHub at [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/) and generate one from the dashboard

## Options

### Refreshing after config changes

After editing `mcp_config.json`, the server won't appear until you click **Refresh** in the Manage MCP Servers panel. If a server shows as disconnected after refresh, verify that Node.js is on your `PATH` and the API key is set correctly.

### Skills

Antigravity Agent Skills (`.agent/skills/`) are not yet supported by the `install-skills` command. Skill installation for Antigravity is coming soon.

## Verify

Open an Antigravity agent session and ask it to list its available MCP tools. You should see Larry generators:

- `react_component_generator`
- `react_hook_generator`
- `react_module_generator`
- `tanstack_form_generator`
- `tanstack_query_generator`
- `tanstack_table_generator`

Then try a prompt like:

> Generate a UserCard component with an avatar on the left, name and email on the right, and a Follow button.

Antigravity will use the MCP tools to craft a high-quality generator call and write the files to your project.
