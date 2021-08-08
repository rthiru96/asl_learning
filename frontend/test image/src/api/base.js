import Axios from "axios";
import { handleError, handleResponse } from "./utils";

const instance = Axios.create({
  baseURL: "http://0.0.0.0:8080/"
});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.headers.delete["Content-Type"] = "application/json";

//Set response interceptor
instance.interceptors.response.use(handleResponse, handleError);

export default instance;
