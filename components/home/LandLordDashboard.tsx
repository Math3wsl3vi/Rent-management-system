"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchTenants } from "@/lib/propertyFunctions";

interface PropertyPageProps {
  params: { propertyid: string };
}

interface Tenant {
  id: string;
  unitNumber: string;
  tenantId: string;
}

const PropertyPage = ({ params }: PropertyPageProps) => {
  const { propertyid } = params;
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    const loadTenants = async () => {
      const tenantList = await fetchTenants(propertyid);
      setTenants(tenantList);
    };
    loadTenants();
  }, [propertyid]); // ✅ Fixed dependency

  return (
    <div>
      <h1>Property Details</h1>
      <button onClick={() => router.push(`/dashboard/property/${propertyid}/add-tenant`)}>Add Tenant</button>

      <h2>Tenants:</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            {tenant.unitNumber} - {tenant.tenantId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyPage;
