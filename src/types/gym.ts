export type GymItem = {
  id: string;
  name: string;
  price: number;
};

export type GymSection = {
  id: string;
  title: string;
  items: GymItem[];
};

export type GymConfig = {
  sections: GymSection[];
};