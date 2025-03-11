"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig"; // Firebase setup
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Wrench } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  apartment: string;
  rentDue: string;
  email?: string;        // Optional: If tenants have associated emails
  phone?: string;        // Optional: For contact info
  leaseStart?: string;   // Optional: Lease start date
  leaseEnd?: string;     // Optional: Lease end date
  rentAmount?: number;   // Optional: Monthly rent
  status?: "active" | "evicted" | "pending"; // Optional: Tenant status
}



const TenantsPage = () => {
  const [tenantData, setTenantData] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tenant details
  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const tenantsRef = collection(db, "tenants");
        const snapshot = await getDocs(tenantsRef);
        const data = snapshot.docs.map((doc) => {
          const tenant = doc.data();
  
          return {
            id: doc.id,
            name: tenant.name || "N/A", // Ensure name exists
            apartment: tenant.apartment || "N/A",
            rentDue: tenant.rentDue || "N/A",
            email: tenant.email || "",
            phone: tenant.phone || "",
            leaseStart: tenant.leaseStart || "",
            leaseEnd: tenant.leaseEnd || "",
            rentAmount: tenant.rentAmount || 0,
            status: tenant.status || "active",
          } as Tenant; // Explicitly cast to Tenant
        });
  
        if (data.length > 0) setTenantData(data[0]);
  
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
      setLoading(false);
    };
  
    fetchTenantData();
  }, []);
  

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/register");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tenant details...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {/* Rent Summary */}
      <Card>
        <CardHeader>
          <CardTitle>🏠 Tenant Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {tenantData?.name || "N/A"}</p>
          <p><strong>Apartment:</strong> {tenantData?.apartment || "N/A"}</p>
          <p className="text-red-500"><strong>Rent Due:</strong> {tenantData?.rentDue || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Actions Section */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => router.push("/payments")}>
          💳 Pay Rent
        </Button>
        <Button variant="outline" onClick={() => router.push("/receipts")}>
          📜 View Receipts
        </Button>
        <Button variant="outline" onClick={() => router.push("/maintenance")}>
          <Wrench className="mr-2" /> Request Repair
        </Button>
        <Button variant="outline" onClick={() => router.push("/notifications")}>
          <Bell className="mr-2" /> View Notices
        </Button>
      </div>

      {/* Logout */}
      <Button className="w-full bg-red-500 text-white" onClick={handleLogout}>
        <LogOut className="mr-2" /> Logout
      </Button>
    </div>
  );
};

export default TenantsPage;
