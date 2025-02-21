import axios from "axios";

const api = axios.create({
    // Автоматично підлаштовує базову адресу відповідно до хоста бекенду
    baseURL: "/api",
});

export default api;