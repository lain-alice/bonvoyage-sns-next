"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PostForm() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2 className="text-xl text-center lg:text-2xl text-sky-800 mb-5">
        {count}
      </h2>
      <Button onClick={handleCount}>count</Button>
    </div>
  );
}
