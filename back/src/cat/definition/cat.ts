import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as SchemaMongoose} from "mongoose";
const Types = SchemaMongoose.Types;

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
    @Prop({
        type: Types.String,
        required: true,
        unique: true,
    })
    imageId: string;

    @Prop({
        type: Types.String,
        required: true,
    })
    imageUrl: string;

    @Prop({
        type: Types.Number,
        required: true
    })
    score: number;

}


export const CatSchema = SchemaFactory.createForClass(Cat);