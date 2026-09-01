import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.56:8082/",
});

export default api;