"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Locker = {
  id: string;
  status: number;
  doorNumber: string;
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
    cell: ({ row }) => {
      // Conditionally apply a class based on the value of the status
      const statusClassName = row.original.status === 3 ? "bg-orange-500" : "";

      // Conditionally render a badge with an orange background if status === 3
      const badge =
        row.original.status === 8 ? (
          <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-orange-500">
            Occupied
          </span>
        ) : row.original.status === 3 ? (
          <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-orange-500">
            Occupied
          </span>
        ) : null;

      return <div className="flex items-center justify-end">{badge}</div>;
    },
  },
  {
    accessorKey: "doorNumber",
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
              <SheetTitle>Locker 01</SheetTitle>
              <hr />
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
