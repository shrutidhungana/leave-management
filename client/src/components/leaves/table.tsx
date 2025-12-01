// components/common/CustomTable.tsx
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
    <div className="overflow-x-auto w-full">
      <table className="w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={`text-left px-4 py-2 text-gray-700 font-medium uppercase text-sm tracking-wider
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
        <tbody>
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`border-b border-gray-300 hover:bg-indigo-50 transition cursor-pointer
                    ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className={`px-4 py-2 text-gray-800 border-r border-gray-300 ${
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
