import axios from "axios";

const instance = axios.create({ 
    baseURL: process.env.NODE_ENV === 'development' 
        ? "http://127.0.0.1:8000/api/v1/"
        : process.env.EVA_API_URL,
    // ...(process.env.NODE_ENV === 'production' && {
    //     proxy: {
    //         host: process.env.PROXY_HOST,
    //         port: process.env.PROXY_PORT,
    //         protocol: process.env.PROXY_PROTOCOL
    //     }
    // })
    // withCredentials: true
})

export const getVideos = ({random=false, page=1, page_limit=5} = {}) => instance.get(`videos/`, {params: {random, page, page_limit}}).then((response) => response.data);
export const getVideosSearch = ({page=1, page_limit=5, query=null, filter_params, sort_by} = {}) => instance.get(`videos/search`, {params: {page, page_limit, query, filter_params, sort_by}}).then((response) => response.data);
export const getClipsSearch = ({page=1, page_limit=5, query=null, filter_params, sort_by} = {}) => instance.get(`clips/search`, {params: {page, page_limit, query, filter_params, sort_by}}).then((response) => response.data);   
export const getEvaVideo = (id) => instance.get(`videos/${id}`).then((response) => response.data);
export const getClips = ({random=false, page=1, page_limit=5} = {}) => instance.get(`clips/`, {params: {random, page, page_limit}}).then((response) => response.data);
export const getClip = (id) => instance.get(`clips/${id}`).then((response) => response.data);