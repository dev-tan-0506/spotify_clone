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
import { UserLoginGoogleInfo } from "./interfaces/User";
import useAPI from "./utils/fetchApi";

interface HomeProps {
  children: ReactNode;
}

export default function MainContent({ children }: HomeProps) {
  const { data: session, status } = useSession();
  const isAuthWithBEOnLocalStorage = localStorage?.getItem("isAuhWithBE");
  const [isAuthWithBE, setIsAuthWithBE] = useState<boolean>(
    isAuthWithBEOnLocalStorage ? JSON.parse(isAuthWithBEOnLocalStorage) : false
  );
  const [openLoading, setOpenLoading] = useState<boolean>(true);

  const handleLoginWithBE = async (data?: UserLoginGoogleInfo) => {
    if (!data) {
      return;
    }

    const url = "auth/login-google";
    const response = await useAPI.post(url, data);
    if (response) {
    }
    localStorage.setItem("isAuhWithBE", "true");
    setIsAuthWithBE(true);
  };

  useEffect(() => {
    if (status === "loading") {
      setOpenLoading(true);
    } else if (session?.user && !isAuthWithBE) {
      handleLoginWithBE(session?.user as UserLoginGoogleInfo);
    } else {
      setOpenLoading(false);
    }
  }, [status, isAuthWithBE]);
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
          <TopNav userLogin={session?.user as UserLoginGoogleInfo}></TopNav>
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
