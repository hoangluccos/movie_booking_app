import { Double } from "react-native/Libraries/Types/CodegenTypes";

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

export interface FoodType {
  id: string;
  name: string;
  price: number;
  image: string;
  publicId: string;
}
export interface TicketType {
  id: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  movieName: string;
  movieId: string;
  theaterName: string;
  roomName: string;
  canComment: boolean;
  seats: Array<{
    id: string;
    locateRow: string;
    locateColumn: number;
    price: Double;
  }>;
  totalPrice: Double;
}
