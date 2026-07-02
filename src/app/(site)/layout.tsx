// The Lei experience pages carry their own fixed header, cursor and footer
// (see src/components/lei) — this layout intentionally adds no chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
