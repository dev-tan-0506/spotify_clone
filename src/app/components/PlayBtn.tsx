interface PlayBtnProps {
  size?: string;
  onClick?: () => void;
}

export default function PlayBtn({ size = "50px", onClick }: PlayBtnProps) {
  return (
    <div
      className="play-action"
      style={{ width: size }}
      onClick={() => onClick && onClick()}
    >
      <i className="fa-solid fa-play fa-xl"></i>
    </div>
  );
}
