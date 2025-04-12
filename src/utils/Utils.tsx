import { MovieType, SeatType } from "../data/Data";

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const transStringToDate = (stringDate: string) => {
  const parts = stringDate.split("/");
  const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  return dateObject;
};

export const generateMovieId_Image = (listMovies: MovieType[]) => {
  const result = listMovies.reduce((accumulator, current) => {
    accumulator[current.id] = current.image;
    return accumulator;
  }, {} as { [key: string]: string });
  return result;
};

export const formattedSeat = (seat: SeatType[]) => {
  const result = seat.sort((a: SeatType, b: SeatType) => {
    if (a.locateRow < b.locateRow) return -1;
    if (a.locateRow > b.locateRow) return 1;
    //if equal locateRow
    return a.locateColumn - b.locateColumn;
  });
  return result;
};
