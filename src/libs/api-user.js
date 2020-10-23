import axios from "axios";

export const meFetcher = async () => {
  const response = await axios.get(
    "https://pollapplication-dat250-group5.herokuapp.com/users/me"
  );

  console.log(response);
  if (response.ok) {
    return {
      email: response.data.email,
      admin: response.data.admin,
      roles: response.data.roles,
    };
  }

  const error = new Error("Not authorized!");
  error.status = 403;
  throw error;
};
