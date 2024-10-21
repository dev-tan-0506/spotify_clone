/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Singer } from "../interfaces/Singer";
import { getAverageRGB } from "../utils/commonFunctions";

interface ListSingersProps {
  singers: Singer[];
}

export default function ListSingers({ singers }: ListSingersProps) {
  const handleMouseEnter = (e: any) => {
    const imageEl = e.target.parentElement.querySelector("img");
    if (imageEl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageEl.src;
      img.onload = function () {
        const color = getAverageRGB(img);
        if (color) {
          const mainContentEl = document.getElementById("home-main-content");
          if (mainContentEl) {
            const rgbColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
            mainContentEl.style.background = `linear-gradient(${rgbColor}, #212121)`;
          }
        }
      };
    }
  };
  return (
    <div className="list-singers">
      <h2 className="font-bold text-[20px] mb-[15px] text-white">
        Danh sách nghệ sĩ
      </h2>
      <ul className="flex">
        {singers.map((item) => (
          <li key={item._id}>
            <div onMouseEnter={handleMouseEnter} className="container">
              <Link href={`singers/${item._id}`}>
                <div className="avatar-section">
                  <img src={item.avatar} className="avatar" alt={item.name} />
                  <div className="play-action">
                    <i className="fa-solid fa-play fa-xl"></i>
                  </div>
                </div>
                <div className="name">{item.name}</div>
                <div className="role">Nghệ sĩ</div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
