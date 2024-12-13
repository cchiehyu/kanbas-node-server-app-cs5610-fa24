import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.NETLIFY_URL;
const COURSES_API = `https://kanbas-web-cs5610fa24-final-chiehyu.netlify.app/api/courses`;

export const fetchAllCourses = async () => {
 const { data } = await axiosWithCredentials.get(COURSES_API);
 return data;
};
export const deleteModule = async (moduleId) => {
    const response = await axiosWithCredentials.delete(
      `${MODULES_API}/${moduleId}` );
 return response.data;
};
