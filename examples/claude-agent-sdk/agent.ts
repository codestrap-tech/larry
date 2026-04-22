#!/usr/bin/env npx tsx

import { createSdkMcpServer, query, tool } from '@anthropic-ai/claude-agent-sdk';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {
  toolsRegistry,
  palantirToolsRegistry,
  type GeneratedCode,
} from '@codestrap/node-generators';
import type { BetaContentBlock } from '@anthropic-ai/sdk/resources/beta';

type TranscriptTurn =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string };

// ---------------------------------------------------------------------------
// Tool definitions
//
// Each tool wraps a public generator from @codestrap/node-generators.
// The Agent SDK's `tool()` helper takes a Zod schema and a run function.
// The schema comes directly from the toolDef — it's what the LLM sees as the
// tool's input shape. The run function parses the input and calls the
// generator's public `.run()` method.
// ---------------------------------------------------------------------------

function formatResult(result: GeneratedCode): string {
  return (
    result
      .map((f: { file: string; summary: string }) => `${f.file}: ${f.summary}`)
      .join('\n') || 'Generated successfully.'
  );
}

const reactComponentTool = tool(
  toolsRegistry.reactComponentToolDef.name,
  toolsRegistry.reactComponentToolDef.description,
  toolsRegistry.reactComponentToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.reactComponentToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/components',
        schema: input,
        preact: input.options.preact ?? false,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const reactHookTool = tool(
  toolsRegistry.reactHookToolDef.name,
  toolsRegistry.reactHookToolDef.description,
  toolsRegistry.reactHookToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.reactHookToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/hooks',
        schema: input,
        preact: input.options.preact ?? false,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const reactModuleTool = tool(
  toolsRegistry.reactModuleToolDef.name,
  toolsRegistry.reactModuleToolDef.description,
  toolsRegistry.reactModuleToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.reactModuleToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/modules',
        schema: input,
        preact: input.options.preact ?? false,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const tanstackQueryTool = tool(
  toolsRegistry.tanstackQueryToolDef.name,
  toolsRegistry.tanstackQueryToolDef.description,
  toolsRegistry.tanstackQueryToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.tanstackQueryToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/hooks',
        schema: input,
        preact: input.options.preact ?? false,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const tanstackTableTool = tool(
  toolsRegistry.tanstackTableToolDef.name,
  toolsRegistry.tanstackTableToolDef.description,
  toolsRegistry.tanstackTableToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.tanstackTableToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/components',
        schema: input,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const tanstackFormTool = tool(
  toolsRegistry.tanstackFormToolDef.name,
  toolsRegistry.tanstackFormToolDef.description,
  toolsRegistry.tanstackFormToolDef.schema.shape,
  async (input) => {
    try {
      const result = await toolsRegistry.tanstackFormToolDef.run({
        name: input.name,
        outputPath: input.options.outputPath ?? 'src/components',
        schema: input,
      });
      return { content: [{ type: 'text', text: formatResult(result) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

// ---------------------------------------------------------------------------
// Palantir Foundry tools
// ---------------------------------------------------------------------------

const computeModuleTool = tool(
  palantirToolsRegistry.palantirComputeModuleToolDef.name,
  palantirToolsRegistry.palantirComputeModuleToolDef.description,
  palantirToolsRegistry.palantirComputeModuleToolDef.schema.shape,
  async (input) => {
    try {
      await palantirToolsRegistry.palantirComputeModuleToolDef.run(input);
      return { content: [{ type: 'text', text: 'Compute module generated successfully.' }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const daoTool = tool(
  palantirToolsRegistry.palantirDaoToolDef.name,
  palantirToolsRegistry.palantirDaoToolDef.description,
  palantirToolsRegistry.palantirDaoToolDef.schema.shape,
  async (input) => {
    try {
      await palantirToolsRegistry.palantirDaoToolDef.run(input);
      return { content: [{ type: 'text', text: 'DAO generated successfully.' }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const daoDelegateTool = tool(
  palantirToolsRegistry.palantirDaoDelegateToolDef.name,
  palantirToolsRegistry.palantirDaoDelegateToolDef.description,
  palantirToolsRegistry.palantirDaoDelegateToolDef.schema.shape,
  async (input) => {
    try {
      await palantirToolsRegistry.palantirDaoDelegateToolDef.run(input);
      return { content: [{ type: 'text', text: 'DAO delegate generated successfully.' }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const factoryTool = tool(
  palantirToolsRegistry.curryFactoryToolDef.name,
  palantirToolsRegistry.curryFactoryToolDef.description,
  palantirToolsRegistry.curryFactoryToolDef.schema.shape,
  async (input) => {
    try {
      await palantirToolsRegistry.curryFactoryToolDef.run(input);
      return { content: [{ type: 'text', text: 'Factory generated successfully.' }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);

const typesTool = tool(
  palantirToolsRegistry.typesToolDef.name,
  palantirToolsRegistry.typesToolDef.description,
  palantirToolsRegistry.typesToolDef.schema.shape,
  async (input) => {
    try {
      await palantirToolsRegistry.typesToolDef.run(input);
      return { content: [{ type: 'text', text: 'Types generated successfully.' }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `Generator failed: ${(e as Error).message}` }], isError: true };
    }
  },
);


const allTools = [
  reactComponentTool,
  reactHookTool,
  reactModuleTool,
  tanstackQueryTool,
  tanstackTableTool,
  tanstackFormTool,
  computeModuleTool,
  daoTool,
  daoDelegateTool,
  factoryTool,
  typesTool,
];

const generatorServer = createSdkMcpServer({
  name: 'larry_generators',
  version: '1.0.0',
  tools: allTools,
});

const allowedTools = allTools.map(
  (t) => `mcp__larry_generators__${t.name}` as `mcp__${string}__${string}`,
);

// ---------------------------------------------------------------------------
// Agent loop
// ---------------------------------------------------------------------------

const DEFAULT_AGENT_RETRIES = 3;

function buildPrompt(transcript: TranscriptTurn[]): string {
  return transcript
    .map((turn) => `${turn.role.toUpperCase()}: ${turn.content}`)
    .join('\n\n');
}

function getAssistantText(content: BetaContentBlock[]): string {
  return content
    .filter(
      (block): block is Extract<BetaContentBlock, { type: 'text' }> =>
        block.type === 'text',
    )
    .map((block) => block.text)
    .join('')
    .trim();
}

function formatStopReason(subtype: string, sessionId?: string): string {
  const suffix = sessionId ? ` Session: ${sessionId}.` : '';
  switch (subtype) {
    case 'success':
      return `assistant> Task completed.${suffix}`;
    case 'error_max_turns':
      return `assistant> Stopped because the agent hit the maxTurns limit.${suffix}`;
    case 'error_max_budget_usd':
      return `assistant> Stopped because the agent hit the maxBudgetUsd limit.${suffix}`;
    case 'error_during_execution':
      return `assistant> Stopped because an execution error interrupted the agent loop.${suffix}`;
    case 'error_max_structured_output_retries':
      return `assistant> Stopped because structured output validation failed too many times.${suffix}`;
    default:
      return `assistant> Stopped with result subtype: ${subtype}.${suffix}`;
  }
}

async function runAgentTurn(transcript: TranscriptTurn[]): Promise<void> {
  let lastSessionId: string | undefined;
  let lastLoggedSystemEvent: string | undefined;
  let finalAssistantText = '';

  for await (const message of query({
    prompt: buildPrompt(transcript),
    options: {
      mcpServers: { larry_generators: generatorServer },
      allowedTools,
      model: 'claude-sonnet-4-5-20250929',
      tools: [],
      maxTurns: 10,
      thinking: { type: 'disabled' },
    },
  })) {
    if (message.type === 'system') {
      if (message.subtype === 'init') {
        lastSessionId = message.session_id;
        continue;
      }

      if (message.subtype === 'api_retry') {
        lastSessionId = message.session_id ?? lastSessionId;
        const parts: string[] = [];
        parts.push(
          `attempt=${message.attempt}`,
          `retry_delay_ms=${message.retry_delay_ms}`,
          `session_id=${message.session_id ?? 'unknown'}`,
          `max_retries=${message.max_retries}`,
        );
        if (message.error) {
          parts.push(
            `error=${message.error}`,
            `status=${message.error_status ?? 'unknown'}`,
          );
        }
        const logLine = `[system] api_retry ${parts.join(' ')}`;
        if (logLine !== lastLoggedSystemEvent) {
          console.log(logLine);
          lastLoggedSystemEvent = logLine;
        }
        if (
          typeof message.attempt !== 'undefined' &&
          message.attempt > DEFAULT_AGENT_RETRIES
        ) {
          throw new Error(`Anthropic API retry limit exceeded. ${parts.join(' ')}`);
        }
        continue;
      }

      // Ignore all other system events unless you explicitly want them.
      continue;
    }

    if (message.type === 'assistant') {
      const text = getAssistantText(message.message.content);
      if (text) finalAssistantText = text;

      for (const block of message.message.content) {
        if (block.type === 'tool_use') {
          console.log(
            `[tool called] ${block.name} ${JSON.stringify(block.input)}`,
          );
        }
      }
      continue;
    }

    // In the Agent SDK, `user` messages can include tool results returned to Claude.
    if (message.type === 'user') {
      if (typeof message.message.content === 'string') {
        const text = message.message.content.trim();
        if (text) console.log(`[tool result] ${text}`);
      }
      continue;
    }

    if (message.type === 'result') {
      console.log(`Cost: $${message.total_cost_usd.toFixed(4)}`);

      if (finalAssistantText) {
        transcript.push({ role: 'assistant', content: finalAssistantText });
        console.log(`assistant> ${finalAssistantText}\n`);
      } else {
        console.log(`${formatStopReason(message.subtype, lastSessionId)}\n`);
      }

      // Do not exit the process here.
      return;
    }
  }
}

async function main(): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY environment variable before running.');
    process.exit(1);
  }

  if (!process.env.LARRY_API_KEY) {
    console.error('Set LARRY_API_KEY environment variable before running.');
    process.exit(1);
  }

  const rl = readline.createInterface({ input, output });

  const transcript: TranscriptTurn[] = [
    {
      role: 'system',
      content:
        'You are a code generation assistant. You have access to Larry generators that produce production-grade TypeScript code for React and Palantir Foundry. Use the generators when the user asks you to create components, hooks, forms, tables, data services, compute modules, DAOs, or full features. Ask for clarification when needed.',
    },
  ];

  console.log('Larry Agent SDK example. Type "exit" to quit.\n');

  try {
    while (true) {
      const userInput = (await rl.question('you> ')).trim();
      if (!userInput) continue;
      if (userInput.toLowerCase() === 'exit') break;

      transcript.push({ role: 'user', content: userInput });

      try {
        await runAgentTurn(transcript);
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        console.error(`assistant> ${msg}\n`);
      }
    }
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
