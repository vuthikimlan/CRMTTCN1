import axios from "axios";
import Cookies from "js-cookie";


const base_url = "https://955c-2001-ee0-1a4d-f06f-a85b-d840-2adc-1257.ngrok-free.app"

const login_path = "/auth/login"


//Truoc khi call API
axios.interceptors.request.use((req) => {
    //Noi 2 url voi nhau
    const jwt = Cookies.get("jwt")
    const newUrl = base_url + req.url
    const Authorization = login_path === req.url ? undefined : `Bearer ${jwt}`
    return{
        ...req,
        url: newUrl,
        headers: {
            ...req.headers,
            Authorization,
            'ngrok-skip-browser-warning': '1'
        }
    }
})

//Sau khi co response tra ve
axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export default axios