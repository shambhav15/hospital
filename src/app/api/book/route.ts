import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: NextRequest) {
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
        hospital: { connect: { H_No: body.hospitalH_No } },
        hospitalH_No: body.hospitalH_No,
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
