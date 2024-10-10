import moment from 'moment';
import 'moment/locale/id'; // Import locale
moment.locale('id'); // Set locale globally

type FormatOptions = {
  dateFormat?: string; // Default format is 'YYYY-MM-DD'
};

export const formatDate = (
  date: string | Date,
  options: FormatOptions = {},
): string => {
  const { dateFormat = 'YYYY-MM-DD' } = options;

  // Use moment to parse and format the date
  return moment(date).format(dateFormat);
};

export function isStartDateAfterEndDate(
  startDate: string | Date,
  endDate: string | Date,
) {
  // Parse the dates using moment
  const start = moment(startDate, 'YYYY-MM-DD');
  const end = moment(endDate, 'YYYY-MM-DD');

  // Check if startDate is after endDate
  return start.isAfter(end);
}

export function getDayDiff(tanggalMulai: string, tanggalSelesai: string) {
  // Parse tanggal dengan format YYYY-MM-DD
  const mulai = moment(tanggalMulai, 'YYYY-MM-DD');
  const selesai = moment(tanggalSelesai, 'YYYY-MM-DD');

  // Hitung selisih hari
  const lamaHari = selesai.diff(mulai, 'days');

  return lamaHari;
}
