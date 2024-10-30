"use client";

import { Playlist } from "@/app/interfaces/Playlist";
import useAPI from "@/app/utils/fetchApi";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import { useEffect, useState } from "react";

interface PlaylistDetailPageParams {
  id: string;
}

interface PlaylistDetailPageProps {
  params: PlaylistDetailPageParams;
}

const formatPlaylistType = (type?: string): string => {
  switch (type) {
    case "liked":
      return "Playlist";
    case "private":
      return "Private Playlist";
    case "public":
      return "Public Playlist";
    default:
      return "";
  }
};

export default function PlaylistDetailPage({
  params,
}: PlaylistDetailPageProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const handleGetPlaylistDetail = async () => {
    const urlGetPlaylistDetail = `playlists/${params.id}`;
    const response = await useAPI.get(urlGetPlaylistDetail);
    if (response) {
      setPlaylist(response);
    }
  };

  useEffect(() => {
    handleGetPlaylistDetail();
  }, []);

  return (
    <div id="playlist-detail-page">
      <div className="header">
        <div className="playlist-thumb">
          <div className="no-thumb">
            <LibraryMusicOutlinedIcon
              sx={{ fontSize: 100 }}
            ></LibraryMusicOutlinedIcon>
          </div>
        </div>
        <div className="playlist-info">
          <div className="type">{formatPlaylistType(playlist?.type)}</div>
          <div className="name">{playlist?.name || ""}</div>
          {playlist?.description && (
            <div className="description">{playlist.description}</div>
          )}
          <div className="total">
            <div className="people">Quốc Tân</div>
            <div className="songs"> · {playlist?.songs.length} songs</div>
            {/* <div className="time">2 min 3 sec</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
