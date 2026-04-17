import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import PageLayout from './components/layout/PageLayout';

// Pages
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import HowItWorks from './pages/HowItWorks';
import AgentOverview from './pages/agents/AgentOverview';
import AgentPage from './pages/agents/AgentPage';
import UserGuide from './pages/guide/UserGuide';
import GivingTasks from './pages/guide/GivingTasks';
import Approvals from './pages/guide/Approvals';
import Scenarios from './pages/guide/Scenarios';
import Troubleshooting from './pages/guide/Troubleshooting';
import BestPractices from './pages/hacks/BestPractices';
import NonTechPlaybook from './pages/hacks/NonTechPlaybook';
import PowerUserPlaybook from './pages/hacks/PowerUserPlaybook';
import GlobalRules from './pages/reference/GlobalRules';
import CheatSheet from './pages/reference/CheatSheet';
import Glossary from './pages/reference/Glossary';
import AnsweringQuestions from './pages/guide/AnsweringQuestions';
import Examples from './pages/examples/Examples';
import SimpleFeature from './pages/examples/SimpleFeature';
import BugFix from './pages/examples/BugFix';
import NewProject from './pages/examples/NewProject';
import RequirementChange from './pages/examples/RequirementChange';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <BrowserRouter>
      <PageLayout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/getting-started/install" element={<GettingStarted />} />
          <Route path="/getting-started/first-task" element={<GettingStarted />} />
          <Route path="/getting-started/jira-setup" element={<GettingStarted />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/how-it-works/phases" element={<HowItWorks />} />
          <Route path="/how-it-works/agents" element={<HowItWorks />} />
          <Route path="/how-it-works/context-files" element={<HowItWorks />} />
          <Route path="/how-it-works/approval-gates" element={<HowItWorks />} />
          <Route path="/agents" element={<AgentOverview />} />
          <Route path="/agents/:agentId" element={<AgentPage />} />
          <Route path="/guide" element={<UserGuide />} />
          <Route path="/guide/giving-tasks" element={<GivingTasks />} />
          <Route path="/guide/questions" element={<AnsweringQuestions />} />
          <Route path="/guide/approvals" element={<Approvals />} />
          <Route path="/guide/scenarios" element={<Scenarios />} />
          <Route path="/guide/troubleshooting" element={<Troubleshooting />} />
          <Route path="/hacks" element={<BestPractices />} />
          <Route path="/hacks/better-descriptions" element={<BestPractices />} />
          <Route path="/hacks/non-tech" element={<NonTechPlaybook />} />
          <Route path="/hacks/power-user" element={<PowerUserPlaybook />} />
          <Route path="/reference" element={<Navigate to="/reference/rules" replace />} />
          <Route path="/reference/rules" element={<GlobalRules />} />
          <Route path="/reference/cheatsheet" element={<CheatSheet />} />
          <Route path="/reference/glossary" element={<Glossary />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/examples/simple-feature" element={<SimpleFeature />} />
          <Route path="/examples/bug-fix" element={<BugFix />} />
          <Route path="/examples/new-project" element={<NewProject />} />
          <Route path="/examples/requirement-change" element={<RequirementChange />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
