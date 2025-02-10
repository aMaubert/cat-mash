import type {Cat} from "./definitions";
import axios, {type AxiosResponse} from "axios";


const baseUrl = import.meta.env.VITE_APP_BACK_URL;
export class CatService {

    private static readonly baseApiUrl = `${baseUrl}/cats`;
    private static readonly userScoreKey = `score`;

    public static async fetchAll(): Promise<AxiosResponse<Cat[]>> {
        return axios.get<Cat[]>(CatService.baseApiUrl);
    }

    public static async incrementScore(catId: string): Promise<AxiosResponse<Cat>> {
        const url = `${CatService.baseApiUrl}/${catId}/increment`;
        return axios.put<Cat>(url);
    }

    public static fetchUserScore(): number {
        const score = localStorage.getItem(CatService.userScoreKey);
        return score ? parseInt(score) : 0;
    }

    public static incrementUserScore(): number {
        let currentScore = CatService.fetchUserScore();
        currentScore += 1;
        localStorage.setItem(CatService.userScoreKey, currentScore.toString());
        return currentScore;

    }
}