// src/components/DataTable/DataTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog.jsx";
import { Skeleton } from "../ui/skeleton";
import TableActions from "./TableActions";
import {
  formatMobileNumber,
  formatPKRS,
  formatDateOnly,
} from "../../helper_functions/all-helper-functions.js";
import { Button } from "../ui/button.jsx";
import { Card, CardContent } from "../ui/card.jsx";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array(11)
                    .fill(0)
                    .map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : data?.length > 0 ? (
            data.map((item) => {
              // console.log("item: ", item);

              return (
                <TableRow key={item._id}>
                  <TableCell>{formatDateOnly(item?.date) || "N/A"}</TableCell>
                  <TableCell>{item?.reason || "N/A"}</TableCell>
                  <TableCell>{formatPKRS(item?.amount) || "N/A"}</TableCell>
                  <TableCell>{item?.type || "N/A"}</TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(item)}
                      onDelete={() => onDelete(item._id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-4">
                No items found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
