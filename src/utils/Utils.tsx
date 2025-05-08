import { CouponType, MovieType, SeatType } from "../data/Data";

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

export const totalPrice = (value: number) => value * 100000;

export const formatVND = (amount: number): string => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const getTypeOfCoupon = (coupon: CouponType, price: number) => {
  if (coupon.discountType === "Percentage") {
    return (price * coupon.discountValue) / 100;
  }
  //just think it == fix type
  else {
    return coupon.discountValue;
  }
};
export const compareDates = (a: string, b: string) => {
  const [dayA, monthA, yearA] = a.split("-").map(Number);
  const [dayB, monthB, yearB] = b.split("-").map(Number);

  const dateA = new Date(yearA, monthA - 1, dayA);
  const dateB = new Date(yearB, monthB - 1, dayB);
  return dateA.getTime() - dateB.getTime();
};
//dd-mm-yyyy input -> string ;
export const transferStringToDateCheckToDay = (typeString: string) => {
  const [day, month, year] = typeString.split("-").map(Number);
  //   console.log(day, month, year);
  const newDate = new Date(year, month - 1, day);
  const today = new Date();
  // am thi truoc, duong thi sau
  // console.log("Truoc ngay hien tai?: ", newDate.getTime() - today.getTime());
  return newDate.getTime() - today.getTime() > 0;
};
