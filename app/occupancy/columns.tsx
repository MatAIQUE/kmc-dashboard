"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

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

export const columns: ColumnDef<Locker>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusClassName = row.original.status === 3 ? "bg-orange-500" : "";

      const badge =
        row.original.status === 8 ? (
          <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-blue-500">
            Reserved
          </span>
        ) : row.original.status === 3 ? (
          <span className="inline-block px-2 py-1 text-white text-xs font-semibold rounded bg-orange-500">
            Occupied
          </span>
        ) : null;

      return <div className="flex items-center">{badge}</div>;
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
    cell: ({ row }) => {
      const date = new Date(row.original.from);

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => {
      const date = new Date(row.original.to);

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const locker = row.original;

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
