"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = async () => {
    if (!email || !password) {
      alert("이메일, 비밀번호를 입력해주세요.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2>로그인 페이지</h2>
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
