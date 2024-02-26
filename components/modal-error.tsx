import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import DangerIcon from "../app/assets/icons/warning-icon.svg";
import { Button } from "./ui/button";

interface ModalProps {
  showErrDoorsDialog: boolean;
  availableDoors: number;
  setShowErrDoorsDialog: any;
  title: string;
  description: string;
  icon: string;
}

const ModalError = ({
  showErrDoorsDialog,
  availableDoors,
  setShowErrDoorsDialog,
  title,
  description,
  icon,
}: ModalProps) => {
  return (
    <>
      {showErrDoorsDialog && (
        <AlertDialog defaultOpen>
          <AlertDialogContent className="w-[80%] rounded">
            <AlertDialogHeader className="mb-10">
              <AlertDialogTitle className="grid gap-y-2">
                <div className="flex items-center justify-center">
                  <Image src={icon} width={48} height={48} alt={icon} />
                </div>
                <div className="flex items-center justify-center">{title}</div>
              </AlertDialogTitle>
              <AlertDialogDescription className="flex items-center justify-center">
                {availableDoors} {description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <div className="w-full">
                <div>
                  <Button
                    onClick={() => {
                      setShowErrDoorsDialog(false); // Hide the dialog
                    }}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ModalError;
