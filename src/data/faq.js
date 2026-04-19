// FAQ entries for the troubleshooting section

export const faq = [
  {
    id: 'coordinator-missing',
    question: 'Coordinator doesn\'t appear in the Copilot Chat dropdown',
    answer: 'Make sure the file coordinator.agent.md is placed in .github/agents/ at the root of your project. Restart your IDE if needed.',
    category: 'setup',
  },
  {
    id: 'agent-stuck',
    question: 'An agent seems stuck or not responding',
    answer: 'Type "What\'s the status?" to the Coordinator. It will check all context files and report the current state. If truly stuck, try "Start over" to reset.',
    category: 'troubleshooting',
  },
  {
    id: 'dont-understand',
    question: 'I don\'t understand what the agent is asking me',
    answer: 'Say "Can you explain that more simply?" or "I don\'t understand, can you rephrase?" The agent will explain in plainer language with a recommendation.',
    category: 'usage',
  },
  {
    id: 'change-answer',
    question: 'I want to change my answer to an earlier question',
    answer: 'Say "Actually, change X to Y" and the agent will update its understanding. For bigger changes, say "Let me restate the requirement: [new version]."',
    category: 'usage',
  },
  {
    id: 'which-phase',
    question: 'How do I know which phase I\'m in?',
    answer: 'Every agent message includes a phase indicator like [Phase 3/8: PLANNING]. You can also ask "Where are we?" at any time.',
    category: 'usage',
  },
  {
    id: 'without-jira',
    question: 'Can I use DevAgent without Jira?',
    answer: 'Yes. You can paste task descriptions as plain text directly in the chat. Jira integration is optional and only needed if you want to pull stories from Jira automatically.',
    category: 'setup',
  },
  {
    id: 'skip-testing',
    question: 'Can I skip the testing phase?',
    answer: 'Technically yes, you can say "skip testing." But we strongly recommend against it. Tests catch bugs before they reach production and are a key quality gate.',
    category: 'usage',
  },
  {
    id: 'close-vscode',
    question: 'What if I close my editor in the middle of a task?',
    answer: 'Context files persist on disk. When you reopen your IDE, say "What\'s the status?" and the Coordinator will read the context files and resume from where you left off.',
    category: 'troubleshooting',
  },
  {
    id: 'new-task',
    question: 'How do I start a completely new task?',
    answer: 'Just describe the new task. The Coordinator will archive the old context and start fresh. Or say "Start over" explicitly to clear everything.',
    category: 'usage',
  },
  {
    id: 'multiple-tasks',
    question: 'Can I run multiple tasks at the same time?',
    answer: 'Not simultaneously. DevAgent processes one task at a time through the pipeline. Complete the current task first, then start the next one.',
    category: 'usage',
  },
  {
    id: 'git-optional',
    question: 'Do I have to use the git phases?',
    answer: 'No. After the code review phase, the Coordinator will ask if you want to proceed with git operations. You can say "skip git" to handle version control yourself.',
    category: 'usage',
  },
  {
    id: 'wrong-code',
    question: 'The generated code doesn\'t look right',
    answer: 'At the Code Approval gate, say what\'s wrong: "The authentication logic should use bcrypt, not plain text." The Reviewer will flag it and the Developer will fix it.',
    category: 'troubleshooting',
  },
];

export function getFaqByCategory(category) {
  return faq.filter((item) => item.category === category);
}

export function searchFaq(query) {
  const q = query.toLowerCase();
  return faq.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
  );
}
