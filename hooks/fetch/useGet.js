import axiosClient from "../../api/axiosClient";
import useLoadingContext from "../useLoadingContext";
import useUserContext from "../useUserContext";

const useGet = () => {
  const { loading, dispatchLoadingState } = useLoadingContext();
  const { user } = useUserContext();

  async function getRequest(...rest) {
    console.log({ usertoken: user.token });
    let response;
    try {
      console.log({ line: 24 });
      const url = rest[0];
      let headers = {
        Authorization: `Bearer ${user.token}`,
      };

      console.log({ headers });

      dispatchLoadingState({ type: "LOADING", payload: true });
      response = await axiosClient.get(`${url}`, { headers });
      dispatchLoadingState({ type: "LOADING", payload: false });
    } catch (error) {
      console.log({ error });
      dispatchLoadingState({ type: "LOADING", payload: false });
      dispatchLoadingState({ type: "ERROR", payload: error });
    }
    return response;
  }

  return { getRequest, loading };
};

export default useGet;
