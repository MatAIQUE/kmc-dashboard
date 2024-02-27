import React, { useState } from "react";
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
  LockerRenewDoorAction,
  LockerResetPinAction,
  LockerTerminateDoorAction,
} from "./action-cell";
import { Locker } from "./columns";

interface MobileDataTableProps {
  status: string;
  dataOccupied: Locker[];
  onTerminate: () => void;
}

const MobileDataTable: React.FC<MobileDataTableProps> = ({
  status,
  dataOccupied,
  onTerminate,
}) => {
  const [selectedItem, setSelectedItem] = useState<Locker | null>(null);

  const handleClick = (id: string) => {
    // Find the selected item by id
    const item = dataOccupied.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
    }
  };

  const formattedFromDate = selectedItem
    ? new Date(selectedItem.from).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formattedToDate = selectedItem
    ? new Date(selectedItem.to).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const badge =
    selectedItem?.status === 8 ? (
      <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-blue-500">
        Reserved
      </span>
    ) : selectedItem?.status === 3 ? (
      <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-orange-500">
        Occupied
      </span>
    ) : null;

  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrDialog, setShowErrDialog] = useState(false);

  return (
    <>
      {status === "occupied" && (
        <div className="block md:hidden w-full">
          {dataOccupied.map((data) => (
            <Sheet key={data.id}>
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
                          {badge}
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Locker</p>
                          <div>L{selectedItem?.doorNumber}</div>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Name</p>
                          <div>{selectedItem?.name}</div>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Booking ID</p>
                          <p>{selectedItem?.bookingId}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Service</p>
                          <p>{selectedItem?.service}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Contact</p>
                          <p>{selectedItem?.mobileNumber}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-400">Contract</p>
                          <p>
                            {formattedFromDate} - {formattedToDate}
                          </p>
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
                  <SheetFooter className="">
                    {(selectedItem?.status === 3 && (
                      <SheetFooter className="justify-center">
                        <div className="w-full grid grid-cols-2 gap-2">
                          <LockerTerminateDoorAction
                            locker={selectedItem}
                            onTerminate={onTerminate}
                          />
                          <LockerRenewDoorAction
                            locker={selectedItem}
                            onTerminate={onTerminate}
                          />
                        </div>
                      </SheetFooter>
                    )) ||
                      null}
                  </SheetFooter>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileDataTable;
