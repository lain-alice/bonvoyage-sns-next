import PostForm from "../components/PostForm";
import Timeline from "../components/Timeline";

export default function Main() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24 overflow-y-scroll">
      <main className="flex w-full md:w-3/4 2xl:w-1/3 min-h-screen flex-col items-center justify-center">
        <h2 className="font-bold text-xl lg:text-2xl text-sky-800 mb-6">
          어서 오세요!
        </h2>
        <PostForm />
        <Timeline />
      </main>
    </div>
  );
}
