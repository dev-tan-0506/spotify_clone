/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface LoginModalProps {
  userLoggedIn: any;
}

export default function LoginModal({ userLoggedIn }: LoginModalProps) {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.style.filter = "blur(0)";
    }
    setOpen(false);
  };

  return (
    <MainModal
      modalId="addSingerModal"
      open={open}
      onClose={handleClose}
      style={style}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "148px", height: "45px", marginBottom: "40px" }}
          src={logo}
          alt="Spotify"
        />
        <p className="font-bold text-[30px]">Milions of songs.</p>
        <p className="font-bold text-[30px]">Free on Spotify.</p>
        <button
          className="mt-5 mb-5 rounded-full bg-[#1DB954] p-3 px-10 font-bold text-[20px]"
          onClick={() => signIn("google")}
        >
          Login
        </button>
      </div>
    </MainModal>
  );
}
