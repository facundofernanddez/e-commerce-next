import { Nav } from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children }: any) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-gray-100">
        <div className="w-full text-center">
          <button
            onClick={() => signIn("google")}
            className="rounded-xl bg-white p-2 px-4"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <button onClick={() => setShowNav(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div className="flex">
        <Nav show={showNav} />
        <div className="mb-2 mr-2 mt-2 flex-grow rounded-lg bg-white p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
