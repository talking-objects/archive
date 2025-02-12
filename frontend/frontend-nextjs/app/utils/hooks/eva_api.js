import axios from "axios";

const instance = axios.create({ 
    baseURL: "http://127.0.0.1:8000/api/v1/",
    // withCredentials: true
})

export const getVideos = () => instance.get(`videos/`).then((response) => response.data);
  
export const getEvaVideo = (id) => instance.get(`videos/${id}`).then((response) => response.data);