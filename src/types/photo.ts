export interface IPhoto {
  id: string;
  title: string;
  description: string;
  mainPhoto: string;
  popularity: string;
  photoshoot: { id: string; url: string }[];
}
