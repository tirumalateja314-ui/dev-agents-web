// Glossary — tech terms to plain English

export const glossary = [
  { term: 'Agent', definition: 'An AI assistant with a specific role (like "Story Analyst" or "Developer"). Each agent is an expert at one part of the development process.' },
  { term: 'Approval Gate', definition: 'A checkpoint where the workflow pauses and waits for you to review and approve before continuing. There are 4 gates in total.' },
  { term: 'CI/CD', definition: 'Continuous Integration / Continuous Delivery. Automatic tests and deployments that run when code is pushed to the repository.' },
  { term: 'Context File', definition: 'A shared file in .github/context/ that agents use to pass information to each other. Like a shared notebook the team writes in.' },
  { term: 'Coordinator', definition: 'The lead agent that manages the entire workflow. The only agent you talk to directly. Think of it as your project manager.' },
  { term: 'Feature Branch', definition: 'A separate copy of the code where new work happens, so the main codebase stays stable until changes are reviewed and approved.' },
  { term: 'Git', definition: 'A version control system that tracks changes to code. Like "track changes" in a document, but for an entire project.' },
  { term: 'GitLab', definition: 'A platform for hosting code, managing projects, and collaborating. Similar to GitHub.' },
  { term: 'Jira', definition: 'A project management tool where tasks and stories are tracked. DevAgent can read Jira stories directly via MCP integration.' },
  { term: 'MCP', definition: 'Model Context Protocol. A way for AI agents to connect to external tools like Jira, databases, or APIs.' },
  { term: 'Merge Request (MR)', definition: 'A request to add your code changes to the main project. Other developers can review the changes before they are merged. GitLab calls them "Merge Requests" (GitHub calls them "Pull Requests").' },
  { term: 'Phase', definition: 'One step in the DevAgent workflow. There are 8 phases: Requirements, Exploration, Planning, Development, Testing, Review, Push, and MR.' },
  { term: 'Pipeline', definition: 'The sequence of all 8 phases from start to finish. Your task flows through the pipeline like an assembly line.' },
  { term: 'Repository', definition: 'A folder that contains your project code and its entire change history. Stored on GitLab.' },
  { term: 'Subagent', definition: 'Any agent other than the Coordinator. Subagents are invoked by the Coordinator to do specific tasks.' },
  { term: 'VS Code', definition: 'Visual Studio Code. The code editor where DevAgent runs. You interact with agents through the Copilot Chat panel.' },
  { term: 'Copilot Chat', definition: 'The chat panel inside VS Code where you type messages to the Coordinator agent.' },
  { term: 'Acceptance Criteria', definition: 'Specific, testable conditions that must be true for a task to be considered complete. Example: "Login returns 401 for wrong password."' },
  { term: 'Edge Case', definition: 'An unusual or extreme scenario that might cause unexpected behavior. Example: "What if the user submits an empty form?"' },
  { term: 'Tech Stack', definition: 'The set of technologies used in a project. Example: "React + Node.js + PostgreSQL."' },
];

export function searchGlossary(query) {
  const q = query.toLowerCase();
  return glossary.filter(
    (item) =>
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q)
  );
}
