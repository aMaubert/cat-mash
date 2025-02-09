import type {Cat} from "./definitions";
import axios, {type AxiosResponse} from "axios";


const baseUrl = import.meta.env.VITE_APP_BACK_URL;
export class CatService {

    private static readonly baseApiUrl = `${baseUrl}/cats`;

    public static async fetchAll(): Promise<AxiosResponse<Cat[]>> {
        return axios.get<Cat[]>(CatService.baseApiUrl);
    }
}