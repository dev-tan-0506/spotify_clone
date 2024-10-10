"use client";

import LeftNav from "./components/LeftNav";
import PlayBar from "./components/PlayBar";
import RightNav from "./components/RightNav";
import LoginModal from "./components/LoginModal";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface HomeProps {
  children: ReactNode;
}

export default function MainContent({ children }: HomeProps) {
  const { data: session } = useSession();

  return (
    <>
      <LoginModal userLoggedIn={session?.user}></LoginModal>
      <div className="layout-default" id="app">
        <div className="main-app">
          <LeftNav></LeftNav>
          <div className="flex-1">{children}</div>
          <RightNav></RightNav>
        </div>
        <div className="playbar">
          <PlayBar></PlayBar>
        </div>
      </div>
    </>
  );
}
