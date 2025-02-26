export type movieType = {
  id: string;
  name: string;
  premiere: string;
  language: string;
  content: string;
  duration: number;
  rate: number;
  image: string;
  genres: genreType[];
};

export type genreType = {
  id: string;
  name: string;
};
