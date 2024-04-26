"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [warningText, setWarningText] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    interface AuthError extends Error {
      code: string;
    }

    function isAuthError(error: unknown): error is AuthError {
      return (error as AuthError).code !== undefined;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }

      console.log("user", userCredential.user);
      router.push("/");
    } catch (err: unknown) {
      if (isAuthError(err)) {
        switch (err.code) {
          case "auth/user-not-found" || "auth/wrong-password":
            setWarningText("이메일 혹은 비밀번호가 일치하지 않습니다.");
            return;
          case "auth/email-already-in-use":
            setWarningText("이미 사용중인 이메일입니다.");
            return;
          case "auth/weak-password":
            setWarningText("비밀번호는 8글자 이상이어야 합니다.");
            return;
          case "auth/network-request-failed":
            setWarningText("네트워크 연결에 실패했습니다.");
            return;
          case "auth/invalid-email":
            setWarningText("이메일 형식이 잘못되었습니다.");
            return;
          case "auth/internal-error":
            setWarningText("잘못된 요청입니다.");
            return;
          default:
            setWarningText("로그인에 실패했습니다.");
            return;
        }
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="font-bold text-2xl text-sky-800 mb-[30px]">회원가입</h2>
      <form>
        <div>
          <label>이메일 </label>
          <Input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></Input>
        </div>
        <div>
          <label>닉네임 </label>
          <Input
            type="text"
            value={username}
            name="username"
            onChange={onChange}
            required
          ></Input>
        </div>
        <div>
          <label>비밀번호 </label>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></Input>
        </div>
        <div className="text-red-600 my-2">{warningText}</div>
        <Button className="w-20" onClick={signUp}>
          회원가입
        </Button>
      </form>
    </main>
  );
};

export default SignUp;
