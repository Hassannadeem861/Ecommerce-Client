// src/components/DataTable/DataTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import Api from "../../services/axios.js"; // Axios instance
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toast } from "react-hot-toast";
import logo from "../../assets/eb-technology.png";
// ✅ Correct way to register fonts
pdfMake.vfs = pdfFonts.vfs;

export default function DataTable({ data = [], loading }) {
  const [slip, setSlip] = useState(null);

  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownload = async (item) => {
    try {
      const res = await Api.get(`/api/v1/get-single-salary-slip/${item._id}`);
      const slipData = res?.data?.salarySlip;

      if (!slipData) {
        toast.error("Salary slip data not found!");
        return;
      }

      const logoBase64 = await getBase64ImageFromURL(logo);
      const today = new Date().toLocaleDateString();
      const primaryColor = "#f4630a";
      const borderColor = "#e0e0e0";

      const docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 40, 40, 40],
        content: [
          {
            columns: [
              {
                image: logoBase64,
                width: 100,
              },
              {
                text: `Date: ${today}`,
                style: "dateText",
                alignment: "right",
                margin: [0, 20, 0, 0],
              },
            ],
            margin: [0, 0, 0, 20],
          },
          {
            columns: [
              {
                table: {
                  widths: ["50%", "50%"],
                  body: [
                    ["Employee Name:", slipData?.employerId?.name || "N/A"],
                    [
                      "Designation:",
                      slipData?.employerId?.designation || "N/A",
                    ],
                    [
                      "Salary Month:",
                      slipData?.month
                        ? new Date(`${slipData?.month}-01`).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              // year: "numeric",
                            }
                          )
                        : "N/A",
                    ],

                    ["Year:", new Date().getFullYear().toString()],
                  ],
                },
                layout: {
                  hLineWidth: () => 0.5,
                  vLineWidth: () => 0,
                  hLineColor: () => borderColor,
                },
              },
            ],
            margin: [0, 0, 0, 20],
          },
          {
            columns: [
              {
                width: "50%",
                stack: [
                  {
                    text: "EARNINGS",
                    style: "sectionHeader",
                    margin: [0, 0, 0, 8],
                  },
                  {
                    table: {
                      widths: ["70%", "30%"],
                      body: [
                        [
                          "Basic and DA",
                          `Rs.${
                            slipData?.basicSalary ||
                            slipData?.employerId?.salary ||
                            "0.00"
                          }`,
                        ],
                        ["HRA", `Rs.${slipData?.hra || "0.00"}`],
                        ["Conveyance", `Rs.${slipData?.conveyance || "0.00"}`],
                        [
                          { text: "Total Earnings", bold: true },
                          {
                            text: `Rs.${
                              slipData?.grossEarnings ||
                              slipData?.employerId?.salary ||
                              "0.00"
                            }`,
                            bold: true,
                          },
                        ],
                      ],
                    },
                    layout: {
                      hLineWidth: (i) => (i === 0 || i === 4 ? 0.5 : 0),
                      vLineWidth: () => 0,
                      hLineColor: () => borderColor,
                    },
                  },
                ],
              },
              {
                width: "50%",
                stack: [
                  {
                    text: "DEDUCTIONS",
                    style: "sectionHeader",
                    margin: [0, 0, 0, 8],
                  },
                  {
                    table: {
                      widths: ["70%", "30%"],
                      body: [
                        [
                          "Personal",
                          `Rs.${slipData?.personalDeductions || "0.00"}`,
                        ],
                        [
                          "Phone Charges",
                          `Rs.${slipData?.phoneCharges || "0.00"}`,
                        ],
                        [
                          "Misc. Value",
                          `Rs.${slipData?.miscDeductions || "0.00"}`,
                        ],
                        [
                          { text: "Total Deductions", bold: true },
                          {
                            text: `Rs.${slipData?.totalDeductions || "0.00"}`,
                            bold: true,
                          },
                        ],
                      ],
                    },
                    layout: {
                      hLineWidth: (i) => (i === 0 || i === 4 ? 0.5 : 0),
                      vLineWidth: () => 0,
                      hLineColor: () => borderColor,
                    },
                  },
                ],
              },
            ],
            columnGap: 20,
            margin: [0, 20, 0, 20],
          },
          // {
          //   text: `Net Salary Payable: Rs.${slipData?.netSalary || "0.00"}`,
          //   style: "sectionHeader",
          //   margin: [0, 0, 0, 20],
          // },

          // signature start
          {
            columns: [
              {
                text: "__________________________",
                margin: [0, 40, 0, 0],
              },
              {
                text: "__________________________",
                alignment: "right",
                margin: [0, 40, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "Employee Signature:",
                bold: true,
                margin: [0, 5, 0, 0],
              },
              {
                text: "Authorized Signature:",
                alignment: "right",
                bold: true,
                margin: [0, 5, 0, 0],
              },
            ],
          },
          // signature end
          {
            text: "www.ebtechnologies.com",
            alignment: "center",
            fontSize: 9,
            color: "#999",
            margin: [0, 20, 0, 0],
          },
        ],
        styles: {
          sectionHeader: {
            fontSize: 12,
            bold: true,
            color: primaryColor,
          },
          dateText: {
            fontSize: 10,
            color: "#666",
            margin: [0, 50, 0, 0], // Left, Top, Right, Bottom
          },
          signatureLabel: {
            fontSize: 10,
            margin: [0, 30, 0, 0],
          },
        },
      };

      pdfMake
        .createPdf(docDefinition)
        .download(
          `Salary_Slip_${slipData?.month}_${
            slipData?.employerId?.name?.replace(" ", "_") || "employee"
          }.pdf`
        );

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download PDF!");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employer</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>View Slip</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(4)].map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            : data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.employerId?.name}</TableCell>
                  <TableCell>{item?.employerId?.designation}</TableCell>
                  <TableCell>Rs. {item?.employerId?.salary}</TableCell>
                  <TableCell>{item?.month}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDownload(item)}
                      className="bg-black text-white px-2 py-1 text-sm rounded hover:bg-gray-800"
                    >
                      Download PDF
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
