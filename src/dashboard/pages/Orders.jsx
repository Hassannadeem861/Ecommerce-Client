import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, MoreVertical, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAllOrders, updateOrderStatus } from "../../utils/order-api.js";
import toast from "react-hot-toast"
export default function ManageOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();

      if (response.success) {
        setAllOrders(response?.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  // ✅ Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Mark order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "completed");
      toast.success("Order marked as Delivered ✅");
      setAllOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o))
      );
      // fetchOrders()
    } catch (error) {
      toast.error("Failed to update order ❌");
    }
  };

  const handleDelete = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Order deleted 🗑️");
    setDeleteDialogOpen(false);
    // TODO: yahan API call lagao order delete ka
    setAllOrders(allOrders.filter((o) => o.id !== orderToDelete));
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(allOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = allOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Shipping Address</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.first_name || order.last_name
                        ? `${order.first_name} ${order.last_name}`
                        : "Guest"}
                    </TableCell>
                    <TableCell>{order.phone_number || "-"}</TableCell>
                    <TableCell>{order.shipping_address || "N/A"}</TableCell>
                    <TableCell>Rs. {Math.round(order.total_amount)}</TableCell>
                    <TableCell className="capitalize">
                      {order.payment_method === "cash_on_delivery"
                        ? "Cash on Delivery"
                        : order.payment_method?.replace("_", " ") ||
                          "No Payment Method"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "secondary"
                            : order.status === "completed"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {order.status === "completed"
                          ? "Delivered"
                          : order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {/* View */}
                        <Link to={`/dashboard/order/${order.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 p-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        {/* More Options */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {order.status !== "completed" && (
                              <DropdownMenuItem
                                className="text-green-600 focus:text-green-600 focus:bg-green-50"
                                onClick={(e) => {
                                  e.preventDefault();
                                  markAsDelivered(order.id);
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Delivered
                              </DropdownMenuItem>
                            )}
                            {/* <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(order.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden space-y-4">
            {paginatedOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {order.first_name || order.last_name
                        ? `${order.first_name} ${order.last_name}`
                        : "Guest"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.phone_number || "-"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "pending"
                        ? "secondary"
                        : order.status === "completed"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p>Rs. {order.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="capitalize">
                      {order.payment_method === "cash_on_delivery"
                        ? "Cash on Delivery"
                        : order.payment_method?.replace("_", " ") ||
                          "No Payment Method"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-xs">{order.shipping_address}</p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <Link to={`/dashboard/order/${order.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {order.status !== "completed" && (
                        <DropdownMenuItem
                          className="text-green-600 focus:text-green-600 focus:bg-green-50"
                          onClick={(e) => {
                            e.preventDefault();
                            markAsDelivered(order.id);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Delivered
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(order.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
