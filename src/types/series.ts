export interface ISeries {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  photos: string[];
  active: boolean;
}

export interface IFrame {
  id: string;
  title: string;
  price: string;
  url: string;
}
