import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  // Button,
  Dialog
} from "@material-tailwind/react";

interface DailogBoxProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  size?: "lg" | "md" | "sm" | "xl" | "xs" | "xxl" | undefined;
  clearAction?: () => void;
}

const DialogBox = ({
  open,
  setOpen,
  children,
  size,
  clearAction,
}: DailogBoxProps) => {
  const handleOpen = () => {
    setOpen(!open);
    if (clearAction) {
      clearAction();
    }
  };

  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient" hidden>
        Open Dialog
      </Button> */}
      <Dialog
        dismiss={undefined}
        size={size ? size : "sm"}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }} placeholder={undefined}>
        {children}
      </Dialog>
    </>
  );
};

export default DialogBox;
