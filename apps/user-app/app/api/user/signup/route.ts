import { prisma } from "@repo/db/prisma";
import { signUpSchema } from "@repo/types/zodtypes";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedData = signUpSchema.safeParse(body);

    if (!parsedData.success) {
      console.error("Zod error:", parsedData.error);
      return NextResponse.json({ message: "Inputs invalid" }, { status: 400 });
    }

    const { email, name, password } = parsedData.data;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created. Verification email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
