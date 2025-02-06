import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Cat, CatDocument} from "./definition";
import {Model} from "mongoose";
import {CatService} from "./cat.service";

@Injectable()
export class CatDao {
    constructor(@InjectModel(Cat.name) private catModel: Model<Cat>,
                private readonly catService: CatService) {
        this.initData().then(() => console.log("Data initialized"));
    }
    /*
       Init data from the images fetch online
       Fetch the list of cat images and insert them if they not already exists in DB
       if the image doesn't exist then insert it in collection with a 0 score value
     */
    private async initData(): Promise<void> {
        const catImages = await this.catService.fetchAllImages();
        const imageIds = catImages.map(catImage => catImage.id);

        const existingCats = await this.catModel.find({ imageId: { $in: imageIds } }).exec();
        const existingCatImageIds = existingCats.map(cat => cat.imageId);


        const catsToInsert = catImages.filter(catImage => !existingCatImageIds.includes(catImage.id));
        const defaultCats: Cat[] = catsToInsert.map(catImage => {
            return {
                imageId: catImage.id,
                imageUrl: catImage.url,
                score: 0,
            }
        });
        const result = await this.catModel.insertMany(defaultCats);
        console.log("init Data", result);

    }

    public async fetchAll(): Promise<CatDocument[]> {
        return this.catModel.find().exec();
    }
    public async incrementScoreById(catId: string): Promise<CatDocument> {
        const catDocument = await this.catModel.findOne({_id: catId}).exec();
        if (catDocument === null) {
            throw new Error("Cat not found");
        }
        catDocument.score++;
        return catDocument.save();
    }

}