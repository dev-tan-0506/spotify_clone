/* eslint-disable @typescript-eslint/no-explicit-any */
import { Backdrop, Box, Fade, Modal } from "@mui/material";

interface MainModalProps {
  className?: string;
  children: any;
  modalId: string;
  open: boolean;
  onClose: (event: any, reason: any) => void;
  style: object;
  title?: string;
}

export default function MainModal({
  className,
  children,
  modalId,
  open,
  onClose,
  style,
  title,
}: MainModalProps) {
  return (
    <Modal
      className={className}
      id={modalId}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {title && <h2 className="modal-title">{title}</h2>}
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
