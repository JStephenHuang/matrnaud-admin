import { IPhoto } from "../types/photo";

export const sortByPop = (a: IPhoto, b: IPhoto) =>
  Number(a.popularity) - Number(b.popularity);
