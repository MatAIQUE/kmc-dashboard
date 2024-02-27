"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export type Locker = {
  id: string;
  lockerId: string;
  status: number;
  doorNumber: string;
  service: "Coworking Space" | "Virtual Office" | "Serviced Office";
  bookingId: string;
  name: string;
  from: string;
  to: string;
  mobileNumber: string;
};

const commonColumns: ColumnDef<Locker>[] = [
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
];

export const tableColumns: ColumnDef<Locker>[] = [
  ...commonColumns,
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
];

export const sheetColumns: ColumnDef<Locker>[] = [
  ...commonColumns,
  {
    accessorKey: "mobileNumber",
    header: "Contact #",
  },
  {
    accessorKey: "from",
    header: "Contract",
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
];
