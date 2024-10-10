import { ErrorMessage, Field } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import MainModal from "./MainModal";
import MainForm from "./MainForm";

interface AddSingerForm {
  name: string;
  avatar: string;
}

const defaultValues: AddSingerForm = {
  name: "",
  avatar: "",
};

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

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Singer's name is required")
    .min(2, "Singer's name must be at least 2 characters long"),
  avatar: Yup.string().notRequired().trim(),
});
export default function AddSingerModal() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.style.filter = "blur(2px)";
    }
    setOpen(true);
  };
  const handleClose = () => {
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.style.filter = "blur(0)";
    }
    setOpen(false);
  };
  const onSubmit = (values: AddSingerForm) => {
    // Handle form submission
    console.log("Form data", values);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <MainModal
        modalId="addSingerModal"
        open={open}
        onClose={handleClose}
        style={style}
        title="Add New Singer"
      >
        <MainForm
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          formId="addSinger"
        >
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="input-lg" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>
          <div className="input-group">
            <label htmlFor="avatar">Avatar</label>
            <Field type="email" name="avatar" className="input-lg" />
            <ErrorMessage
              name="avatar"
              component="div"
              className="error-message"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1DB954" }}
          >
            Success
          </Button>
        </MainForm>
      </MainModal>
    </div>
  );
}
