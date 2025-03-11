// import { Button } from "@/components/ui/button"

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row justify-end gap-10 bg-gray-100 px-32 py-5">
        <Link href='/pricing' className="font-poppins">Demo</Link>
        <Link href='/pricing' className="font-poppins">Pricing</Link>
        <Link href='/pricing' className="font-poppins">About Us</Link>
      </div>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-semibold text-gray-900 font-poppins">Landlord Rent Collection & Reminder SaaS</h1>
      <p className="text-lg text-gray-700 mt-4 font-poppins">Automate rent collection, send reminders, and track payments effortlessly.</p>
      
      <div className="mt-6 space-x-4">
        <Link href="/auth/register" className="px-6 py-3 bg-green-1 text-white rounded-md shadow-md hover:bg-green-700 font-poppins">
          Get Started
        </Link>
        <Link href="/dashboard" className="px-6 py-3 bg-gray-300 text-gray-900 rounded-md shadow-md hover:bg-gray-400 font-poppins">
          Demo Dashboard
        </Link>
      </div>
    </main>
    </div>
  )
}
