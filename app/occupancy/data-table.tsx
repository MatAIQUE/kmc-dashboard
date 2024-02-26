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
import { Skeleton } from "../../components/ui/skeleton";

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
              className="min-w-full py-3 md:text-xs text-md"
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
                    <div className="grid gap-y-4">
                      <div className="grid grid-cols-8 gap-2">
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                        <Skeleton className="w-[50px] h-[20px]"/>
                      </div>
                    </div>
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
    </>
  );
}
