import Layout from "@/components/Layout";
import { ICategories } from "@/interfaces/Icategories";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategoryies] = useState<ICategories[]>([])
  
  useEffect(()=>{
    axios.get("/api/categories").then(res =>{
      res.data
    })
  },[])

  const saveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map((category)=>{
            <div></div>
          }}
        </tbody>
      </table>
    </Layout>
  );
}
