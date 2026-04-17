// Command cheat sheet data

export const commands = [
  {
    category: 'Starting Tasks',
    items: [
      { command: 'Process [Jira link]', description: 'Start the full pipeline with a Jira story' },
      { command: 'Build/Create/Add/Fix [description]', description: 'Start the full pipeline with a text description' },
      { command: 'Initialize', description: 'First-time project setup — configures context files and scans the codebase' },
      { command: 'Initialize and then build [X]', description: 'Setup + first task in one message' },
    ],
  },
  {
    category: 'Controlling Flow',
    items: [
      { command: 'I approve / Looks good / LGTM', description: 'Advance past any approval gate' },
      { command: 'Approve', description: 'Single-word approval for any gate' },
      { command: 'Skip git', description: 'Skip git operations (Phase 7-8) and handle version control yourself' },
      { command: 'Skip [phase]', description: 'Skip a specific phase (with warning about implications)' },
      { command: 'Stop / Abort', description: 'Pause everything immediately' },
      { command: 'Start over', description: 'Reset and begin a fresh task' },
      { command: 'Go with your recommendations', description: 'Accept all agent suggestions at once during Q&A' },
    ],
  },
  {
    category: 'Getting Information',
    items: [
      { command: 'What\'s the status?', description: 'Get a full progress report on the current task' },
      { command: 'Where are we?', description: 'Quick check on current phase' },
      { command: 'Show me [context file]', description: 'View any context file content directly' },
      { command: 'Why did you choose this approach?', description: 'Ask an agent to explain its reasoning' },
      { command: 'Can you explain that more simply?', description: 'Get a plainer explanation of something complex' },
    ],
  },
  {
    category: 'Changing Direction',
    items: [
      { command: 'Change [X] to [Y]', description: 'Modify a requirement mid-task' },
      { command: 'Actually, change X to Y', description: 'Correct a previous answer' },
      { command: 'Let me restate the requirement: [new version]', description: 'Completely rewrite a requirement' },
      { command: 'I need more explanation about #[N]', description: 'Ask for clarification on a specific question' },
      { command: 'Show me different approaches', description: 'Ask for alternative solutions before committing' },
    ],
  },
];
