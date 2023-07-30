import { Nav } from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }: any) {
  const { data: session } = useSession();

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
    <div className="flex min-h-screen bg-gray-100">
      <Nav />
      <div className="mb-2 mr-2 mt-2 flex-grow rounded-lg bg-white p-4">
        {children}
      </div>
    </div>
  );
}
