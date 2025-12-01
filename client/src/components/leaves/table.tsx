import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
}

export function CustomTable<T>({ columns, data }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full bg-gray-50 p-4 rounded-lg shadow-lg">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <thead className="bg-gradient-to-r from-indigo-100 to-indigo-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`text-left px-5 py-3 text-gray-700 font-semibold uppercase text-sm tracking-wide
                      border-r border-gray-300 ${
                        idx === headerGroup.headers.length - 1
                          ? "border-r-0"
                          : ""
                      }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400 font-medium"
              >
                No data available
              </td>
            </tr>
          )}

          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`transition-all cursor-pointer
                  ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} 
                  hover:bg-indigo-50`}
            >
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-5 py-3 text-gray-800 border-r border-gray-200 ${
                    idx === row.getVisibleCells().length - 1 ? "border-r-0" : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
