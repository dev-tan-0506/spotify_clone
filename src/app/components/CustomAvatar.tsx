/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mui/material";

interface AvatarByNameProps {
  name?: string;
  size: string;
  fontSize: string;
  onClick: any;
  isByName: boolean;
  src?: string;
  ref: any;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, size: string, fontSize: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    style: {
      width: size,
      height: size,
      fontSize,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function CustomAvatar({
  name = "",
  size,
  fontSize,
  onClick,
  isByName,
  src = "",
  ref,
}: AvatarByNameProps) {
  return (
    <div
      onClick={onClick}
      className="p-[10px] bg-[#212121] rounded-full cursor-pointer"
    >
      {isByName ? (
        <Avatar alt={name} {...stringAvatar(name, size, fontSize)} />
      ) : (
        <Avatar alt={name} src={src} />
      )}
    </div>
  );
}
