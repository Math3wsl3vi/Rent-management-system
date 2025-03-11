"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tenants = [
  {
    property: "Karrot Studios",
    tenant: "Levi Mathews",
    houseNumber: "8A",
    month: "February",
    waterArrears: 1500,
    rentArrears: 5000,
    powerArrears: 1200,
    depositRequest: "None",
  },
  {
    property: "Karrot Studios",
    tenant: "Alex Kiptum",
    houseNumber: "4B",
    month: "February",
    waterArrears: 1000,
    rentArrears: 5000,
    powerArrears: 1300,
    depositRequest: "Pending",
  },
  {
    property: "Greenwood Apartments",
    tenant: "John Doe",
    houseNumber: "10C",
    month: "February",
    waterArrears: 1200,
    rentArrears: 5000,
    powerArrears: 1400,
    depositRequest: "Completed",
  },
  {
    property: "Karrot Studios",
    tenant: "John Kabuga",
    houseNumber: "2C",
    month: "February",
    waterArrears: 1800,
    rentArrears: 10000,
    powerArrears: 2000,
    depositRequest: "None",
  },
  {
    property: "Greenwood Apartments",
    tenant: "Mary Jeptoo",
    houseNumber: "15B",
    month: "February",
    waterArrears: 900,
    rentArrears: 5000,
    powerArrears: 1600,
    depositRequest: "Pending",
  },
];

const Tenants = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Filter tenants based on the selected property
  const filteredTenants = selectedProperty
    ? tenants.filter((tenant) => tenant.property === selectedProperty)
    : tenants;

  // Calculate total arrears dynamically for filtered tenants
  const totalWaterArrears = filteredTenants.reduce(
    (sum, tenant) => sum + tenant.waterArrears,
    0
  );
  const totalRentArrears = filteredTenants.reduce(
    (sum, tenant) => sum + tenant.rentArrears,
    0
  );
  const totalPowerArrears = filteredTenants.reduce(
    (sum, tenant) => sum + tenant.powerArrears,
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Tenant Rent Arrears
        </h2>
        <Select onValueChange={(value) => setSelectedProperty(value)}>
          <SelectTrigger className="w-[180px] active:ring-0 active:ring-offset-0">
            <SelectValue placeholder="Select Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Karrot Studios">Karrot Studios</SelectItem>
            <SelectItem value="Greenwood Apartments">Greenwood Apartments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>Overview of rent arrears for February.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>House Number</TableHead>
            <TableHead>Entry Month</TableHead>
            <TableHead className="text-right">Water Arrears (Ksh)</TableHead>
            <TableHead className="text-right">Rent Arrears (Ksh)</TableHead>
            <TableHead className="text-right">Power Arrears (Ksh)</TableHead>
            <TableHead className="text-right">Deposit Request</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTenants.map((tenant, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{tenant.property}</TableCell>
              <TableCell>{tenant.tenant}</TableCell>
              <TableCell>{tenant.houseNumber}</TableCell>
              <TableCell>{tenant.month}</TableCell>
              <TableCell className="text-right">
                {tenant.waterArrears.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {tenant.rentArrears.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {tenant.powerArrears.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`px-2 py-1 rounded-md text-white text-sm ${
                    tenant.depositRequest === "Pending"
                      ? "bg-yellow-500"
                      : tenant.depositRequest === "Completed"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {tenant.depositRequest}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="font-semibold">
              Total Arrears
            </TableCell>
            <TableCell className="text-right font-semibold">
              {totalWaterArrears.toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {totalRentArrears.toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-semibold">
              {totalPowerArrears.toLocaleString()}
            </TableCell>
            <TableCell className="text-center font-semibold">-</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Tenants;
