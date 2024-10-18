/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
      img.crossOrigin = "Anonymous"; // Hoặc 'use-credentials' nếu cần xác thực
      img.src = imageEl.src;
      img.onload = function () {
        const color = getAverageRGB(img);
        if (color) {
          const mainContentEl = document.getElementById("main-content");
          if (mainContentEl) {
            const rgbColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
            // mainContentEl.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
            mainContentEl.style.background = `linear-gradient(${rgbColor}, #212121)`;
          }
        }
      };
    }
  };
  return (
    <div>
      <h2 className="font-bold text-[20px] mb-[15px]">Danh sách nghệ sĩ</h2>
      <ul className="flex gap-[25px]">
        {singers.map((item) => (
          <li key={item._id}>
            <div onMouseEnter={handleMouseEnter}>
              <div className="w-[200px] aspect-[1/1] relative">
                <img
                  src={item.avatar}
                  className="w-full h-full rounded-full mb-[10px] object-cover object-center"
                  alt={item.name}
                />
                <div className="w-[50px] aspect-[1/1] rounded-full bg-[#1DB954] absolute z-[10] bottom-[3%] right-[3%] flex justify-center items-center border border-solid border-[1px] border-[#000]">
                  <i className="fa-solid fa-play fa-xl ml-[5px] text-[#000]"></i>
                </div>
              </div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-[#B2B2B2]">Nghệ sĩ</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
