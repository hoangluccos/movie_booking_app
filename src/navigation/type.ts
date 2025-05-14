import { MovieType, ShowtimeType, TicketType } from "../data/Data";

// Định nghĩa các màn hình trong stack navigator
export type RootStackParamList = {
  MainScreen: undefined;
  OnBoardScreen: undefined;
  VerifyEmailScreen: undefined;
  TicketScreen: { ticket: TicketType };
  MovieDetail: { id: string };
  Home: undefined;
  ProfileScreen: undefined;
  ProfileInfoScreen: undefined;
  // SeatScreen: { showtimeId: string; theaterId: string };
  SeatScreen: { showtimeId: string; Movie: MovieType; showTime: ShowtimeType };
  PaymentScreen: {
    seats: Array<string>;
    showTime: ShowtimeType;
    Movie: MovieType;
  };
  SuccessScreen: { amount: number; orderInfo: string; transactionNo: string };
  ErrorScreen: undefined;
  LogInScreen: undefined;
  ChangePasswordScreen: { email: string };
  MatchingScreen: undefined;
  MatchingSuccess: {
    dataPartner: any;
    dataTicket: any;
    dataRequestMatching: any;
  };
  PersonMovieScreen: { idActor: string };
  GenreMovieScreen: { idGenre: string };
};
