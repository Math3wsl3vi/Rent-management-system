"use client";

import { addTenant, fetchTenants } from "@/lib/propertyFunctions";
import { useEffect, useState } from "react";

const PropertyPage = ({ params }) => {
  const { propertyId } = params;
  const [tenants, setTenants] = useState([]);
  const [newTenant, setNewTenant] = useState({ tenantId: "", unitNumber: "", rentAmount: 0 });

  useEffect(() => {
    const loadTenants = async () => {
      const data = await fetchTenants(propertyId);
      setTenants(data);
    };
    loadTenants();
  }, []);

  const handleAddTenant = async () => {
    await addTenant(propertyId, newTenant.tenantId, newTenant.unitNumber, newTenant.rentAmount);
    setNewTenant({ tenantId: "", unitNumber: "", rentAmount: 0 });
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">Manage Property Tenants</h1>

      {/* Add Tenant */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Add a Tenant</h2>
        <input type="text" placeholder="Tenant ID" value={newTenant.tenantId}
          onChange={(e) => setNewTenant({ ...newTenant, tenantId: e.target.value })}
          className="border p-2 w-full"
        />
        <input type="text" placeholder="Unit Number" value={newTenant.unitNumber}
          onChange={(e) => setNewTenant({ ...newTenant, unitNumber: e.target.value })}
          className="border p-2 w-full mt-2"
        />
        <input type="number" placeholder="Rent Amount" value={newTenant.rentAmount}
          onChange={(e) => setNewTenant({ ...newTenant, rentAmount: parseInt(e.target.value) })}
          className="border p-2 w-full mt-2"
        />
        <button onClick={handleAddTenant} className="bg-blue-500 text-white px-4 py-2 mt-3">Add Tenant</button>
      </div>

      {/* Tenants List */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Current Tenants</h2>
        {tenants.map(tenant => <p key={tenant.id}>{tenant.unitNumber} - {tenant.tenantId}</p>)}
      </div>
    </div>
  );
};

export default PropertyPage;
