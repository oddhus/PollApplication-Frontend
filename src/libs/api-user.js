import axios from "axios";

export const meFetcher = async () => {
  const response = await axios.get(
    //"https://pollapplication-dat250-group5.herokuapp.com/users/me"
    "http://localhost:8080/users/me",
    { withCredentials: true }
  );

  console.log(response);

  if (response.status === 200) {
    return {
      id: response.data.id,
      email: response.data.username,
      admin: response.data.isAdmin,
      roles: response.data.roles,
    };
  }

  const error = new Error("Not authorized!");
  error.status = 403;
  throw error;
};
