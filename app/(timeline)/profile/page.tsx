"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, storage, db } from "@/app/firebase";
import { IPost } from "../components/Timeline";
import Post from "../components/Post";

export default function Profile() {
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || "");
  const [profilePic, setProfilePic] = useState(user?.photoURL);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [nameEditing, setNameEditing] = useState(false);

  const onProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profilepics/${user?.uid}`);

      const result = await uploadBytes(locationRef, file);
      const profilePicUrl = await getDownloadURL(result.ref);

      setProfilePic(profilePicUrl);
      await updateProfile(user, { photoURL: profilePicUrl });
    }
  };

  const ToggleNameEdit = () => setNameEditing(!nameEditing);

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const editName = async () => {
    if (!user) return;
    await updateProfile(user, { displayName: name });
    ToggleNameEdit();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      const postQuery = query(
        collection(db, "posts"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      const snapshot = await getDocs(postQuery);
      const posts = snapshot.docs.map((doc) => {
        const { post, createdAt, userId, username, photo } = doc.data();
        return {
          post,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      });
      setPosts(posts);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setProfilePic(user.photoURL);
        fetchPosts(); // Call fetchPosts when user is authenticated
      } else {
        setName("");
        setProfilePic(null);
        setPosts([]); // Clear posts when user is not authenticated
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24 overflow-y-scroll">
      <main className="flex w-full md:w-3/4 2xl:w-1/3 min-h-screen flex-col items-center justify-center">
        <label htmlFor="profilePic">
          {profilePic ? (
            <Image
              src={profilePic}
              alt="profile picture"
              width="0"
              height="0"
              sizes="100vw"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          )}
        </label>
        <input
          onChange={onProfilePicChange}
          id="profilePic"
          type="file"
          accept="image/*"
          className="hidden"
        />
        {/* label은 input 의미 알려주는 용도, onChange는 input에 줘야 함 */}
        <span>
          {nameEditing ? (
            <div>
              <input
                value={name}
                placeholder="Edit Name"
                type="text"
                onChange={handleNameChange}
              />
              <button onClick={editName}>Edit</button>
            </div>
          ) : (
            user?.displayName ?? ""
          )}
        </span>
        <button onClick={ToggleNameEdit}>
          {nameEditing ? "Cancel" : "Edit"}
        </button>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}
