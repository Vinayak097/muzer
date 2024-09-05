"use client"
import Image from "next/image";
import Appbar from "./components/Appbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session=useSession()
  
  const name=session.data?.user?.name

  return (
    <div>
      <Appbar>
      </Appbar>
      hello
      <div>
        {name}
        
      </div>
    </div>
  );
}
