// Placeholder page component for Phase 1 stubs
// Will be replaced with real content in Phase 2+

export default function PageStub({ title, description }) {
  return (
    <div className="py-10">
      <h1 className="text-3xl mb-4">{title}</h1>
      <p className="text-[var(--color-secondary)] text-md leading-relaxed mb-8">
        {description}
      </p>
      <div className="p-6 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-layer-1)]">
        <p className="text-sm text-[var(--color-tertiary)]">
          Content coming soon. This page is part of the documentation website build.
        </p>
      </div>
    </div>
  );
}
