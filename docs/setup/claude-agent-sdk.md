# Create Your Own Claude Agent with Larry

Use the Claude Agent SDK when you want more control than editor-native integrations provide. This path is a good fit when you want Larry to be part of a custom agent loop, decide exactly which tools are exposed, and reduce unnecessary model exploration overhead.

## What this integration gives you

- Full control over which Larry generators are available to the agent
- A custom system prompt and workflow for your team or domain
- The ability to expose both React and Palantir generators in one agent
- A path to lower cost than generic chat-based agent flows

## Start with the working example

The repository already includes a runnable example:

- [Claude Agent SDK example](../../examples/claude-agent-sdk/README.md)

That example shows how to:

- wrap Larry generators with the Claude Agent SDK `tool()` helper
- register them in an SDK MCP server
- run an interactive agent loop
- expose both React and Palantir generator families

## When to use this approach

Choose the Agent SDK path when:

- you want a custom Larry-first workflow instead of a general-purpose IDE flow
- you want tighter control over tool usage and prompting
- you want to build an internal agent tailored to one architecture or domain

If you want the fastest setup, use the MCP plus Skills integration instead:

- [Claude Code setup](mcp-skills/claude-code.md)
