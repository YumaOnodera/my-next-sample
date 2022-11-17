import { useEffect, useState } from "react";

import AuthValidationErrors from "components/AuthValidationErrors";
import AppLayout from "components/Layouts/AppLayout";
import { useAuth } from "hooks/useAuth";
import { useUsers } from "hooks/useUsers";

import type { NextPage } from "next";
import type { Errors } from "types/errors";

const Settings: NextPage = () => {
  const { user } = useAuth({ middleware: "auth" });
  const { update } = useUsers();

  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Errors>([]);

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await update({ name, setErrors });

    toggleEditable();
  };

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  return (
    <AppLayout>
      {/* Validation Errors */}
      <AuthValidationErrors errors={errors} />

      <div>
        {isEditable ? (
          <form onSubmit={submitForm}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">保存</button>
          </form>
        ) : (
          <>
            <span>{name}</span>
            <button onClick={toggleEditable}>編集</button>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Settings;
