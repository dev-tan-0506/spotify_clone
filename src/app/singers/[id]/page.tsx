/* eslint-disable @next/next/no-img-element */
"use client";

import { Singer } from "@/app/interfaces/Singer";
import useAPI from "@/app/utils/fetchApi";
import { useEffect, useMemo, useState } from "react";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { displayTimeSong, getAverageRGB } from "@/app/utils/commonFunctions";
import PlayBtn from "@/app/components/PlayBtn";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAppDispatch, useAppSelector } from "@/app/stores/hooks";
import { setPlaylist } from "@/app/stores/playingStore";
import { selectUserLibrary } from "@/app/stores/auth";
import { getYourLibrary } from "@/app/stores/asyncThunks/auth";

interface SingerDetailPageParams {
  id: string;
}

interface SingerDetailPageProps {
  params: SingerDetailPageParams;
}

export default function SingerDetailPage({ params }: SingerDetailPageProps) {
  const yourLibrary = useAppSelector(selectUserLibrary);

  const [singer, setSinger] = useState<Singer | null>(null);
  const isFollowing = useMemo(() => {
    const singersInYLib = yourLibrary.filter((yl) => yl.type === "singers");
    const findSingerInYLib = singersInYLib.find(
      (sIYL) => sIYL.item._id === singer?._id
    );
    return !!findSingerInYLib;
  }, [yourLibrary, singer]);
  const dispatch = useAppDispatch();
  const getSingerDetail = async (id: string) => {
    try {
      const url = `singers/${id}?isHaveAlbums=true`;
      const singer = await useAPI.get(url);
      if (singer) {
        setSinger(singer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getColorAvatar = () => {
    const imageEl = document.getElementById(
      "avatar-singer"
    ) as HTMLImageElement;
    if (imageEl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageEl.src;
      img.onload = function () {
        const color = getAverageRGB(img);
        if (color) {
          const mainContentEl = document.getElementById(
            "header-no-cover-image"
          );
          const listActionEl = document.getElementById("list-action");
          if (mainContentEl) {
            const rgbColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
            const rgbColor2 = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
            mainContentEl.style.background = `linear-gradient(${rgbColor}, ${rgbColor2})`;
          }
          if (listActionEl) {
            const rgbColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
            listActionEl.style.background = `linear-gradient(${rgbColor}, #212121)`;
          }
        }
      };
    }
  };

  const handlePlay = () => {
    if (singer?.songs) {
      dispatch(setPlaylist(singer.songs));
    }
  };

  const handleFollow = async () => {
    const urlHandleFollow = `singers/follow/${singer?._id}`;
    const response = await useAPI.put(urlHandleFollow);
    if (response) {
      dispatch(getYourLibrary());
    }
  };

  const handleUnfollow = async () => {
    const urlHandleUnfollow = `singers/unfollow/${singer?._id}`;
    const response = await useAPI.put(urlHandleUnfollow);
    if (response) {
      dispatch(getYourLibrary());
    }
  };

  useEffect(() => {
    getSingerDetail(params.id);
  }, []);

  useEffect(() => {
    getColorAvatar();
  }, [singer]);

  return (
    <div id="singer-detail-page">
      {singer?.coverImage ? (
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
      ) : (
        <div className="header-no-cover-image" id="header-no-cover-image">
          <img
            src={singer?.avatar}
            alt={singer?.name}
            className="avatar"
            id="avatar-singer"
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
      )}
      <div className="list-action" id="list-action">
        <PlayBtn size="55px" onClick={handlePlay}></PlayBtn>
        <i className="fa-solid fa-shuffle text-[#B3B3B3] text-[35px] hover:text-[#fff] hover:scale-105 relative cursor-pointer"></i>
        {isFollowing ? (
          <Button
            variant="outlined"
            className="btn-white"
            onClick={handleUnfollow}
          >
            Following
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="btn-white"
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
        <i className="fa-solid fa-ellipsis text-[#B3B3B3] text-[35px] hover:text-[#fff] hover:scale-105 relative cursor-pointer"></i>
      </div>
      <div className="px-[20px]">
        <h2 className="font-bold text-[30px]">Popular</h2>
        {singer?.songs.length && (
          <ul className="list-songs-popular">
            {singer.songs.map((song, index) => (
              <li className="song" key={song._id}>
                <div className="index">
                  <span className="index-value">{index + 1}</span>
                  <PlayArrowIcon className="play"></PlayArrowIcon>
                </div>
                <img className="thumb" src={song.thumb} alt={song.name} />
                <div className="name">{song.name}</div>
                <div className="count-views">5,333,333</div>
                <div className="time">{displayTimeSong(song.duration)}</div>
                <div className="add-action">
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </div>
                <div className="more-options">
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
