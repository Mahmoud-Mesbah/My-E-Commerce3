import React from "react";

export default function Notfound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative z-10 text-center text-blue-800 px-6 py-10 rounded-xl">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page not found.</p>

      </div>
    </div>
  );
}