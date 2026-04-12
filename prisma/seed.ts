import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const gifts = [
  {
    name: "Premium Chocolate Box",
    category: "Luxury",
    price: 49.99,
    description: "Indulge in our artisan-crafted chocolate collection. Each box features a hand-picked selection of dark, milk, and white chocolate truffles made with the finest Belgian cocoa and organic ingredients.",
    images: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    name: "Elegant Flower Bouquet",
    category: "Floral",
    price: 59.99,
    description: "A stunning arrangement of farm-fresh roses, lilies, and seasonal greens. Professionally arranged and delivered in a decorative vase, perfect for anniversaries or special celebrations.",
    images: [
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589123013747-6863d1319b20?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    name: "Luxury Spa Gift Set",
    category: "Wellness",
    price: 89.99,
    description: "Transform your home into a sanctuary with our ultimate spa set. Includes lavender essential oil, sea salt scrub, organic shea butter cream, and a plush bamboo bathrobe.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544171255-235816bb3aff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531203463057-aee0632d03cc?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    name: "Personalized Gift Box",
    category: "Custom",
    price: 39.99,
    description: "Create a unique experience with our customizable gift box. Select from a variety of items and add a personalized message to be handwritten on our premium card stock.",
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    name: "Gourmet Coffee Set",
    category: "Food",
    price: 45.99,
    description: "A coffee lover's dream. Single-origin beans from Ethiopia and Colombia, a ceramic pour-over dripper, and a thermal insulated mug.",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2070&auto=format&fit=crop",
    ],
  },
];

async function main() {
  console.log("Start seeding...");

  // 1. Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Database cleared.");

  // 2. Create Categories and Products
  for (const gift of gifts) {
    const category = await prisma.category.upsert({
      where: { name: gift.category },
      update: {},
      create: { name: gift.category },
    });

    const product = await prisma.product.create({
      data: {
        title: gift.name,
        description: gift.description,
        price: gift.price,
        categoryId: category.id,
        images: {
          create: gift.images.map((url) => ({ url })),
        },
      },
    });

    console.log(`Created product: ${product.title}`);
  }

  // 3. Create some mock orders
  const products = await prisma.product.findMany();
  if (products.length > 0) {
    await prisma.order.create({
      data: {
        customerName: "Elias Belay",
        customerPhone: "+251 911 123456",
        customMessage: "Happy Birthday to my lovely wife!",
        status: "PENDING",
        productId: products[0].id,
      },
    });
    
    await prisma.order.create({
      data: {
        customerName: "Sara Johnson",
        customerPhone: "+251 922 654321",
        customMessage: "Thank you for the wonderful service!",
        status: "COMPLETED",
        productId: products[1].id,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
