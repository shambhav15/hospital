import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: NextRequest) {
  const { isAuthenticated } = await getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const newBook = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        aadhar: body.aadhar,
        address: body.address,
        description: body.description,
        payment: body.payment,
        date: body.date,
        problem: body.problem,
        facility: body.facility,
        // hospital: body.hospital,
        // hospitalH_No: body.hospitalH_No,
      },
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the booking." },
      { status: 500 }
    );
  }
}
