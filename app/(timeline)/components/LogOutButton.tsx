"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@/components/ui/button";

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
    <Button className="w-20" onClick={logOut}>
      로그아웃
    </Button>
  );
}
