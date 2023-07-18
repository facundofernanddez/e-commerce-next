import Layout from "@/components/Layout";
import { ICategories } from "@/interfaces/ICategories";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const saveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    fetchCategories();
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
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              );
            })}
        </select>
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
            <td>Parent Category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
