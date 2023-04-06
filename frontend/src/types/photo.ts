export interface IPhoto {
  id: string;
  title: string;
  description: string;
  mainPhoto: string;
  popularity: number;
  photoshoot: { id: string; url: string }[];
}
