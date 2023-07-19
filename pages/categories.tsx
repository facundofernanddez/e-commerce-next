import Layout from "@/components/Layout";
import { ICategories } from "@/interfaces/ICategories";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState<ICategories>();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  let _id: string;

  const saveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, parent, _id };

    if (editedCategory) {
      data._id = editedCategory._id;

      await axios.put("/api/categories", data);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    fetchCategories();
  };

  const editCategory = (category: ICategories) => {
    setEditedCategory(category);
    setName(category.name);
    setParent(category.parent?._id || "");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
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
          value={parent}
          onChange={(ev) => setParent(ev.target.value)}
        >
          <option value="0">No parent category</option>
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
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <div className="flex"></div>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button className="btn-primary">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
