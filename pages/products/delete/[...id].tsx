import Layout from "@/components/Layout";
import { IProducts } from "@/interfaces/IProducts";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState<IProducts>();

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);

    goBack();
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete product &quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex justify-center gap-2">
        <button
          className="btn-red"
          onClick={deleteProduct}
        >
          YES
        </button>
        <button
          className="btn-default"
          onClick={goBack}
        >
          NO
        </button>
      </div>
    </Layout>
  );
}
