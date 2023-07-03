import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProducts {
  title: string;
  description?: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <Layout>
      <Link
        className="rounded-md bg-blue-900 px-2 py-1 text-white"
        href={"/products/new"}
      >
        Add new product
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.title}</td>
                <td>buttons</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
