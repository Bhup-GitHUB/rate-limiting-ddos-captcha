import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col align-center justify-center h-screen gap-4 max-w-md mx-auto">
        <a href="/login">go to login page</a>
      </div>
    </>
  );
}
