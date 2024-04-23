"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
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

  const signUp = async () => {
    if (!email || !password) {
      alert("이메일, 비밀번호를 입력해주세요.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      // switch (err) {
      //   case "auth/invalid-email":
      //     alert("이메일을 바르게 입력해주세요.");
      //     break;
      //   case "auth/weak-password":
      //     alert("비밀번호가 너무 단순합니다.");
      //     break;
      //   case "auth/email-already-in-use":
      //     alert("이미 등록된 이메일입니다.");
      //     break;
      //   default:
      //     console.log("회원가입 실패");
      //     break;
      // }
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
        <Button onClick={signUp}>회원가입</Button>
      </form>
    </main>
  );
};

export default SignUp;
