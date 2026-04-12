"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Fetch dashboard overview statistics
 */
export async function getDashboardStats() {
  try {
    const [totalOrders, totalProducts, totalUsers] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
    ]);

    return [
      { label: "Total Orders", value: totalOrders.toString(), trend: { value: "12", isUp: true } },
      { label: "Total Products", value: totalProducts.toString(), trend: { value: "5", isUp: true } },
      { label: "Total Users", value: totalUsers.toString(), trend: { value: "3", isUp: true } },
    ];
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return [];
  }
}

/**
 * Fetch all products with categories and images
 */
export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Create or update a product
 */
export async function upsertProduct(data: any) {
  try {
    const { id, title, description, price, categoryName, images } = data;

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const productData = {
      title,
      description,
      price: price ? parseFloat(price) : null,
      categoryId: category.id,
    };

    let product;

    if (id) {
      product = await prisma.product.update({
        where: { id },
        data: {
          ...productData,
          images: {
            deleteMany: {},
            create: images.map((url: string) => ({ url })),
          },
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          ...productData,
          images: {
            create: images.map((url: string) => ({ url })),
          },
        },
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    return { success: true, product };
  } catch (error) {
    console.error("Failed to upsert product:", error);
    return { success: false, error: "Failed to save product" };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

/**
 * Fetch all orders with product and images
 */
export async function getOrders() {
  try {
    return await prisma.order.findMany({
      include: {
        product: {
          include: { images: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

/**
 * Fetch recent orders
 */
export async function getRecentOrders(limit = 5) {
  try {
    return await prisma.order.findMany({
      take: limit,
      include: {
        product: {
          include: { images: { take: 1 } }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch recent orders:", error);
    return [];
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, status: any) {
  try {
    const updatedStatus = status.toUpperCase();
    await prisma.order.update({
      where: { id },
      data: { status: updatedStatus },
    });
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
