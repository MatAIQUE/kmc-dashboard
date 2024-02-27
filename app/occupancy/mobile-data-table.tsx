import React, { useState } from "react";
import { Locker } from "./columns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { LockerResetPinAction } from "./action-cell";

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

  return (
    <>
      {status === "occupied" && (
        <div className="block md:hidden w-full">
          {dataOccupied.map((data) => (
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
              <Sheet>
                <SheetTrigger className="text-primary">View</SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <div>
                      <SheetTitle>
                        <div className="text-left">
                          <p>Locker Number: {selectedItem?.doorNumber}</p>
                        </div>
                      </SheetTitle>
                      <hr />
                      <SheetDescription className="">
                        <div className="flex flex-col justify-between h-full p-5">
                          {/* Display other details of the selected item */}
                          {/* Example: */}
                          <p>Name: {selectedItem?.name}</p>
                          <p>Service: {selectedItem?.service}</p>
                          <p>Booking ID: {selectedItem?.bookingId}</p>
                        </div>
                      </SheetDescription>
                      {(selectedItem?.status === 3 && (
                        <div className="w-full">
                          <LockerResetPinAction locker={selectedItem} />
                        </div>
                      )) ||
                        null}
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileDataTable;
