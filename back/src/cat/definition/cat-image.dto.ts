import {IsDefined, IsString, IsUrl} from 'class-validator'
import {Expose} from "class-transformer";
export class CatImageDto {
    @IsDefined()
    @IsString()
    @Expose()
    id!: string;

    @IsDefined()
    @IsString()
    @IsUrl()
    @Expose()
    url!: string;
}