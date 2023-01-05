import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { useComments } from "hooks/useComments";
import { usePosts } from "hooks/usePosts";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Post: NextPage = () => {
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Errors>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState("");

  const { auth } = useAuth();
  const { storeComment, deleteComment } = useComments();
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

  const deletePostConfirm = async () => {
    window.confirm("投稿を削除しますか？") && (await deletePost());
  };

  const execStoreComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const postId = router.query.post?.toString();

    if (!postId) return;

    await storeComment({
      post_id: postId,
      text: comment,
      setErrors,
    });

    setComment("");
  };

  const deleteCommentConfirm = async (id: number) => {
    window.confirm("コメントを削除しますか？") && (await deleteComment(id));
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
            id="post"
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
              <button onClick={deletePostConfirm}>削除</button>
            </>
          )}
          {post && (
            <>
              <div>{post.text}</div>
              <Link href={`/${post.user_id}`}>
                <a>{post.created_by}</a>
              </Link>

              <hr />

              {auth?.id && (
                <form onSubmit={execStoreComment}>
                  <textarea
                    id="comment"
                    value={comment}
                    placeholder="コメントを投稿"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit">投稿</button>
                </form>
              )}

              {post.comments.map((comment) => (
                <>
                  <div>{comment.text}</div>
                  <Link href={`/${comment.user_id}`}>
                    <a>{comment.created_by}</a>
                  </Link>
                  {auth?.id === comment.user_id && (
                    <button onClick={() => deleteCommentConfirm(comment.id)}>
                      削除
                    </button>
                  )}
                  <hr />
                </>
              ))}
            </>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Post;
