import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
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
import axios from "axios";
import { Locker, columns } from "./columns";

import WarningIcon from "../../app/assets/icons/warning-icon.svg";
import SuccessIcon from "../../app/assets/icons/success-icon.svg";

interface CellProps {
  locker: Locker;
  onTerminate: () => void;
}

const getStatusBadge = (status: number): JSX.Element | null => {
  if (status === 8) {
    return (
      <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-blue-500">
        Reserved
      </span>
    );
  } else if (status === 3) {
    return (
      <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-orange-500">
        Occupied
      </span>
    );
  } else {
    return null;
  }
};

/* Start of locker actions 
  TODO: Move to separate .tsx files
*/
// INFO: RESET PIN
const LockerResetPinAction = ({ locker }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const handleResetPin = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        // FIXME: STANDARDIZE HTTP Request Library, AXIOS OR FETCH?? - We're currently using both, must choose 1.
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/door/${id}/reset-pin`
      );
      if (response.status === 200) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error resetting pin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <AlertDialog>
        <AlertDialogTrigger>
          <button
            onClick={() => setShowDialog(true)}
            className="p-2 text-destructive text-sm font-bold"
          >
            Reset PIN Code
          </button>
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
                <div className="flex items-center justify-center">
                  Reset PIN?
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="text-center">
                  {`Are you sure you want to reset the PIN Code of Locker ${locker.doorNumber}?`}
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
                    onClick={() => handleResetPin(locker.id)}
                    className=" w-full bg-destructive hover:bg-destructive hover:opacity-80"
                  >
                    {isLoading ? "Loading..." : "Yes, Reset PIN"}
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
                        Reset Successful
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-center">
                        {`Locker ${locker.doorNumber}`}&apos;s Pin has been
                        reset we&apos;ve send the user a new PIN Code
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
    </Sheet>
  );
};

// INFO: TERMINATE DOOR
const LockerTerminateDoorAction = ({ locker, onTerminate }: CellProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handeTerminateDoor = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        // FIXME: STANDARDIZE HTTP Request Library, AXIOS OR FETCH?? - We're currently using both, must choose 1.
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/${locker.lockerId}/door/${locker.id}/terminate`,
        { bookingNumber: locker.bookingId }
      );
      if (response.status === 200) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error terminating door:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
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
                    onClick={() => handeTerminateDoor()}
                    className=" w-full bg-destructive hover:bg-destructive hover:opacity-80"
                  >
                    Yes, Remove
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
                        Client Removed
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-center">
                        {`We've now removed the client from Locker ${locker.doorNumber}`}
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="w-full">
                    <AlertDialogAction
                      onClick={() => {
                        onTerminate();
                        setShowDialog(false);
                      }}
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
    </Sheet>
  );
};

// INFO: RENEW DOOR
const LockerRenewDoorAction = ({ locker }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const handeTerminateDoor = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        // FIXME: STANDARDIZE HTTP Request Library, AXIOS OR FETCH?? - We're currently using both, must choose 1.
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lockers/${locker.lockerId}/door/${locker.id}/renew`,
        { bookingNumber: locker.bookingId }
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
    <Sheet>
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <Button
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
                  {`Are you sure you want to renew Locker ${locker.doorNumber}?`}
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
                    onClick={() => handeTerminateDoor()}
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
                        {`We've now renew Locker ${locker.doorNumber}`}
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
    </Sheet>
  );
};

export const ActionCell: React.FC<CellProps> = ({ locker, onTerminate }) => {
  //   const locker = locker;

  const handleViewClick = () => {
    const fromDate = new Date(locker.from);

    const formattedFromDate = fromDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const toDate = new Date(locker.to);

    const formattedToDate = toDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="text-primary" onClick={handleViewClick}>
        View
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div>
            <SheetTitle>
              <div className="text-left">
                <p>{`Locker ${locker.doorNumber}`}</p>{" "}
              </div>
            </SheetTitle>
            <hr />
            <SheetDescription className="">
              <div className="flex flex-col justify-between h-full p-5">
                {columns.map((column: any) => (
                  <div
                    key={column.accessorKey}
                    className="grid grid-cols-2 gap-y-2"
                  >
                    <div className="text-left">
                      <p>{column.header}</p>
                    </div>
                    <div className="text-left text-black">
                      {/* Render data dynamically based on accessorKey */}
                      <p>
                        {column.accessorKey === "status"
                          ? getStatusBadge(
                              locker[
                                column.accessorKey as keyof Locker
                              ] as number
                            )
                          : column.accessorKey === "from" ||
                            column.accessorKey === "to"
                          ? new Date(
                              locker[
                                column.accessorKey as keyof Locker
                              ] as string
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : (locker[
                              column.accessorKey as keyof Locker
                            ] as string)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetDescription>
            {(locker.status === 3 && (
              <div className="w-full">
                <LockerResetPinAction locker={locker} />
              </div>
            )) ||
              null}
          </div>
          {(locker.status === 3 && (
            <SheetFooter className="justify-center">
              <div className="w-full grid grid-cols-2 gap-2">
                <LockerTerminateDoorAction
                  locker={locker}
                  onTerminate={onTerminate}
                />
                <LockerRenewDoorAction locker={locker} />
              </div>
            </SheetFooter>
          )) ||
            null}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
