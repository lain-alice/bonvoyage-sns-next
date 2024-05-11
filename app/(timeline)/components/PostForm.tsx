"use client";

import { useState } from "react";
import { auth, storage, db } from "../../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUp, ImagePlus } from "lucide-react";

export default function PostForm() {
  const maxFileSize = 5 * 1024 * 1024;
  const [post, setPost] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      // 파일 하나만 업로드하고 싶음, file이 존재하고 갯수 1개인지
      if (files[0].size > maxFileSize) {
        alert("5MB 이하의 파일만 업로드 가능합니다.");
        return;
      }

      setFile(files[0]); // 파일 배열의 첫번째 요소
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || post === "" || post.length > 800) return;

    try {
      const doc = await addDoc(collection(db, "posts"), {
        // Firebase SDK의 addDoc 함수, Firestore 인스턴스와 컬렉션 이름
        // doc 참조를 Promise 형태로 반환
        post,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        // 유저 닉네임, 없으면 Anonymous
        userId: user.uid,
        // 작성자 본인만 트윗 삭제하기 위해 유저 아이디 확인
      });
      if (file) {
        const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        // 이미지를 storage의 locationRef 경로에 업로드
        const url = await getDownloadURL(locationRef);
        console.log(locationRef);
        // 이미지의 url string 반환하는 Promise
        await updateDoc(doc, { photo: url });
        // 업데이트할 document 참조, 업데이트할 데이터
        // 트윗 doc에 이미지 url 저장
      }
      setPost("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  return (
    <form
      className="flex flex-col justify-items-center w-full gap-4 mb-7"
      onSubmit={onSubmit}
    >
      <Label className="text-xl font-medium" htmlFor="post">
        Post
      </Label>

      <Textarea
        rows={5}
        maxLength={800}
        onChange={handleChange}
        value={post}
        id="post"
        placeholder="여행의 추억을 들려주세요."
        required
      />
      <div className="flex justify-between items-center">
        <label className="cursor-pointer" htmlFor="file">
          {file ? <ImagePlus className="text-emerald-400" /> : <ImageUp />}
        </label>
        {/* htmlFor와 id 같다면 label 눌렀을 때 id=file 버튼 클릭됨 */}
        <input
          className="hidden"
          onChange={handleFileChange}
          type="file"
          id="file"
          accept="image/*"
          // 이미지 파일, 모든 확장자
        />
        {/* 이 input은 스타일링하기 어려우니 숨기고 위의 label을 꾸민다 */}
        <Button type="submit" value="Post">
          Post
        </Button>
      </div>
    </form>
  );
}
