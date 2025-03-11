"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import RevenueData from "@/components/home/RevenueData";
import TrendAnalysis from "@/components/home/TrendAnalysis";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "tenant" | "landlord";
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser?.uid) {
        setLoading(true);
        console.error("User is not logged in.");
        router.push("/auth/register");
        return;
      }

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData({ ...data, id: data.id ?? userSnap.id });
        } else {
          console.error("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  if (!userData) return <p className="text-center mt-10">User data not available.</p>;

  return (
    <div className=" overflow-auto scroll-mt-10 ">
      <div>
        <h1 className="text-2xl font-poppins">
          Welcome, <span className="font-semibold capitalize">{userData?.name}</span>
        </h1>
        <p className="text-xl font-poppins text-green-1 mb-10">Your Property Dashboard</p>
      </div>

      {/* Dynamic Content Based on Role */}
      {userData.role === "admin" && (
        <AdminDashboard />
      )}
      {userData.role === "landlord" && (
        <LandlordDashboard />
      )}
      {userData.role === "tenant" && (
        <TenantDashboard />
      )}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border py-2 rounded-md">
      <DashboardCard title="Tenants" value="25" />
      <DashboardCard title="Occupied Units" value="22" />
      <DashboardCard title="March's Revenue" value="Ksh 90,000" />
      <DashboardCard title="March's Arrears" value="Ksh 45,000" />
    </div>
    <RevenueData />
    <TrendAnalysis />
  </>
);

// Landlord Dashboard Component
const LandlordDashboard = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border py-2 rounded-md">
      <DashboardCard title="Properties Managed" value="5" />
      <DashboardCard title="Total Tenants" value="40" />
      <DashboardCard title="Total Revenue" value="Ksh 200,000" />
    </div>
    <RevenueData />
    <TrendAnalysis/>
  </>
);

// Tenant Dashboard Component
const TenantDashboard = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border py-2 rounded-md">
      <DashboardCard title="Current Rent" value="Ksh 20,000" />
      <DashboardCard title="Due Date" value="5th April" />
    </div>
  </>
);

// Reusable Dashboard Card
const DashboardCard = ({ title, value }: { title: string; value: string }) => (
  <div className="border-r p-2 min-h-32">
    <h1 className="text-lg font-poppins text-gray-500">{title}</h1>
    <p className="text-3xl font-semibold mt-10 font-poppins">{value}</p>
  </div>
);

export default Dashboard;
