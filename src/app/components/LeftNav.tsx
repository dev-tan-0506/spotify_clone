"use client";

import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import { useState } from "react";
import MyPlaylists from "./MyPlaylists";
import Link from "next/link";

interface MenuNavbar {
  icon: string;
  link: string;
  name: string;
  menu_separate: boolean;
}

export default function LeftNav() {
  const [menuSelected, setMenuSelected] = useState<string>("Home");
  const menuNavbar: MenuNavbar[] = [
    {
      icon: "house",
      link: "#",
      name: "Home",
      menu_separate: false,
    },
    {
      icon: "magnifying-glass",
      link: "#",
      name: "Search",
      menu_separate: false,
    },
    {
      icon: "music",
      link: "#",
      name: "Library",
      menu_separate: false,
    },
    {
      icon: "heart",
      link: "#",
      name: "Liked Songs",
      menu_separate: true,
    },
  ];

  // Event handlers
  const changeMenuSelected = (newMenuSelected: string) => {
    if (newMenuSelected) setMenuSelected(newMenuSelected);
  };

  return (
    <div className="w-[18%] bg-[#000] h-full text-white	p-[32px] text-[14px]">
      <div className="flex items-center justify-between mb-[40px]">
        <Image
          style={{ width: "148px", height: "45px" }}
          src={logo}
          alt="Spotify"
        />
        <i className="fa-solid fa-angles-left"></i>
      </div>
      <ul className="flex flex-col gap-[16px]">
        {menuNavbar.map((item, key) => (
          <li
            key={key}
            className="relative"
            onClick={() => changeMenuSelected(item.name)}
          >
            <Link
              href={item.link}
              className={`flex gap-[13px] px-[21px] py-[9px] ${
                item.name === menuSelected && "bg-[#262626] font-semibold"
              } rounded-[40px] cursor-pointer hover:no-underline hover:bg-[#262626]
              ${
                item.menu_separate &&
                'my-[16px] after:content-[""] after:w-full after:absolute after:h-[0.2px] after:bg-[#fff] after:top-0 after:left-0 before:content-[""] before:w-full before:absolute before:h-[0.2px] before:bg-[#fff] before:bottom-0 before:left-0'
              }`}
            >
              <i
                className={`fa-solid fa-${item.icon} text-white text-[22px]`}
              ></i>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <MyPlaylists></MyPlaylists>
    </div>
  );
}
