export interface IPhoto {
  id: string;
  title: string;
  description: string;
  mainPhoto: string;
  popularity: number;
  active: boolean;
  price: number;
  photoshoot: { id: string; url: string }[];
}
