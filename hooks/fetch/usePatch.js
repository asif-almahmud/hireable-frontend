import axiosClient from "../../api/axiosClient";
import useLoadingContext from "../useLoadingContext";
import useUserContext from "../useUserContext";

const usePatch = () => {
  const { user } = useUserContext();
  const { loading, dispatchLoadingState } = useLoadingContext();

  async function patchRequest(...rest) {
    dispatchLoadingState({ type: "RESET" });
    const url = rest[0];
    const payload = rest[1];
    const headers = rest[2]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};
    console.log({ headers });

    let response;

    try {
      dispatchLoadingState({ type: "LOADING", payload: true });
      response = await axiosClient.patch(`${url}`, payload, { headers });
      dispatchLoadingState({ type: "LOADING", payload: false });
    } catch (error) {
      console.log({ error });
      dispatchLoadingState({ type: "LOADING", payload: false });
      dispatchLoadingState({ type: "ERROR", payload: error });
    }
    return response;
  }

  return { patchRequest, loading };
};

export default usePatch;
