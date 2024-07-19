import Counter from "../components/Counter";

export default function Main() {
  return (
    <main className="flex w-full md:w-3/4 2xl:w-1/3 px-4 py-12 md:py-24 min-h-screen flex-col items-center justify-center">
      <h2 className="font-bold text-xl lg:text-2xl text-sky-800 mb-6">
        재활 테스트
      </h2>
      <Counter />
    </main>
  );
}
