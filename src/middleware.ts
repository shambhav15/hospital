import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";
export default function middleware(req: any) {
  return withAuth(req);
}
export const config = {
  // matcher: ["/:id/book"],
};
