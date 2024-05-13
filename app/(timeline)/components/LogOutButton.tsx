"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  const router = useRouter();
  const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-700"
      onClick={logOut}
    >
      <LogOut />
    </Button>
  );
}
