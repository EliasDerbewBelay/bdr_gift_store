"use server";

import prisma from "@/lib/prisma";

/**
 * Fetch all products for the public gifts page
 */
export async function getPublicProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch public products:", error);
    return [];
  }
}

/**
 * Fetch all categories for filtering
 */
export async function getPublicCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch public categories:", error);
    return [];
  }
}
