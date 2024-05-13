import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogOutButton from "./LogOutButton";
import { ArrowLeft, Home, UserRound } from "lucide-react";

export default function Nav() {
  return (
    <nav className="flex fixed bottom-0 md:top-0 w-full md:w-[12%] h-12 md:h-full md:flex-col justify-start items-center border-solid border-t-2 md:border-r-2 border-gray-200 bg-white px-1 md:pt-16 md:gap-5">
      <Link href="/main">
        <h1 className="hidden md:block lg:text-lg font-bold text-teal-500">
          Bon Voyage!
        </h1>
      </Link>

      <ul className="flex w-full flex-row md:flex-col justify-around md:justify-start items-center md:gap-5">
        <li>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/main">
            <Button variant="ghost" size="icon">
              <Home />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <UserRound />
            </Button>
          </Link>
        </li>
        <li>
          <LogOutButton />
        </li>
      </ul>
    </nav>
  );
}
