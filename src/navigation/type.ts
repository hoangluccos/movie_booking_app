import { MovieType, ShowtimeType } from "../data/Data";

// Định nghĩa các màn hình trong stack navigator
export type RootStackParamList = {
  TicketScreen: undefined;
  MovieDetail: { id: string };
  Home: undefined;
  ProfileScreen: undefined;
  ProfileInfoScreen: undefined;
  SeatScreen: { showtimeId: string; theaterId: string };
  // SeatScreen: { Showtime: ShowtimeType; Movie: MovieType };
  PaymentScreen: {
    seats: Array<string>;
    showtimeID: string;
    theaterId: string;
  };
};
