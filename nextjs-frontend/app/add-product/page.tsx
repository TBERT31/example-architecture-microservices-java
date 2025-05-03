"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/types/product";
import { createProduct } from "@/services/product/product.service";

const schema = z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters long")
      .nonempty("Name is required"),
    description: z.string()
      .min(10, "Description must be at least 10 characters long")
      .nonempty("Description is required"),
    price: z.coerce.number()
      .min(0.01, "Price must be greater than 0"),
});
  

type FormData = z.infer<typeof schema>;

export default function AddProductPage() {
  const [productCreated, setProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Product) => {
    try {
      await createProduct(data);
      setProductCreated(true);
      reset();
    } catch (e) {
      console.error("Failed to create product", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {productCreated && <h4 className="text-green-500">Product Created Successfully</h4>}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">Name</label>
          <input {...register("name")} id="name" className="border rounded w-full py-2 px-3 text-gray-700" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">Description</label>
          <textarea {...register("description")} id="description" className="border rounded w-full py-2 px-3 text-gray-700" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="price">Price</label>
          <input type="number" step="0.01" {...register("price")} id="price" className="border rounded w-full py-2 px-3 text-gray-700" />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
