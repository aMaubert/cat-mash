import {Controller, Get, Param, Put} from "@nestjs/common";
import {CatDocument} from "./definition";
import {CatDao} from "./cat.dao";

@Controller("/cats")
export class CatController {
    constructor(private readonly catDao: CatDao) {}

    @Get()
    public async fetchAll(): Promise<CatDocument[]> {
        return this.catDao.fetchAll();
    }

    @Put('/:catId/increment')
    public async IncrementScoreById(@Param('catId') catId: string): Promise<CatDocument> {
        return this.catDao.incrementScoreById(catId);
    }
}