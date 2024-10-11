"use client";

import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";
import AvatarByName from "./AvatarByName";
import Popper from "@mui/material/Popper";
import { useEffect, useRef, useState } from "react";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "next-auth/react";

const menu = [
  {
    name: "account",
    display: "Account",
  },
  {
    name: "profile",
    display: "Profile",
  },
  {
    name: "settings",
    display: "Settings",
  },
  {
    name: "logout",
    display: "Log out",
  },
];

export default function TopNav() {
  const { data: session } = useSession();
  const [openMenuUser, setOpenMenuUser] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenMenuUser(false);
  };

  const handleSelectMenu = (
    nameMenu: string,
    event: Event | React.SyntheticEvent
  ) => {
    if (nameMenu === "logout") {
      signOut();
    }
    handleClose(event);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuUser(false);
    } else if (event.key === "Escape") {
      setOpenMenuUser(false);
    }
  }
  const handleToggle = () => {
    console.log("hahaha");
    setOpenMenuUser((prevOpen) => !prevOpen);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="topNav">
      <Image
        style={{ width: "100px", aspectRatio: "7/2" }}
        src={logo}
        alt="Spotify"
      />
      {!session?.user ? (
        <LoginModal></LoginModal>
      ) : (
        <div className="userLoggedIn">
          <AvatarByName
            ref={anchorRef}
            name={session?.user?.name || ""}
            size="30px"
            fontSize="14px"
            onClick={handleToggle}
          ></AvatarByName>
          <Popper
            open={openMenuUser}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {menu.map((item) => (
                        <MenuItem
                          key={item.name}
                          onClick={(event) =>
                            handleSelectMenu(item.name, event)
                          }
                        >
                          {item.display}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )}
    </div>
  );
}
