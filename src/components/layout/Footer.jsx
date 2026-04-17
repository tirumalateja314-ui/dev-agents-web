import { Link } from 'react-router-dom';
import DevAgentLogo from '../utility/DevAgentLogo';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-layer-0)]">
      <div className="max-w-[72rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <DevAgentLogo size={28} />
              <span
                className="text-[var(--color-primary)] font-semibold"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
              >
                DevAgent
              </span>
            </div>
            <p className="text-sm text-[var(--color-tertiary)] leading-relaxed">
              Your AI development team, inside VS Code.
              8 agents. 8 phases. Full control.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
              Documentation
            </h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <FooterLink to="/getting-started">Getting Started</FooterLink>
              <FooterLink to="/how-it-works">How It Works</FooterLink>
              <FooterLink to="/agents">Agent Deep Dives</FooterLink>
              <FooterLink to="/guide">User Guide</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
              Resources
            </h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <FooterLink to="/reference/rules">Global Rules</FooterLink>
              <FooterLink to="/reference/cheatsheet">Cheat Sheet</FooterLink>
              <FooterLink to="/reference/glossary">Glossary</FooterLink>
              <FooterLink to="/examples">Examples</FooterLink>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}>
              Help
            </h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <FooterLink to="/hacks">Best Practices</FooterLink>
              <FooterLink to="/hacks/non-tech">Non-Tech Playbook</FooterLink>
              <FooterLink to="/guide/troubleshooting">Troubleshooting</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)]
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-tertiary)]">
            &copy; {new Date().getFullYear()} DevAgent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-accent)]
                   transition-colors duration-150 no-underline"
      >
        {children}
      </Link>
    </li>
  );
}
