import Layout from "@/components/Layout";
import { ICategories } from "@/interfaces/ICategories";
import { IProperties } from "@/interfaces/IProperties";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

const Categories = ({ swal }) => {
  const [editedCategory, setEditedCategory] = useState<ICategories>();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [properties, setProperties] = useState<IProperties[]>([]);

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
      setEditedCategory(undefined);
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

  const deleteCategory = (category: ICategories) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete!",
        reverseButtons: true,
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (
    index: number,
    property: IProperties,
    newName: string
  ) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValuesChange = (
    index: number,
    property: IProperties,
    newValue: string
  ) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  };

  const removeProperty = (indexToRemove: number) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select
            value={parent}
            onChange={(ev) => setParent(ev.target.value)}
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default mb-2 text-sm"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((prop, index) => {
              return (
                <div
                  key={prop.name}
                  className="mb-2 flex gap-1"
                >
                  <input
                    className="mb-0"
                    value={prop.name}
                    onChange={(ev) =>
                      handlePropertyNameChange(index, prop, ev.target.value)
                    }
                    type="text"
                    placeholder="property name (example: color)"
                  />
                  <input
                    className="mb-0"
                    onChange={(ev) => {
                      handlePropertyValuesChange(index, prop, ev.target.value);
                    }}
                    value={prop.values}
                    type="text"
                    placeholder="property value (example: white)"
                  />
                  <button
                    onClick={() => removeProperty(index)}
                    className="btn-default"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
        </div>
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
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
