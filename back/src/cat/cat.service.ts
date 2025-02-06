import {Injectable} from "@nestjs/common";
import {validate as validateDTO} from "class-validator";
import {plainToInstance} from "class-transformer";
import axios from "axios";
import {CatImageDto, FetchImageResponseDto} from "./definition";

const catImagesUrl = process.env.CAT_IMAGES_URL as string | undefined;

if(!catImagesUrl) throw new Error(
    "CAT_IMAGES_URL environment variable is not defined"
)

@Injectable()
export class CatService {
    public async fetchAllImages(): Promise<CatImageDto[]> {
        const url = catImagesUrl as string;
        const response= await axios.get<FetchImageResponseDto>(url);
        const fetchImageResponseDto = plainToInstance(FetchImageResponseDto, response.data, {excludeExtraneousValues: true});
        const validationErrors = await validateDTO(fetchImageResponseDto);
        if (validationErrors.length > 0) throw validationErrors;
        return fetchImageResponseDto.images;
    }
}
