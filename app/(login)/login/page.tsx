"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import AuthForm from "../components/AuthForm";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warningText, setWarningText] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWarningText(""); // 버튼 2번 클릭하면 에러메시지 초기화

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user with signIn", userCredential.user);
      router.push("/main");
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          // case "auth/user-not-found":
          case "auth/wrong-password":
            setWarningText("이메일 혹은 비밀번호가 일치하지 않습니다.");
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

  const fields = [
    {
      label: "이메일",
      type: "email",
      value: email,
      name: "email",
      onChange: handleChange,
      required: true,
    },
    {
      label: "비밀번호",
      type: "password",
      value: password,
      name: "password",
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center md:p-24">
      <h2 className="font-bold text-2xl text-sky-800 mb-[30px]">로그인</h2>
      <AuthForm
        fields={fields}
        onSubmit={signIn}
        warningText={warningText}
        buttonText={"로그인"}
      />
    </div>
  );
}
