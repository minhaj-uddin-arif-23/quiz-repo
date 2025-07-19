// src/app/dashboard/layout.js
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  console.log({ session });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}