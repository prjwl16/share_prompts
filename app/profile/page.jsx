"use client";

import Profile from "@app/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if (session?.user?.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = window.confirm(
      "Are you sure you want to delete this prompt"
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        fetchPosts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalise profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
