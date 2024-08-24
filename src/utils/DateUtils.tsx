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
