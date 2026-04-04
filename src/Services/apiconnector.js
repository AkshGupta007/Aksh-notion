import axios from "axios";

export const axiosinstance = axios.create({
});

export const apiconnector = (
  method,
  url,
  bodyData = null,
  headers = {},
  params = {},
) => {
  return axiosinstance({
    method: method, // ✅ use the variable
    url: url,
    data: bodyData, // ✅ axios uses "data" for request body
    headers: headers,
    params: params,
  });
};
