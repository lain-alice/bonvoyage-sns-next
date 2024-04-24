"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LogIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
      console.log(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    interface AuthError extends Error {
      code: string;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user with signIn", userCredential.user);
      router.push("/");
    } catch (err: unknown) {
      const authErr = err as AuthError;
      switch (authErr.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일입니다.");
          break;
        case "auth/weak-password":
          alert("비밀번호는 6글자 이상이어야 합니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패했습니다.");
          break;
        case "auth/invalid-email":
          alert("이메일 형식이 잘못되었습니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("로그인에 실패했습니다.");
          break;
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="font-bold text-2xl text-sky-800 mb-[30px]">로그인</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></Input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></Input>
        </div>
        <Button onClick={signIn}>로그인</Button>
      </form>
    </main>
  );
};

export default LogIn;
