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

export default function DataTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>budget</TableHead>
            <TableHead>Project Stack</TableHead>
            <TableHead>Project Niche</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Award</TableHead>
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
                  <TableCell>{item?.projectName || "N/A"}</TableCell>
                  <TableCell>{item?.projectDescription || "N/A"}</TableCell>
                  <TableCell>{item?.budget || "N/A"}</TableCell>
                  <TableCell>{item?.projectStack.join(", ") || "N/A"}</TableCell>
                  <TableCell>{item?.projectNiche || "N/A"}</TableCell>
                  <TableCell>{item?.notes || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.award === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.award === 1 ? "Awarded" : "Not-Awarded"}
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
