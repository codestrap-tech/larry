# Claude Code Setup

## Quick start

Run these two commands to add the Larry MCP server and install the React skill:

```bash
claude mcp add -s project codestrap-node-generators -e LARRY_API_KEY=your-api-key-here \
  -- npx -y @codestrap-tech/node-generators

npx -p @codestrap-tech/node-generators install-skills --claude --project
```

Replace `your-api-key-here` with your API key from [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/).

That's it. Claude Code now has access to Larry's React generators and knows how to use them.

## What each command does

**MCP server** — `claude mcp add` registers the Larry generator tools as an MCP server. Claude Code can now call generators like `react_component_generator`, `tanstack_query_generator`, etc. directly during a session.

**Skills** — `install-skills --claude --project` copies the `larry-react` skill into your project's `.claude/skills/` directory. The skill teaches Claude Code how to decompose feature requests into generator calls, what inputs produce the best output, and how to sequence multi-generator workflows.

## Prerequisites

- Node.js 18+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- A `LARRY_API_KEY` — sign in with GitHub at [larry-as-a-service.vercel.app](https://larry-as-a-service.vercel.app/) and generate one from the dashboard

## Options

### User-level vs project-level skills

By default, `--project` installs skills to `$CWD/.claude/skills/larry-react`. Without it, skills install to `~/.claude/skills/larry-react` (available across all projects):

```bash
npx -p @codestrap-tech/node-generators install-skills --claude
```

### User-level MCP

To register the MCP server for all projects instead of just the current one, add the `-s user` scope:

```bash
claude mcp add -s user codestrap-node-generators -e LARRY_API_KEY=your-api-key-here \
  -- npx -y @codestrap-tech/node-generators
```

## Verify

Start a Claude Code session and ask it to list its available MCP tools. You should see Larry generators:

- `react_component_generator`
- `react_hook_generator`
- `react_module_generator`
- `tanstack_form_generator`
- `tanstack_query_generator`
- `tanstack_table_generator`

Then try a prompt like:

> Generate a UserCard component with an avatar on the left, name and email on the right, and a Follow button.

Claude Code will use the skill to craft a high-quality generator call and write the files to your project.
