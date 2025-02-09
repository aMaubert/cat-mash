export type Cat = {
    _id: string;
    imageId: string;
    imageUrl: string;
    score: number;
}

export type SelectedCat = {
    firstCat: Cat;
    secondCat: Cat;
}