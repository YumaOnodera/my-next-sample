import Link from "next/link";
import React, { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { usePosts } from "hooks/usePosts";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Post: NextPage = () => {
  const [errors, setErrors] = useState<Errors>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState("");

  const { auth } = useAuth();
  const { post, updatePost, deletePost } = usePosts();
  const { user } = useUsers();

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  const execUpdatePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await updatePost({ text, setErrors });

    toggleEditable();
  };

  const deleteConfirm = async () => {
    window.confirm("投稿を削除しますか？") && (await deletePost());
  };

  useEffect(() => {
    post && setText(post.text);
  }, [post]);

  return (
    <AppLayout title="記事" description="記事画面">
      <hr />
      <AuthValidationErrors errors={errors} />

      {isEditable ? (
        <form onSubmit={execUpdatePost}>
          <textarea
            id="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">保存</button>
        </form>
      ) : (
        <>
          {auth?.id === user?.id && (
            <>
              <button onClick={toggleEditable}>編集</button>
              <button onClick={deleteConfirm}>削除</button>
            </>
          )}
          {post && (
            <>
              <div>{post.text}</div>
              <Link href={`/${post.user_id}`}>
                <a>{post.created_by}</a>
              </Link>
            </>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Post;
