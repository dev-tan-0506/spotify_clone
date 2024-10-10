interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  return <div className="bar">{children}</div>;
}
