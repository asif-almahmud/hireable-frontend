import axiosClient from "../../api/axiosClient";
import useLoadingContext from "../useLoadingContext";
import useUserContext from "../useUserContext";

const usePost = () => {
  const { user } = useUserContext();
  const { dispatchLoadingState } = useLoadingContext();

  async function postRequest(...rest) {
    dispatchLoadingState({ type: "RESET" });
    const url = rest[0];
    const payload = rest[1];
    const headers = rest[2]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    let response;

    try {
      dispatchLoadingState({ type: "LOADING", payload: true });
      response = await axiosClient.post(`${url}`, payload, { headers });
      dispatchLoadingState({ type: "LOADING", payload: false });
    } catch (error) {
      console.log({ error });
      dispatchLoadingState({ type: "LOADING", payload: false });
      dispatchLoadingState({ type: "ERROR", payload: error });
    }
    return response;
  }

  return { postRequest };
};

export default usePost;
