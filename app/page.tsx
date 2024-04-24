"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseClient";
import { Button } from "@/components/ui/button";

export default function Home() {
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
    await signOut(auth);
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-[#29323c] to-[#485563] text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        {/* <p>여행 후기 SNS</p>
        <p>Bon Voyage!</p> */}
      </div>

      <div className="flex flex-col place-items-center h-auto w-full">
        <h1 className="font-extrabold text-5xl text-sky-300 mb-[60px]">
          Bon Voyage!
        </h1>
        <p className="font-light text-lg text-center whitespace-pre-wrap mb-[30px]">
          스쳐 지나는 여행의 순간을 모아
          <br />
          설렘을 되새기고 즐거움을 함께 나눠요
        </p>
        <div className="flex flex-row items-between justify-between w-[180px]">
          {currentUser ? (
            <Button className="mt-5" onClick={logOut}>
              로그아웃
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button className="w-20 bg-sky-700">로그인</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-20 bg-white text-sky-700">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div>
        <p>Created by lain-alice. 2024</p>
      </div>
    </main>
  );
}
