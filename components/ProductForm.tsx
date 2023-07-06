import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Layout from "./Layout";
import { IProducts } from "@/interfaces/IProducts";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}: IProducts) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const router = useRouter();

  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //udpate

      await axios.put("api/products", { ...data, _id });
    } else {
      //create

      await axios.post("/api/products", data);
    }

    router.push("/products");
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price in USD</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        type="submit"
        className="btn-primary"
      >
        Save
      </button>
    </form>
  );
}
