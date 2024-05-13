"use client";

import { useState } from "react";
import { auth, storage, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUp, ImagePlus } from "lucide-react";

interface EditFormProps {
  photo?: string;
  post: string;
  id: string;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditPostForm({
  photo,
  post,
  id,
  setIsEditing,
}: EditFormProps) {
  const maxFileSize = 5 * 1024 * 1024;
  const [editPost, setEditPost] = useState(post);
  const [editFile, setEditFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditPost(e.target.value);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      // 파일 하나만 업로드하고 싶음, file이 존재하고 갯수 1개인지
      if (files[0].size > maxFileSize) {
        alert("5MB 이하의 파일만 업로드 가능합니다.");
        return;
      }

      setEditFile(files[0]); // 파일 배열의 첫번째 요소
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || editPost === "" || editPost.length > 180) return;

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        post: editPost,
      });

      if (editFile) {
        if (photo) {
          const originRef = ref(storage, `posts/${user.uid}/${id}`);
          await deleteObject(originRef);
        }

        const locationRef = ref(storage, `posts/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, editFile);
        const url = await getDownloadURL(result.ref);

        // console.log(url);

        await updateDoc(postRef, {
          photo: url,
        });
      }
      setEditPost("");
      setEditFile(null);
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <form
      className="flex flex-col justify-items-center w-full gap-4"
      onSubmit={onSubmit}
    >
      <Textarea
        rows={5}
        maxLength={800}
        onChange={handleChange}
        value={editPost}
        id="post"
        required
      />
      <div className="flex justify-between items-center">
        <label className="cursor-pointer" htmlFor="file">
          {editFile ? <ImagePlus className="text-emerald-400" /> : <ImageUp />}
        </label>
        {/* htmlFor와 id 같다면 label 눌렀을 때 id=file 버튼 클릭됨 */}
        <input
          className="hidden"
          onChange={handleEditFileChange}
          type="file"
          id="file"
          accept="image/*"
          // 이미지 파일, 모든 확장자
        />
        {/* 이 input은 스타일링하기 어려우니 숨기고 위의 label을 꾸민다 */}
        <Button type="submit" value="Post">
          Edit
        </Button>
      </div>
    </form>
  );
}
