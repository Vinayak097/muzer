"use client"; // Ensure this is a Client Component

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Appbar() {
  const { data: session, status } = useSession();

  // Render based on the session status
  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <div >
          {session?.user ? (
            <Button
              className="m-2 p-2 bg-blue-500 text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className="m-2 p-2 bg-blue-500 text-white"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </div> 
        </nav>
  );
}

export default Appbar;
