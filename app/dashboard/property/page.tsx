"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
  

const properties = [
  {
    name: "Karrot Studios",
    location: "Nairobi, Kenya",
    totalUnits: 20,
    occupiedUnits: 15,
    vacantUnits: 5,
    rentCollected: 750000,
    totalArrears: 150000,
    depositRequests: 3,
  },
  {
    name: "Greenwood Apartments",
    location: "Mombasa, Kenya",
    totalUnits: 30,
    occupiedUnits: 28,
    vacantUnits: 2,
    rentCollected: 1200000,
    totalArrears: 100000,
    depositRequests: 1,
  },
];

const tenants = [
  { property: "Karrot Studios", tenant: "Levi Mathews", arrears: 5000, houseNumber: "8A", depositRequest: "Pending", condition: "Good", status: "Occupied" },
  { property: "Karrot Studios", tenant: "Alex Kiptum", arrears: 5000, houseNumber: "4B", depositRequest: "None", condition: "Needs repair", status: "Occupied" },
  { property: "Greenwood Apartments", tenant: "John Doe", arrears: 10000, houseNumber: "10C", depositRequest: "Completed", condition: "Good", status: "Occupied" },
  { property: "Karrot Studios", tenant: "Jane Doe", arrears: 8000, houseNumber: "5A", depositRequest: "Pending", condition: "Bathroom sink issue", status: "Occupied" },
];

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
     <div className="flex justify-between items-center">
     <h2 className="text-xl font-semibold text-gray-700 mb-4">Properties</h2>
     
     {/* dialog */}
     <Dialog>
  <DialogTrigger>
    <Button className="bg-green-500 text-white">Add Property</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Property</DialogTitle>
      <DialogDescription>Enter the name of the new property.</DialogDescription>
    </DialogHeader>
    <Input 
      type="text"
      className="border p-2 w-full rounded-md"
      placeholder="Enter property name"
    />
     <Input 
      type="text"
      className="border p-2 w-full rounded-md"
      placeholder="Enter Location"
    />
    <div className="flex gap-5 ">
    <Input 
      type="text"
      className="border p-2 w-1/2 rounded-md"
      placeholder="Enter number of units"
    />
     <Input 
      type="text"
      className="border p-2 w-1/2 rounded-md"
      placeholder="Enter Rent per room"
    />
    </div>
    <Button className="mt-4 bg-green-1 text-white">
      Add Property
    </Button>
  </DialogContent>
</Dialog>

     </div>
      <Table>
        <TableCaption>List of properties you manage.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Total Units</TableHead>
            <TableHead>Occupied Units</TableHead>
            <TableHead>Vacant Units</TableHead>
            <TableHead>Rent Collected</TableHead>
            <TableHead>Total Arrears</TableHead>
            <TableHead className="text-right">Deposit Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow
              key={property.name}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedProperty(property.name)}
            >
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{property.totalUnits}</TableCell>
              <TableCell>{property.occupiedUnits}</TableCell>
              <TableCell>{property.vacantUnits}</TableCell>
              <TableCell>Ksh {property.rentCollected.toLocaleString()}</TableCell>
              <TableCell>Ksh {property.totalArrears.toLocaleString()}</TableCell>
              <TableCell className="text-right">{property.depositRequests}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Show units (Occupied & Vacant) of selected property */}
      {selectedProperty && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Units in {selectedProperty}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>House Number</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Rent Arrears</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Deposit Request</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: properties.find(p => p.name === selectedProperty)?.totalUnits || 0 }, (_, index) => {
                const unitNumber = `${index + 1}${index % 2 === 0 ? "A" : "B"}`;
                const tenant = tenants.find(tenant => tenant.property === selectedProperty && tenant.houseNumber === unitNumber);
                
                return (
                  <TableRow key={unitNumber} className="capitalize">
                    <TableCell>{unitNumber}</TableCell>
                    <TableCell>{tenant ? tenant.tenant : "Vacant"}</TableCell>
                    <TableCell>{tenant ? `Ksh ${tenant.arrears.toLocaleString()}` : "-"}</TableCell>
                    <TableCell>{tenant ? tenant.condition : "N/A"}</TableCell>
                    <TableCell>
                      {tenant ? (
                        <span className={`font-semibold ${tenant.depositRequest === "Pending" ? "text-yellow-500" : tenant.depositRequest === "Completed" ? "text-green-500" : "text-gray-500"}`}>
                          {tenant.depositRequest}
                        </span>
                      ) : "-"}
                    </TableCell>
                    <TableCell className={`${tenant ? "text-green-600" : "text-red-500"}`}>
                      {tenant ? "Occupied" : "Vacant"}
                    </TableCell>
                    <TableCell>
                      {tenant ? (
                        <Button variant="destructive" size="sm" onClick={() => console.log(`Removing ${tenant.tenant}`)}>Remove</Button>
                      ) : (
                        <Button variant="default" size="sm" onClick={() => console.log(`Assigning a tenant to ${unitNumber}`)}>Assign Tenant</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Properties;
