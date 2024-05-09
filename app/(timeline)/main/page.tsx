import PostForm from "../components/PostForm";
import Timeline from "../components/Timeline";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-y-scroll">
      <div className="flex w-3/4 min-h-screen flex-col items-center justify-center">
        <h2 className="font-bold text-2xl text-sky-800 mb-6">어서 오세요!</h2>
        <PostForm />
        <Timeline />
      </div>
    </main>
  );
}
