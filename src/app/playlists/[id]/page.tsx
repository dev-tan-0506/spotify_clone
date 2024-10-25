import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";

export default function PlaylistDetailPage() {
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
          <div className="type">Public Playlist</div>
          <div className="name">Custom Playlist #1</div>
          <div className="description">Custom description</div>
          <div className="total">
            <div className="people">Quốc Tân</div>
            <div className="songs">2 songs</div>
            <div className="time">2 min 3 sec</div>
          </div>
        </div>
      </div>
    </div>
  );
}
