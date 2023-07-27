import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { IProducts } from "@/interfaces/IProducts";
import Spinner from "./Spinner";
import { ICategories } from "@/interfaces/ICategories";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
  category: assignedCategory,
  properties: assignedProperties,
}: IProducts) {
  //TODO: Terminar lo de las imagenes de productos.

  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  // const [images, setImages] = useState<ReactNode>(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }

    router.push("/products");
  };

  const uploadImages = async (e: any) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
    }
    setIsUploading(false);
  };

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProp = { ...prev };
      newProductProp[propName] = value;
      return newProductProp;
    });
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo?.properties);

    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat?.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category</label>
      <select
        value={category as string}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => {
            return (
              <option
                key={c._id}
                value={c._id}
              >
                {c.name}
              </option>
            );
          })}
      </select>
      {categories.length > 0 &&
        propertiesToFill.map((p, index) => (
          <div
            key={index}
            className="flex gap-1"
          >
            <div>{p.name}</div>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => setProductProp(p.name, ev.target.value)}
            >
              {p.values.map((v, index) => (
                <option
                  key={index}
                  value={v}
                >
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {/* {!!images?.length &&
          images.map((_image) => {
            <div
              key={link}
              className="inline-block h-24"
            >
              <img
                src={link}
                alt=""
                className="rounded-lg "
              />
            </div>;
          })} */}
        {isUploading && (
          <div className="flex h-24 items-center">
            <Spinner />
          </div>
        )}
        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-gray-200 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            type="file"
            onChange={uploadImages}
            className="hidden"
          />
        </label>
      </div>
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
