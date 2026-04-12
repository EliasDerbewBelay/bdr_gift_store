"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData: any) {
  const { name, email, password, phone } = formData;

  if (!name || !email || !password) {
    return { error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName: name,
        email,
        password: hashedPassword,
        phoneNumber: phone,
        role: "USER", // Default role
      },
    });

    return { success: true, user: { id: user.id, name: user.fullName, email: user.email } };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: "An error occurred during registration" };
  }
}
