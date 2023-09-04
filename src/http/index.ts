import axios ,{AxiosInstance} from "axios"

const clientHttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json", // essa linha precisa de ajuste
      },
});


export default clientHttp;