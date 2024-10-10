"use client";

import { useEffect, useState } from "react";
import { getAPI } from "./utils/fetchApi";
import { Singer } from "./interfaces/Singer";
// import AddSingerModal from "./components/AddSingerModal";

export default function Home() {
  const [singers, setSingers] = useState<Singer[]>([]);

  const getListSingers = async () => {
    const url = "http://localhost:3000/singers";
    const response = await getAPI(url);
    if (response) {
      setSingers(response);
    }
  };

  useEffect(() => {
    console.log(singers);
  }, [singers]);

  useEffect(() => {
    getListSingers();
  }, []);

  return (
    <div className="p-[20px]">
      <div>
        {/* <h2 className="font-bold text-[20px] mb-[15px]">Danh sách nghệ sĩ</h2> */}
        {/* <ul>
          {singers.map((item) => (
            <li key={item._id}>
              <div className="w-[200px] aspect-[1/1] relative">
                <img
                  src={item.avatar}
                  className="w-full h-full rounded-full mb-[10px]"
                  alt={item.name}
                />
                <div className="w-[50px] aspect-[1/1] rounded-full bg-[#1DB954] absolute z-[10] bottom-[3%] right-[3%] flex justify-center items-center border border-solid border-[1px] border-[#000]">
                  <i className="fa-solid fa-play fa-xl ml-[5px] text-[#000]"></i>
                </div>
              </div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-[#B2B2B2]">Nghệ sĩ</div>
            </li>
          ))}
        </ul> */}
        {/* <AddSingerModal></AddSingerModal> */}
      </div>
    </div>
  );
}
