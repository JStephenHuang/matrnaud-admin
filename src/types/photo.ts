export interface IPhoto {
  id: string;
  title: string;
  description: string;
  mainPhoto: string;
  popularity: string;
  active: boolean;
  price: string;
  photoshoot: { id: string; url: string }[];
}
