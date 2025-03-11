import { db, auth } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

/** Fetch all properties owned by the current landlord */
export const fetchLandlordProperties = async () => {
  if (!auth.currentUser?.uid) return [];

  const propertiesRef = collection(db, "properties");
  const q = query(propertiesRef, where("landlordId", "==", auth.currentUser.uid));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/** Add a new property */
export const addProperty = async (name: string, location: string, numUnits: number) => {
  if (!auth.currentUser?.uid) return;

  await addDoc(collection(db, "properties"), {
    name,
    location,
    numUnits,
    availableUnits: numUnits,
    landlordId: auth.currentUser.uid,
    createdAt: new Date().toISOString(),
  });
};

/** Fetch tenants for a specific property */
export const fetchTenants = async (propertyId: string) => {
  const leasesRef = collection(db, "leases");
  const q = query(leasesRef, where("propertyId", "==", propertyId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/** Add a tenant to a property */
export const addTenant = async (propertyId: string, tenantId: string, unitNumber: string, rentAmount: number) => {
  await addDoc(collection(db, "leases"), {
    tenantId,
    propertyId,
    unitNumber,
    rentAmount,
    startDate: new Date().toISOString(),
    status: "active",
  });
};
