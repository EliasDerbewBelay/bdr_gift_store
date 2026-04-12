import React from "react";
import ProductManagement from "@/components/admin/ProductManagement";
import { getProducts, getCategories } from "@/lib/actions/admin";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="w-full">
      <ProductManagement 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
