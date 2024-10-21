"use client";

import { Singer } from "@/app/interfaces/Singer";
import useAPI from "@/app/utils/fetchApi";
import { useEffect, useState } from "react";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import AddSongModal from "@/app/components/AddSongModal";
interface SingerDetailPageParams {
  id: string;
}

interface SingerDetailPageProps {
  params: SingerDetailPageParams;
}

export default function SingerDetailPage({ params }: SingerDetailPageProps) {
  const [singer, setSinger] = useState<Singer | null>(null);

  const getSingerDetail = async (id: string) => {
    try {
      const url = `singers/${id}`;
      const singer = await useAPI.get(url);
      if (singer) {
        setSinger(singer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingerDetail(params.id);
  }, []);

  return (
    <div id="singer-detail-page">
      <div className="header">
        <img
          src={singer?.coverImage}
          alt={singer?.name}
          className="cover-image"
        />
        <div className="info px-[20px]">
          <div className="flex gap-[6px] items-center">
            <VerifiedRoundedIcon
              className="text-[#4cb3ff]"
              fontSize="large"
            ></VerifiedRoundedIcon>
            <span className="font-bold">Verified Artist</span>
          </div>
          <span className="text-[80px] font-bold">{singer?.name}</span>
        </div>
      </div>
      <div className="p-[20px]">
        <AddSongModal></AddSongModal>
      </div>
    </div>
  );
}
