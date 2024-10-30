/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { selectUserLibrary } from "../stores/auth";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { getYourLibrary } from "../stores/asyncThunks/auth";
import { formatTypeLibrary } from "../utils/commonFunctions";
import Link from "next/link";

export default function YourLibrary() {
  const yourLibrary = useAppSelector(selectUserLibrary);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getYourLibrary());
  }, []);

  return (
    <div className="mt-[12px] flex flex-col gap-[6px]">
      <div className="flex justify-between">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ "padding-right": 0 }}>
          <span className="pr-[2px]">Recently added</span>
          <MenuIcon />
        </IconButton>
      </div>
      <ul
        className="flex flex-col gap-[8px] max-h-[200px] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {yourLibrary.length &&
          yourLibrary.map(({ item, type }) => (
            <li
              key={item._id}
              className={`py-[4px] hover:bg-[#262626] rounded-[5px] cursor-pointer`}
            >
              <Link href={`/${type}/${item._id}`}>
                <span className="font-bold">{item.name}</span> ·{" "}
                <span className="text-[#b3b3b3]">
                  {formatTypeLibrary(type)}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
