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
    id: string;
    name: string;
    dateOfBirth: string;
    image: string;
    gender: true | false;
    job: {};
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
export interface TheaterType {
  id: string;
  location: string;
  name: string;
}
export interface SeatType {
  id: string;
  locateRow: string;
  locateColumn: number;
  price: number;
  status: boolean;
  showtimeId: string;
  isCouple: boolean;
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
  dateScreenTime: string;
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

export interface ChangePasswordType {
  otp: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

export interface CouponType {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  minValue: number;
  image: string;
  publicId: string;
  status: boolean;
}

export interface FeedbackRequestType {
  movieId: string;
  content: string;
  rate: Double;
}

export interface FeedbackType {
  id: string;
  content: string;
  rate: Double;
  date: string;
  time: string;
  byName: string;
  byEmail: string;
  movieId: string;
  status: boolean;
}

export interface NotiTypeSocket {
  message: string;
  result: {};
}

export interface PartnerType {
  name: string;
  dateOfBirth: string;
}
