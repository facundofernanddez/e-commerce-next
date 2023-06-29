import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link
        className="rounded-md bg-blue-900 px-2 py-1 text-white"
        href={"/products/new"}
      >
        Add new product
      </Link>
    </Layout>
  );
}
