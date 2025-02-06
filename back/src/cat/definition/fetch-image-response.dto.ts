import {CatImageDto} from "./cat-image.dto";
import {IsArray, IsDefined, ValidateNested} from "class-validator";
import {Expose, Type} from "class-transformer";

export class FetchImageResponseDto {
    @IsDefined()
    @IsArray()
    @Type(() => CatImageDto)
    @ValidateNested({ each: true })
    @Expose()
    images!: CatImageDto[];
}