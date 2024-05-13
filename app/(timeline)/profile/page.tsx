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
import { CircleUserRound } from "lucide-react";

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
    <main className="flex w-full md:w-3/4 2xl:w-1/3 min-h-screen flex-col items-center justify-start">
      <label htmlFor="profilePic">
        {profilePic ? (
          <Image
            src={profilePic}
            alt="profile picture"
            width="0"
            height="0"
            sizes="100vw"
            className="w-24 h-24 rounded-full cursor-pointer"
          />
        ) : (
          <CircleUserRound
            strokeWidth={1}
            className="w-24 h-24 text-gray-400 cursor-pointer"
          />
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
          user?.displayName ?? "이름 없는 여행자"
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
  );
}
