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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Permanent Address</TableHead>
            <TableHead>File Upload</TableHead>
            <TableHead>Pdf Upload</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Date of Joining</TableHead>
            <TableHead>Status</TableHead>
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
                  <TableCell>{item?.name || "N/A"}</TableCell>
                  <TableCell>{item?.email || "N/A"}</TableCell>
                  <TableCell>
                    {formatMobileNumber(item?.mobile_number)}
                  </TableCell>
                  <TableCell>{item?.designation || "N/A"}</TableCell>
                  <TableCell>{item?.account_number || "N/A"}</TableCell>
                  <TableCell>{item?.permanent_address || "N/A"}</TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md p-4">
                        <img
                          src={`http://localhost:8081/uploads/${item.fileUpload}`}
                          alt="Preview"
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </DialogContent>
                    </Dialog> 
                  </TableCell>

                  <TableCell>
                    <a
                      href={`http://localhost:8081/uploads/${item.pdfUpload}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="text-sm bg-[#8B8B8B] text-white border-white-800 hover:bg-blue-50"
                      >
                        View PDF
                      </Button>
                    </a>
                  </TableCell>

                  <TableCell>{formatPKRS(item?.salary) || "N/A"}</TableCell>
                  <TableCell>
                    {formatDateOnly(item?.date_of_birth) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {formatDateOnly(item?.date_of_joining) || "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
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
