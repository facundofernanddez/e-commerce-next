import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const saveCategory = async () => {
    await axios.post("/api/categories", { name });
    setName("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form
        onSubmit={saveCategory}
        className="flex gap-1"
      >
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
