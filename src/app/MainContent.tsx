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
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { selectIsAuthencating } from "./stores/auth";
import { Snackbar } from "@mui/material";
import { closeToastMessage, selectToastMessage } from "./stores/toastMessage";

interface HomeProps {
  children: ReactNode;
}

export default function MainContent({ children }: HomeProps) {
  const { isAuthencating } = useAppSelector(selectIsAuthencating);
  const dispatch = useAppDispatch();
  const toastMessage = useAppSelector(selectToastMessage);
  const [openLoading, setOpenLoading] = useState<boolean>(true);

  const handleCloseToastMessage = () => {
    dispatch(closeToastMessage());
  };

  useEffect(() => {
    setOpenLoading(isAuthencating);
  }, [isAuthencating]);

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
      <Snackbar
        open={toastMessage.open}
        onClose={handleCloseToastMessage}
        message={toastMessage.message}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      {!openLoading && (
        <div className="layout-default" id="app">
          <TopNav></TopNav>
          <div className="main-app">
            <LeftNav></LeftNav>
            <div className="main-content text-white" id="main-content">
              {children}
            </div>
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
