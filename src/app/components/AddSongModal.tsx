"use client";
import { useState } from "react";
import MainModal from "./MainModal";
import { Button } from "@mui/material";

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

export default function AddSongModal() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const openAddSongModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#fff",
          color: "#000",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
        onClick={openAddSongModal}
      >
        Add Song Modal
      </Button>
      <MainModal
        modalId="addSongModal"
        open={open}
        onClose={handleClose}
        style={style}
        title="Add New Song"
      >
        addSongmoDal
      </MainModal>
    </>
  );
}
