import { useFormat } from "hooks/useFormat";
import { useUser } from "hooks/useUser";
import axios from "libs/axios";

import type { UpdateUser } from "types/users";

export const useUsers = () => {
  const { objectValuesToString } = useFormat();
  const { mutate } = useUser();

  const update: UpdateUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put("/api/users", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(objectValuesToString(error.response.data.message));
      });
  };

  return {
    update,
  };
};
