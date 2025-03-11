"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // 🔹 New state to track auth status
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");

  // ✅ Only navigate if user is found
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("user", JSON.stringify(userData));
        }
        router.replace("/dashboard");
      }
      setAuthLoading(false);
    });
  
    return () => unsubscribe();
  }, [router]);

  const [role, setRole] = useState("tenant"); // Default role
  console.log(role)

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // ✅ Store user role in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name,
          role, // Store selected role
          createdAt: new Date(),
        });
      }

      const user = userCredential.user;
      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      router.replace("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Password reset link sent! Check your email.");
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send reset email.");
      }
    }
  };

  // ✅ Prevent rendering while checking auth state
  if (authLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[350px]">
        <CardHeader className="flex items-center flex-col">
          <CardTitle>Welcome to Rent.io</CardTitle>
          <CardDescription>
            {isLogin ? "Login To Your Account" : "Create an Account"}
          </CardDescription>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {resetSuccess && (
            <p className="text-green-500 text-sm">{resetSuccess}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth}>
            <div className="grid w-full items-center gap-4">
              {!isLogin && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              {!isLogin && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    className="border rounded p-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="tenant">Tenant</option>
                    <option value="landlord">Landlord</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <Button
              className="w-full p-2 rounded mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          {isLogin && (
            <p
              className="text-sm cursor-pointer text-blue-500 text-center mt-2"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center mt-2">
          <p
            className="text-sm cursor-pointer text-gray-600"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
