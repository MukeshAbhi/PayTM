import axios from "axios";

export const axiosNew = axios.create({
    responseType: "json",
    validateStatus: (status) => status < 500,
});