import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <Link href="/login">
            <button className="w-[80px] h-[40px] border-0 rounded bg-sky-700">
              로그인
            </button>
          </Link>
          <Link href="/signin">
            <button className="w-[80px] h-[40px] border-0 rounded bg-white text-sky-700">
              회원가입
            </button>
          </Link>
        </div>
      </div>

      <div>
        <p>Created by lain-alice. 2024</p>
      </div>
    </main>
  );
}
