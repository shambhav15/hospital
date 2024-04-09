// // Import necessary modules
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../prisma/client";

// export async function GET(req: NextRequest) {
//   // Get the 'name' query parameter from the request
//   const { name } = req.body;

//   try {
//     let hospitals;

//     // Check if 'name' parameter is present and modify Prisma query accordingly
//     if (name) {
//       hospitals = await prisma.hospital.findMany({
//         where: {
//           Hospital_Name: {
//             contains: name.toString(), // Partial match for hospital names
//             mode: "insensitive", // Case insensitive search
//           },
//         },
//         orderBy: { H_No: "asc" },
//       });
//     } else {
//       // If no 'name' parameter provided, fetch all hospitals
//       hospitals = await prisma.hospital.findMany();
//     }

//     return NextResponse.json(hospitals);
//   } catch (error) {
//     console.error("Error fetching hospitals:", error);
//     return NextResponse.error();
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const hospitals = await prisma.hospital.findMany({
    orderBy: { H_No: "asc" },
  });
  return NextResponse.json(hospitals);
}
