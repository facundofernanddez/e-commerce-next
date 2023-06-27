import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-blue-950">
        <div className="w-full text-center">
          <button className="rounded-xl bg-white p-2 px-4">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center bg-blue-950">
      <div className="w-full text-center">
        <button className="rounded-xl bg-white p-2 px-4">
          Login with Google
        </button>
      </div>
    </div>
  );
}
