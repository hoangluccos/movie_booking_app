export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60); // Lấy số giờ
  const minutes = duration % 60; // Lấy số phút

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
};
