import React, { useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import { usePosts } from "hooks/usePosts";

import type { Errors } from "types/errors";
import type { PostModalProps } from "types/postModalProps";

const PostModal: React.FC<PostModalProps> = ({ setPostModalOpen }) => {
  const [errors, setErrors] = useState<Errors>([]);
  const [text, setText] = useState("");

  const { storePost } = usePosts();

  const execStorePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await storePost({ text, setErrors });

    setPostModalOpen(false);
    setText("");
  };

  return (
    <>
      <AuthValidationErrors errors={errors} />

      <form onSubmit={execStorePost}>
        <textarea
          id="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">投稿</button>
      </form>
    </>
  );
};

export default PostModal;
