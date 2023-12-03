import axios from "axios";
import { API_URL_BASE } from './constant';

const axiosClient = axios.create({
    baseURL: `${API_URL_BASE}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const req = localStorage.getItem("ACCESS_TOKEN") ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`:"";
    config.headers.Authorization = req;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;

            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (e) {
            console.error(e);
        }
        throw error;
    }
);

export default axiosClient;
