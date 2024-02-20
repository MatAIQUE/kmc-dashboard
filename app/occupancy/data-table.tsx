"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import React from "react";
import { IoDownloadOutline } from "react-icons/io5";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      {/* MEDIUM SCREEN */}
      <div className="hidden md:block">
        <div className="flex w-full justify-end gap-2 my-2">
          <div className="w-full md:w-auto">
            <Input
              placeholder="Name, ID, Locker"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="min-w-full py-3"
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {/* MEDIUM SCREEN */}

      {/* SMALL SCREEN */}
      <div className="block md:hidden w-full">
        {/* Map Here */}
        <div className="grid border-b-2 py-4 gap-y-2">
          <div>
            <p className="text-[12px] uppercase opacity-30">L01</p>
          </div>
          <div className="flex items-center py-2">
            <span className="bg-primary rounded-full h-2 w-2 me-2" />
            <h1 className="font-bold">Charles Gomez</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="capitalize">
              <p className="text-[12px] opacity-60">Coworking Space</p>
            </div>
            <div className="uppercase text-right">
              <p className="text-[12px] opacity-60">KMC-0001</p>
            </div>
          </div>
        </div>
        {/* Map Here */}
        <div className="grid border-b-2 py-4 gap-y-2">
          <div>
            <p className="text-[12px] uppercase opacity-30">L01</p>
          </div>
          <div className="flex items-center py-2">
            <span className="bg-primary rounded-full h-2 w-2 me-2" />
            <h1 className="font-bold">Charles Gomez</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="capitalize">
              <p className="text-[12px] opacity-60">Coworking Space</p>
            </div>
            <div className="uppercase text-right">
              <p className="text-[12px] opacity-60">KMC-0001</p>
            </div>
          </div>
        </div>
        <div className="grid border-b-2 py-4 gap-y-2">
          <div>
            <p className="text-[12px] uppercase opacity-30">L01</p>
          </div>
          <div className="flex items-center py-2">
            <span className="bg-primary rounded-full h-2 w-2 me-2" />
            <h1 className="font-bold">Charles Gomez</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="capitalize">
              <p className="text-[12px] opacity-60">Coworking Space</p>
            </div>
            <div className="uppercase text-right">
              <p className="text-[12px] opacity-60">KMC-0001</p>
            </div>
          </div>
        </div>
        <div className="grid border-b-2 py-4 gap-y-2">
          <div>
            <p className="text-[12px] uppercase opacity-30">L01</p>
          </div>
          <div className="flex items-center py-2">
            <span className="bg-blue-500 rounded-full h-2 w-2 me-2" />
            <h1 className="font-bold">Charles Gomez</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="capitalize">
              <p className="text-[12px] opacity-60">Coworking Space</p>
            </div>
            <div className="uppercase text-right">
              <p className="text-[12px] opacity-60">KMC-0001</p>
            </div>
          </div>
        </div>
      </div>
      {/* SMALL SCREEN */}
    </>
  );
}
