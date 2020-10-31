import axios from "axios";

const instance = axios.create({
    baseURL: "https://spoonshotims.herokuapp.com/"
});

export default instance;