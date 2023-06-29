import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-1 overflow-hidden rounded-lg bg-gray-300 text-black">
          <Image
            src={session?.user?.image as string}
            alt="user image"
            width={30}
            height={30}
          />
          <span className="px-2 ">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
