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

export interface ShowtimeType {
  id: string;
  date: string;
  status: string;
  startTime: string;
  theater: {
    id: string;
    location: string;
    name: string;
  };
  totalSeat: number;
  emptySeat: number;
}

export interface SeatType {
  id: string;
  locateRow: string;
  locateColumn: number;
  price: number;
  status: boolean;
  showtimeId: string;
}
