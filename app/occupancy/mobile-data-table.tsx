import React, { useState } from "react";
import { Locker } from "./columns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { LockerResetPinAction } from "./action-cell";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

import DangerIcon from "../assets/icons/DangerIcon.svg";
import WarningIcon from "../assets/icons/warning-icon.svg";
import SuccessIcon from "../assets/icons/success-icon.svg";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { Button } from "../../components/ui/button";

interface MobileDataTableProps {
  status: string;
  dataOccupied: Locker[];
}

const MobileDataTable: React.FC<MobileDataTableProps> = ({
  status,
  dataOccupied,
}) => {
  const [selectedItem, setSelectedItem] = useState<Locker | null>(null);

  const handleClick = (id: string) => {
    // Find the selected item by id
    const item = dataOccupied.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrDialog, setShowErrDialog] = useState(false);





  const handeTerminate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        // FIXME: STANDARDIZE HTTP Request Library, AXIOS OR FETCH?? - We're currently using both, must choose 1.
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/${selectedItem?.lockerId}/door/${selectedItem?.id}/terminate`,
        { bookingNumber: selectedItem?.bookingId }
      );
      if (response.status === 200) {
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Error terminating door:", error);
      setShowErrDialog(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRenewDoor = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        // FIXME: STANDARDIZE HTTP Request Library, AXIOS OR FETCH?? - We're currently using both, must choose 1.
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/${selectedItem?.lockerId}/door/${selectedItem?.id}/renew`,
        { bookingNumber: selectedItem?.bookingId }
      );
      if (response.status === 200) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error renew door:", error);
    } finally {
      setIsLoading(false);
    }
  };















  return (
    <>
      {status === "occupied" && (
        <div className="block md:hidden w-full">
          {dataOccupied.map((data) => (
            <Sheet>
              <SheetTrigger className="w-full text-left">
                <div
                  key={data.id}
                  className="grid border-b-2 py-4 gap-y-2"
                  onClick={() => handleClick(data.id)} // Call handleClick function with data.id
                >
                  <div>
                    <p className="text-[12px] uppercase opacity-30">
                      L{data.doorNumber}
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <span
                      className={`${
                        data.status === 8 ? "bg-blue-500 " : "bg-primary"
                      } rounded-full h-2 w-2 me-2`}
                    />
                    <h1 className="font-bold">{data.name}</h1>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="capitalize">
                      <p className="text-[12px] opacity-60">{data.service}</p>
                    </div>
                    <div className="uppercase text-right">
                      <p className="text-[12px] opacity-60">{data.bookingId}</p>
                    </div>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <div>
                    <SheetTitle>
                      <div className="text-left">
                        <p>Locker Number: {selectedItem?.doorNumber}</p>
                      </div>
                    </SheetTitle>
                    <hr />
                    <SheetDescription className=" text-left">
                      <div className="flex flex-col justify-between h-full p-5">
                        {/* Display other details of the selected item */}
                        {/* Example: */}
                        <div className="mb-4">
                          <p className="text-gray-400">Status</p>
                          <div
                            className={`rounded w-[30px] text-white text-sm text-center ${
                              data.status === 8 ? "bg-blue-500 " : "bg-primary"
                            }`}
                          >
                            {selectedItem?.status}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Locker</p>
                          <div>
                            L{selectedItem?.doorNumber}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p  className="text-gray-400">
                            Name
                          </p>
                          <div>
                            {selectedItem?.name}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">
                            Booking ID
                          </p>
                          <p>{selectedItem?.bookingId}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Service</p>
                          <p>{selectedItem?.service}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">
                            Contact
                          </p>
                          <p>Mobile number</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">
                            Contract
                          </p>
                          <p>{selectedItem?.from} - {selectedItem?.to}</p>
                        </div>
                      </div>
                    </SheetDescription>
                    {(selectedItem?.status === 3 && (
                      <div className="w-full text-left">
                        <LockerResetPinAction locker={selectedItem} />
                      </div>
                    )) ||
                      null}
                  </div>
                </SheetHeader>
                <SheetFooter className="grid `">

       
<AlertDialog>
        <AlertDialogTrigger className="w-full">
          <Button
            disabled
            onClick={() => setShowDialog(true)}
            className="w-full bg-primary"
          >
            Renew
          </Button>
        </AlertDialogTrigger>
        {(showDialog && (
          <AlertDialogContent className="w-3/4">
            <AlertDialogHeader>
              <AlertDialogTitle className="grid gap-y-2">
                <div className="flex items-center justify-center">
                  <Image
                    src={WarningIcon}
                    width={32}
                    height={28}
                    alt="warning icon"
                  />
                </div>
                <div className="flex items-center justify-center">Hold Up!</div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="text-center">
                  {`Are you sure you want to renew Locker ${selectedItem?.doorNumber}?`}
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full grid grid-cols-2">
              <AlertDialogCancel className="w-full hover:bg-gray-200">
                No
              </AlertDialogCancel>

              <AlertDialog>
                <AlertDialogTrigger>
                  <AlertDialogAction
                    onClick={() => handleRenewDoor()}
                    className=" w-full bg-destructive hover:bg-destructive hover:opacity-80"
                  >
                    Yes, Renew
                  </AlertDialogAction>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-3/4">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="grid gap-y-2">
                      <div className="flex items-center justify-center">
                        <Image
                          src={SuccessIcon}
                          width={32}
                          height={28}
                          alt="warning icon"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        Locker Renewed
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-center">
                        {`We've now renew Locker ${selectedItem?.doorNumber}`}
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="w-full">
                    <AlertDialogAction
                      onClick={() => setShowDialog(false)}
                      className=" w-full bg-primary hover:opacity-80"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </AlertDialogFooter>
          </AlertDialogContent>
        )) ||
          null}
      </AlertDialog>





      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <Button
            onClick={() => setShowDialog(true)}
            variant="outlineDestructive"
            className="w-full"
          >
            Terminate
          </Button>
        </AlertDialogTrigger>
        {showDialog && (
          <AlertDialogContent className="w-3/4">
            <AlertDialogHeader>
              <AlertDialogTitle className="grid gap-y-2">
                <div className="flex items-center justify-center">
                  <Image
                    src={WarningIcon}
                    width={32}
                    height={28}
                    alt="warning icon"
                  />
                </div>
                <div className="flex items-center justify-center">Hold Up!</div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="text-center">
                  {`Are you sure you want to remove our client on our Smart Locker?`}
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full grid grid-cols-2">
              <AlertDialogCancel className="w-full hover:bg-gray-200">
                No
              </AlertDialogCancel>

              <AlertDialog>
                <AlertDialogTrigger>
                  <AlertDialogAction
                    onClick={() => handeTerminate()}
                    className=" w-full bg-destructive hover:bg-destructive hover:opacity-80"
                  >
                    Yes, Remove
                  </AlertDialogAction>
                </AlertDialogTrigger>
                {showSuccessDialog && (
                  <AlertDialogContent className="w-3/4">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="grid gap-y-2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={SuccessIcon}
                            width={32}
                            height={28}
                            alt="warning icon"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          Client Removed
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className="text-center">
                          {`We've now removed the client from Locker ${selectedItem?.doorNumber}`}
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-full">
                      <AlertDialogAction
                        onClick={() => {
                          setShowDialog(false);
                        }}
                        className=" w-full bg-primary hover:opacity-80"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
                {showErrDialog && (
                  <AlertDialogContent className="w-[80%] rounded">
                    <AlertDialogHeader className="mb-10">
                      <AlertDialogTitle className="grid gap-y-2">
                        <div className="flex items-center justify-center">
                          <Image
                            src={DangerIcon}
                            width={48}
                            height={48}
                            alt="warning icon"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          Locker Terminated
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex items-center justify-center">
                        Please check your mail for the next steps for locker
                        termination
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <div className="w-full">
                        <div>
                          <Button
                            onClick={() => {
                              setShowErrDialog(false); // Hide the dialog
                              setShowDialog(false);
                            }}
                            className="w-full"
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
                {/* )} */}
              </AlertDialog>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>














                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileDataTable;
