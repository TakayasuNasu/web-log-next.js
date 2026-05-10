export function CustomContainer({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <aside {...props}>
      <span className="msg-symbol">!</span>
      <div className="msg-content">
        <p>{children}</p>
      </div>
    </aside>
  );
}
