// Phase data — names, agents, gates, context files

export const phases = [
  {
    number: 1,
    name: 'Requirements Analysis',
    agent: 'Story Analyst',
    agentId: 'story-analyst',
    description: 'Your task is analyzed and turned into structured, testable requirements with acceptance criteria.',
    gate: null,
    contextFile: 'requirements.md',
    userAction: 'Provide your task (Jira link, text, or both). Answer any clarifying questions.',
    icon: 'ClipboardText',
  },
  {
    number: 2,
    name: 'Codebase Exploration',
    agent: 'Codebase Explorer',
    agentId: 'codebase-explorer',
    description: 'Your existing project is scanned to understand its architecture, patterns, conventions, and tech stack.',
    gate: null,
    contextFile: 'codebase-analysis.md',
    userAction: 'No action needed. This phase runs automatically.',
    icon: 'FolderOpen',
  },
  {
    number: 3,
    name: 'Architecture Planning',
    agent: 'Architect Planner',
    agentId: 'architect',
    description: 'A detailed implementation plan is created — which files to create/modify, what patterns to use, and how everything connects.',
    gate: {
      name: 'Plan Approval',
      number: 1,
      question: 'Does this plan look right? Check the file list and approach.',
    },
    contextFile: 'implementation-plan.md',
    userAction: 'Review the plan and approve, request changes, or ask questions.',
    icon: 'Blueprint',
  },
  {
    number: 4,
    name: 'Development',
    agent: 'Developer',
    agentId: 'developer',
    description: 'Code is written following the approved plan, matching your existing conventions and producing production-ready code.',
    gate: null,
    contextFile: 'development-log.md',
    userAction: 'No action needed. Development follows the approved plan.',
    icon: 'Code',
  },
  {
    number: 5,
    name: 'Testing',
    agent: 'Tester',
    agentId: 'tester',
    description: 'Tests are written covering happy paths, edge cases, error scenarios, and security concerns.',
    gate: null,
    contextFile: 'test-results.md',
    userAction: 'No action needed. Tests are written automatically.',
    icon: 'TestTube',
  },
  {
    number: 6,
    name: 'Code Review',
    agent: 'Reviewer',
    agentId: 'reviewer',
    description: 'All code changes are reviewed for correctness, security, performance, and style.',
    gate: {
      name: 'Code Approval',
      number: 2,
      question: 'Does the summary match your requirements? Review the changes.',
    },
    contextFile: 'review-report.md',
    userAction: 'Review the code summary and approve or request fixes.',
    icon: 'Eye',
  },
  {
    number: 7,
    name: 'Git Push',
    agent: 'Git Manager',
    agentId: 'git-manager',
    description: 'Code is committed with descriptive messages and pushed to a feature branch. This phase is optional.',
    gate: {
      name: 'Push Approval',
      number: 3,
      question: 'Ready to push? Check the branch name and commit messages.',
    },
    contextFile: 'git-operations.md',
    userAction: 'Approve the push or say "skip git" to handle it yourself.',
    icon: 'GitBranch',
    optional: true,
  },
  {
    number: 8,
    name: 'Merge Request',
    agent: 'Git Manager',
    agentId: 'git-manager',
    description: 'A Merge Request is created on GitLab with a full description of what was built and why.',
    gate: {
      name: 'MR Approval',
      number: 4,
      question: 'Does the MR description capture what was built?',
    },
    contextFile: 'git-operations.md',
    userAction: 'Approve the MR creation or modify the description.',
    icon: 'GitMerge',
    optional: true,
  },
];

export function getPhaseByNumber(num) {
  return phases.find((p) => p.number === num);
}

export function getGatedPhases() {
  return phases.filter((p) => p.gate !== null);
}
