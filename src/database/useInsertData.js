import baseURL from "../api/baseURL";

const useInsertData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseURL.post(url, params, config);
  return res.data;
};



export { useInsertData };
