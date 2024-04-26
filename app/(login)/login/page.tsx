"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseClient";
import Form from "../components/Form";

const LogIn = () => {
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
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      console.log(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    interface AuthError extends Error {
      code: string;
    }

    function isAuthError(error: unknown): error is AuthError {
      return (error as AuthError).code !== undefined;
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="font-bold text-2xl text-sky-800 mb-[30px]">로그인</h2>
      <Form
        fields={fields}
        onSubmit={signIn}
        warningText={warningText}
        buttonText={"로그인"}
      />
    </main>
  );
};

export default LogIn;
