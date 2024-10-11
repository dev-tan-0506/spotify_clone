"use client";

import LeftNav from "./components/LeftNav";
import PlayBar from "./components/PlayBar";
import RightNav from "./components/RightNav";
import { ReactNode, useEffect, useState } from "react";
import TopNav from "./components/TopNav";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import { useSession } from "next-auth/react";
interface HomeProps {
  children: ReactNode;
}

export default function MainContent({ children }: HomeProps) {
  const { data: session, status } = useSession();

  const [openLoading, setOpenLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ status:", status);
    if (status === "loading") {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [status]);
  return (
    <>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: "#000",
        })}
        open={openLoading}
      >
        <CircularProgress sx={{ color: "#1DB954", marginRight: "10px" }} />
        <Image src={logo} alt="Spotify" />
      </Backdrop>
      {!openLoading && (
        <div className="layout-default" id="app">
          <TopNav></TopNav>
          <div className="main-app">
            <LeftNav></LeftNav>
            <div className="main-content">{children}</div>
            <RightNav></RightNav>
          </div>
          <div className="playbar">
            <PlayBar></PlayBar>
          </div>
        </div>
      )}
    </>
  );
}
