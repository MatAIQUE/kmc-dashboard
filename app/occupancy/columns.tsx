"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "../../components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Locker = {
  id: string;
  status: "Occupied" | "Reserved";
  locker: string;
  service: "Coworking Space" | "Virtual Office" | "Serviced Office";
  bookingId: string;
  name: string;
  from: string;
  to: string;
};

export const columns: ColumnDef<Locker>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "locker",
    header: "Locker",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "bookingId",
    header: "Booking ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const locker = row.original;

      return (
        <Sheet>
          <SheetTrigger className="text-primary">View</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div>
                <SheetTitle>
                  <div className="text-left">
                    <p>Locker 01</p>
                  </div>
                </SheetTitle>
                <hr />
                <SheetDescription className="">
                  <div className="flex flex-col justify-between h-full p-5">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-left">
                        <p>Status</p>
                      </div>
                      <div className="flex items-start">
                        <Badge>Occupied</Badge>
                      </div>
                      <div className="text-left">
                        <p>Locker</p>
                      </div>
                      <div className="text-left text-black">
                        <p>Locker 01</p>
                      </div>
                      <div className="text-left">
                        <p>Service</p>
                      </div>
                      <div className="text-left text-black">
                        <p>Coworking Space</p>
                      </div>
                      <div className="text-left">
                        <p>Booking ID</p>
                      </div>
                      <div className="text-left text-black">
                        <p>KMC-0001</p>
                      </div>
                      <div className="text-left">
                        <p>Name</p>
                      </div>
                      <div className="text-left text-black">
                        <p>Charles Gomez</p>
                      </div>
                      <div className="text-left">
                        <p>Contact #</p>
                      </div>
                      <div className="text-left text-black">
                        <p>+63 123 456 7890</p>
                      </div>
                      <div className="text-left">
                        <p>Contract</p>
                      </div>
                      <div className="text-left text-black">
                        <p>Jan 01, 2024 - Dec 30, 2025</p>
                      </div>
                    </div>
                  </div>
                </SheetDescription>
              </div>

              <SheetFooter className="justify-center">
                <div className="w-full">
                  <div className="mb-2">
                    <Button variant="outlineDestructive" className="w-full">
                      Terminate
                    </Button>
                  </div>
                  <div>
                    <Button className="w-full">Renew</Button>
                  </div>
                </div>
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
