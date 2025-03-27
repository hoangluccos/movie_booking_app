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
