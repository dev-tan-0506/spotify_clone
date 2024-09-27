interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  return <div className="bg-[#000] text-white p-[8px] w-[18%]">{children}</div>;
}
