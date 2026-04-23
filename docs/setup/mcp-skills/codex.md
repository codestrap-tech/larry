# Codex Setup

## Quick start

Run these two commands to add the Larry MCP server and install the React skill:

```bash
codex mcp add codestrap-node-generators --env LARRY_API_KEY=your-api-key-here \
  -- npx -y @codestrap/node-generators@latest

npx -p @codestrap/node-generators install-skills --codex --project
```

Replace `your-api-key-here` with your API key from [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/).

That's it. Codex now has access to Larry's React generators and knows how to use them.

## What each command does

**MCP server** — `codex mcp add` registers the Larry generator tools as an MCP server. Codex can now call generators like `react_component_generator`, `tanstack_query_generator`, etc. directly during a session.

**Skills** — `install-skills --codex --project` copies the `larry-react` skill into your project's `.agents/skills/` directory. The skill teaches Codex how to decompose feature requests into generator calls, what inputs produce the best output, and how to sequence multi-generator workflows.

## Prerequisites

- Node.js 18+
- [Codex CLI](https://github.com/openai/codex) installed
- A `LARRY_API_KEY` — sign in with GitHub at [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/) and generate one from the dashboard

## Options

### User-level vs project-level skills

By default, `--project` installs skills to `$CWD/.agents/skills/larry-react`. Without it, skills install to `~/.agents/skills/larry-react` (available across all projects):

```bash
npx -p @codestrap/node-generators install-skills --codex
```

### User-level MCP

`codex mcp add` writes to `~/.codex/config.toml` by default, making the server available globally. If you prefer project-scoped config, you can edit `.codex/config.toml` in your repo root directly:

```toml
[mcp_servers.codestrap-node-generators]
command = "npx"
args = ["-y", "@codestrap/node-generators@latest"]

[mcp_servers.codestrap-node-generators.env]
LARRY_API_KEY = "your-api-key-here"
```

Project-scoped config only takes effect in [trusted projects](https://github.com/openai/codex#security).

## Verify

Run `codex` to open the TUI, then type `/mcp` to see active servers. You should see `codestrap-node-generators` listed with its available tools:

- `react_component_generator`
- `react_hook_generator`
- `react_module_generator`
- `tanstack_form_generator`
- `tanstack_query_generator`
- `tanstack_table_generator`

Then try a prompt like:

> Generate a UserCard component with an avatar on the left, name and email on the right, and a Follow button.

Codex will use the skill to craft a high-quality generator call and write the files to your project.
