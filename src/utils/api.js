import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"

const Token = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization : "bearer " + Token,
}

export const FetchDataFromApi = async(url,params) => {
    try {
        const {data} = await axios.get(
                BASE_URL + url,
                {
                    headers,
                    params
                }
            )
            return data;
    } catch (error) {
        console.log(`Fetching error !!`, error)
        return error
    }
}