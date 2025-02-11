import axios from "axios";

const api = axios.create({
    baseURL: "https://sudoku-larose8.onrender.com/api" // URL вашого бекенду на Render
});

export default api;