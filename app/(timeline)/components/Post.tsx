"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { Button } from "@/components/ui/button";
import { IPost } from "./Timeline";

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
        const photoRef = ref(storage, `posts/{${user.uid}}/${id}`); // 경로로 사진 파일 참조
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
    <div>
      <div>
        <h3>{username}</h3>
        {/* {isEditing ? (
          <EditTweetForm
            tweet={tweet}
            photo={photo}
            id={id}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )} */}
        <p>{post}</p>
        {user?.uid === userId ? (
          <div>
            <Button onClick={onDelete}>Delete</Button>
            {/* <Button onClick={onEdit}>{isEditing ? "Cancel" : "Edit"}</Button> */}
          </div>
        ) : null}
      </div>
      <div>
        {photo ? (
          <Image alt="post image" width="300" height="300" src={photo} />
        ) : null}
      </div>
    </div>
  );
}
