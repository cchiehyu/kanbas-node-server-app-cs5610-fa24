import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.NETLIFY_URL;
const MODULES_API = `https://kanbas-web-cs5610fa24-final-chiehyu.netlify.app/api/modules`;
export const deleteModule = async (moduleId) => {
 const response = await axiosWithCredentials.delete(
   `${MODULES_API}/${moduleId}`
 );
 return response.data;
};

   