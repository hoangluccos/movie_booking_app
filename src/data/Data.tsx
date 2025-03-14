export interface MovieType {
  id: string;
  name: string;
  premiere: string;
  language: string;
  content: string;
  duration: number;
  rate: number;
  image: string;
  genres: GenreType[];
  actors: {
    name: string;
    image: string;
    gender: true | false;
  }[];
}

export interface GenreType {
  id: string;
  name: string;
}

export interface User {
  username: string;
  email: string;
  avatar?: string;
  dateOfBirth?: Date | string;
  firstName?: string;
  lastName?: string;
}
