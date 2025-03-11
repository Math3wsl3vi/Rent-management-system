import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import ChartData from './ChartData'

  const invoices = [
    {
      property: "Karrot Studios",
      tenant: "Levi Mathews",
      arreas: "5000",
      houseNumber:'8A',
      month: "February",
    },
    {
      property: "Karrot Studios",
      tenant: "Alex kiptum",
      arreas: "5000",
      houseNumber:'4B',
      month: "February",
    },
    {
      property: "Karrot Studios",
      tenant: "John Doe",
      arreas: "5000",
      houseNumber:'10C',
      month: "February ",
    },
    {
      property: "Karrot Studios",
      tenant: "John Kabuga",
      arreas: "10000",
      houseNumber:'2C',
      month: "February",
    },
    {
      property: "Karrot Studios",
      tenant: "Mary Jeptoo",
      arreas: "5000",
      houseNumber:'15B',
      month: "February",
    },
    {
      property: "Karrot Studios",
      tenant: "Ali Hassan",
      arreas: "7000",
      houseNumber:'9A',
      month: "February",
    },
    {
      property: "Karrot Studios",
      tenant: "Kiptoo David",
      arreas: "5000",
      houseNumber:'11B',
      month: "February",
    },
  ]
   

const RevenueData = () => {
  return (
    <div className='flex flex-row w-full mt-10 gap-10'>
        <div className='w-2/3 border rounded-md p-2' >
            <h1 className='font-poppins text-green-1 mb-5'>Rent Arreas Data</h1>
            <div>
            <Table>
      <TableCaption>A list of your rent arreas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Property</TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead>House Number</TableHead>
          <TableHead>Month</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.property}>
            <TableCell className="font-medium">{invoice.property}</TableCell>
            <TableCell>{invoice.tenant}</TableCell>
            <TableCell>{invoice.houseNumber}</TableCell>
            <TableCell>{invoice.month}</TableCell>
            <TableCell className="text-right">{invoice.arreas}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Arreas</TableCell>
          <TableCell className="text-right">ksh 20,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
            </div>
        </div>
        <div className='w-1/3 border rounded-md p-2'>
            <h1 className='font-poppins text-green-1'>Revenue Data</h1>
        <div className='h-full'>
           <ChartData/>
        </div>
        </div>
    </div>
  )
}

export default RevenueData