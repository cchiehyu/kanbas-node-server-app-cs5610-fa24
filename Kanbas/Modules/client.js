import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
export const deleteModule = async (moduleId) => {
 const response = await axiosWithCredentials.delete(
   `${MODULES_API}/${moduleId}`
 );
 return response.data;
};

   