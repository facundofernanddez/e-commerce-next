import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  return (
    <Layout>
      <form>
        <h1>New Product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
        />
        <label>Description</label>
        <textarea placeholder="description" />
        <label>Price in USD</label>
        <input
          type="number"
          placeholder="price"
        />
        <button
          type="submit"
          className="btn-primary"
        >
          Save
        </button>
      </form>
    </Layout>
  );
}
