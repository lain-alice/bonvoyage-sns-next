import Image from "next/image";
import HomeButton from "./components/HomeButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24 bg-gradient-to-r from-[#29323c] to-[#485563] text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        {/* <p>여행 후기 SNS</p>
        <p>Bon Voyage!</p> */}
      </div>

      <div className="flex flex-col place-items-center h-auto w-full">
        <h1 className="font-extrabold text-3xl md:text-5xl text-sky-300 mb-[60px]">
          Bon Voyage!
        </h1>
        <p className="font-light text-lg text-center whitespace-pre-wrap mb-[30px]">
          스쳐 지나는 여행의 순간을 모아
          <br />
          설렘을 되새기고 즐거움을 함께 나눠요
        </p>
        <HomeButton />
      </div>

      <div>
        <p>Created by lain-alice. 2024</p>
      </div>
    </main>
  );
}
