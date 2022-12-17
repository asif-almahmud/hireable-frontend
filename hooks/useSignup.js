import Router, { useRouter } from "next/router";
import usePost from "./fetch/usePost";
import useLoadingContext from "./useLoadingContext";
import useUserContext from "./useUserContext";

const useSignup = () => {
  const { dispatch } = useUserContext();
  const { postRequest } = usePost();
  const { dispatchLoadingState } = useLoadingContext();
  const router = useRouter();

  const signup = async ({ email, password }) => {
    const payload = { email, password };

    try {
      const response = await postRequest("/user/signup", payload);

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

  return { signup };
};

export default useSignup;
