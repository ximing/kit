/**
 * Formats a date according to the given format string.
 *
 * Supported format tokens:
 * - YYYY: 4-digit year
 * - MM: 2-digit month (01-12)
 * - DD: 2-digit day (01-31)
 * - HH: 2-digit hour (00-23)
 * - mm: 2-digit minute (00-59)
 * - ss: 2-digit second (00-59)
 * - SSS: 3-digit millisecond (000-999)
 *
 * @param date - The date to format
 * @param formatStr - The format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns The formatted date string
 *
 * @example
 * format(new Date('2024-01-15T14:30:45.123Z')) // => '2024-01-15 14:30:45'
 * format(new Date('2024-01-15'), 'YYYY/MM/DD') // => '2024/01/15'
 * format(new Date('2024-01-15T14:30:45.123Z'), 'DD-MM-YYYY') // => '15-01-2024'
 */
export function format(date: Date, formatStr: string = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const pad = (num: number, len: number = 2): string => {
    return String(num).padStart(len, '0');
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();

  const tokens: Record<string, string> = {
    YYYY: String(year),
    MM: pad(month),
    DD: pad(day),
    HH: pad(hour),
    mm: pad(minute),
    ss: pad(second),
    SSS: pad(millisecond, 3),
  };

  let result = formatStr;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(new RegExp(token, 'g'), value);
  }

  return result;
}