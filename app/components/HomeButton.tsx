"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@/components/ui/button";

export default function HomeButton() {
  const currentUser = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`${currentUser?.email} 로그인됨`);
      } else {
        console.log("로그아웃됨");
      }
    });
  }, [currentUser?.email]);

  const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-row items-between justify-between w-[180px]">
      {currentUser ? (
        <>
          <Button
            className="w-20 bg-sky-700"
            onClick={() => router.push("/main")}
          >
            메인
          </Button>
          <Button className="w-20" onClick={logOut}>
            로그아웃
          </Button>
        </>
      ) : (
        <>
          <Button
            className="w-20 bg-sky-700"
            onClick={() => router.push("/login")}
          >
            로그인
          </Button>
          <Button
            className="w-20 bg-white text-sky-700"
            onClick={() => router.push("/signup")}
          >
            회원가입
          </Button>
        </>
      )}
    </div>
  );
}
