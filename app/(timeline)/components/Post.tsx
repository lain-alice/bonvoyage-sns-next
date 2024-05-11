"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, X } from "lucide-react";
import { IPost } from "./Timeline";
import EditPostForm from "./EditPostForm";
// import now from "./time";

export default function Post({ username, photo, post, userId, id }: IPost) {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = async () => {
    const ok = confirm("정말 포스팅을 삭제하시겠습니까?");

    if (!ok || user?.uid !== userId) return; // 로그인, 작성자 id 다르면 바로 종료
    try {
      await deleteDoc(doc(db, "posts", id));
      if (photo) {
        // 트윗에 사진이 있다면
        const photoRef = ref(storage, `posts/${user.uid}/${id}`); // 경로로 사진 파일 참조
        console.log(photoRef);
        await deleteObject(photoRef); // 참조된 사진 삭제
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  const onEdit = () => setIsEditing((prev) => !prev);

  return (
    <article className="flex gap-2 w-full min-h-28 bg-white rounded mb-3 p-3">
      <div className="max-w-24 flex flex-col">
        <p className="w-16 md:w-24 bg-gray-200">프사</p>
      </div>
      <div className="w-5/6">
        <div className="flex justify-between">
          <div className="flex justify-center align-middle">
            <h3 className="text-lg font-semibold">{username}</h3>
            {/* <span className="text-sm text-gray-500">작성시간</span> */}
          </div>
          {user?.uid === userId ? (
            <div>
              <Button variant="ghost" size="smicon" onClick={onDelete}>
                <Trash className="w-5 h-5 text-red-600" />
              </Button>
              <Button variant="ghost" size="smicon" onClick={onEdit}>
                {isEditing ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Pencil className="w-5 h-5" />
                )}
              </Button>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-full">
          {isEditing ? (
            <EditPostForm
              post={post}
              photo={photo}
              id={id}
              setIsEditing={setIsEditing}
            />
          ) : (
            <p className="text-wrap overflow-wrap-break-word">{post}</p>
            // 왜 글자가 칸 빠져나가지??
          )}
          {photo ? (
            <Image
              src={photo}
              alt="post image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-lg"
              priority
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
