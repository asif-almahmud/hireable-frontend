import { useRouter } from "next/router";
import usePost from "./fetch/usePost";
import useLoadingContext from "./useLoadingContext";
import useUserContext from "./useUserContext";

const useLogin = () => {
  const { dispatch } = useUserContext();
  const { postRequest } = usePost();
  const router = useRouter();
  const { dispatchLoadingState } = useLoadingContext();

  const login = async ({ email, password }) => {
    const payload = { email, password };
    try {
      const response = await postRequest("/user/login", payload);
      console.log({ response });
      if (response) {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("hireable_user", JSON.stringify(response.data));
        localStorage.setItem("browsed", JSON.stringify(true));

        router.push("/");
      }
    } catch (err) {
      dispatchLoadingState({ type: "ERROR", payload: err });
    }
  };

  return { login };
};

export default useLogin;
