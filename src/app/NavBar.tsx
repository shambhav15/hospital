"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Button, DropdownMenu, Skeleton } from "@radix-ui/themes";
import Search from "./component/Search";

const NavBar = () => {
  const currentPath = usePathname();
  const { user, isLoading } = useKindeBrowserClient();

  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];


  return (
    <nav className="flex space-x-6 justify-around w-full  border-b mb-5 px-5 py-2 items-center">
      <div className="flex gap-6 items-center">
        <Link className="flex  p-2  items-center" href="/">
          {/* <AiFillBug size={25} color="orange" /> */}
          <Image src="/logo.svg" width={100} height={100} alt="hospital" />
        </Link>
      </div>
      <div className="w-full p-2">
        <Search />
      </div>

      <div className="flex gap-10 items-center">
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {user?.picture && (
                <Image
                  src={user?.picture}
                  alt="user profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>{user?.given_name}</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="violet">
                <Link href="/profile">Profile</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item color="violet">
                <LogoutLink>Sign out</LogoutLink>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <>
            {isLoading ? (
              <Skeleton width="4rem" height="2.5rem" />
            ) : (
              <Button color="violet" className="">
                <LoginLink>Sign in</LoginLink>
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
