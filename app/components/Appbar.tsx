"use client"; // Ensure this is a Client Component

import { signIn, signOut, useSession } from "next-auth/react";

function Appbar() {
  const { data: session, status } = useSession();

  // Render based on the session status
  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          Muzi
        </div>
        <div>
          {session?.user ? (
            <button
              className="m-2 p-2 bg-blue-500 text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="m-2 p-2 bg-blue-500 text-white"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appbar;
