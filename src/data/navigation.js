// Navigation structure for sidebar and routing

export const navigation = [
  {
    title: 'Getting Started',
    path: '/getting-started',
    children: [
      { title: 'What is DevAgent?', path: '/getting-started' },
      { title: 'Installation', path: '/getting-started/install' },
      { title: 'Your First Task', path: '/getting-started/first-task' },
      { title: 'Jira MCP Setup', path: '/getting-started/jira-setup' },
    ],
  },
  {
    title: 'How It Works',
    path: '/how-it-works',
    children: [
      { title: 'The Big Picture', path: '/how-it-works' },
      { title: 'The 8 Phases', path: '/how-it-works/phases' },
      { title: 'Context Files', path: '/how-it-works/context-files' },
      { title: 'Approval Gates', path: '/how-it-works/approval-gates' },
      { title: 'Context Management', path: '/how-it-works/context-management' },
      { title: 'Automation Scripts', path: '/how-it-works/automation-scripts' },
    ],
  },
  {
    title: 'Agent Deep Dives',
    path: '/agents',
    children: [
      { title: 'Overview', path: '/agents' },
      { title: 'Coordinator', path: '/agents/coordinator' },
      { title: 'Story Analyst', path: '/agents/story-analyst' },
      { title: 'Codebase Explorer', path: '/agents/codebase-explorer' },
      { title: 'Researcher', path: '/agents/researcher' },
      { title: 'Architect Planner', path: '/agents/architect' },
      { title: 'Developer', path: '/agents/developer' },
      { title: 'Tester', path: '/agents/tester' },
      { title: 'Reviewer', path: '/agents/reviewer' },
      { title: 'Git Manager', path: '/agents/git-manager' },
    ],
  },
  {
    title: 'User Guide',
    path: '/guide',
    children: [
      { title: 'Giving Tasks', path: '/guide/giving-tasks' },
      { title: 'Answering Questions', path: '/guide/questions' },
      { title: 'Approval Gates', path: '/guide/approvals' },
      { title: 'Common Scenarios', path: '/guide/scenarios' },
      { title: 'Troubleshooting', path: '/guide/troubleshooting' },
    ],
  },
  {
    title: 'Best Practices',
    path: '/hacks',
    children: [
      { title: 'Writing Better Tasks', path: '/hacks/better-descriptions' },
      { title: 'Non-Tech Playbook', path: '/hacks/non-tech' },
      { title: 'Power User Playbook', path: '/hacks/power-user' },
    ],
  },
  {
    title: 'Reference',
    path: '/reference',
    children: [
      { title: 'Global Rules', path: '/reference/rules' },
      { title: 'Command Cheat Sheet', path: '/reference/cheatsheet' },
      { title: 'Glossary', path: '/reference/glossary' },
    ],
  },
  {
    title: 'Examples',
    path: '/examples',
    children: [
      { title: 'Simple Feature', path: '/examples/simple-feature' },
      { title: 'Bug Fix', path: '/examples/bug-fix' },
      { title: 'New Project', path: '/examples/new-project' },
    ],
  },
];
