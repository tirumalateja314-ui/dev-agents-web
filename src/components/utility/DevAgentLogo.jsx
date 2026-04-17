/**
 * Inline SVG logo that matches the favicon exactly:
 * dark background (#0E1420), amber >_ terminal symbol (#F0931A)
 */
export default function DevAgentLogo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, borderRadius: 8 }}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="#0E1420" />
      <path
        d="M10 16 L20 24 L10 32"
        stroke="#F0931A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="24" y="30" width="14" height="3" rx="1.5" fill="#F0931A" />
    </svg>
  );
}
