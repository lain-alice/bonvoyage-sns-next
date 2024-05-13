import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogOutButton from "./LogOutButton";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <Button>Home</Button>
          </Link>
        </li>
        <li>
          <Link href="/main">
            <Button>Main</Button>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
        </li>
        <li>
          <LogOutButton />
        </li>
      </ul>
    </nav>
  );
}
