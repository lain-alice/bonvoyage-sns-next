import Nav from "./components/Nav";

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="flex min-h-screen items-start justify-center overflow-y-scroll">
        {children}
      </div>
    </>
  );
}
