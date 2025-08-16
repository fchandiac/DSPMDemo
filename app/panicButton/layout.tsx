export default function PanicButtonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100dvh', width: '100vw', position: 'relative' }}>
      {children}
    </div>
  );
}
