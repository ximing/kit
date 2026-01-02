/**
 * Parses a date string according to the given format string.
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
 * @param dateStr - The date string to parse
 * @param formatStr - The format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns The parsed Date object, or null if parsing fails
 *
 * @example
 * parse('2024-01-15 14:30:45') // => Date object
 * parse('2024/01/15', 'YYYY/MM/DD') // => Date object
 * parse('15-01-2024', 'DD-MM-YYYY') // => Date object
 */
export function parse(dateStr: string, formatStr: string = 'YYYY-MM-DD HH:mm:ss'): Date | null {
  if (typeof dateStr !== 'string') {
    return null;
  }

  if (typeof formatStr !== 'string') {
    return null;
  }

  // Use placeholders to avoid issues with token replacement and escaping
  let pattern = formatStr;
  const positions: Record<string, number> = {};
  const placeholders: Record<string, string> = {};
  let groupIndex = 1;

  // First pass: replace tokens with unique placeholders
  const tokens = ['YYYY', 'SSS', 'MM', 'DD', 'HH', 'mm', 'ss'];
  for (const token of tokens) {
    if (pattern.includes(token)) {
      const placeholder = `__${token}__`;
      placeholders[placeholder] = token;
      positions[token] = groupIndex;
      pattern = pattern.replace(new RegExp(token, 'g'), placeholder);
      groupIndex++;
    }
  }

  // Second pass: escape special regex characters
  pattern = pattern.replace(/[.+*?^${}()|[\]\\]/g, '\\$&');

  // Third pass: replace placeholders with regex patterns
  pattern = pattern.replace(/__YYYY__/g, '(\\d{4})');
  pattern = pattern.replace(/__SSS__/g, '(\\d{1,3})');
  pattern = pattern.replace(/__MM__/g, '(\\d{1,2})');
  pattern = pattern.replace(/__DD__/g, '(\\d{1,2})');
  pattern = pattern.replace(/__HH__/g, '(\\d{1,2})');
  pattern = pattern.replace(/__mm__/g, '(\\d{1,2})');
  pattern = pattern.replace(/__ss__/g, '(\\d{1,2})');

  const regex = new RegExp(`^${pattern}$`);
  const match = dateStr.match(regex);

  if (!match) {
    return null;
  }

  // Extract values from match groups
  const year = positions.YYYY !== undefined ? parseInt(match[positions.YYYY], 10) : 1970;
  const month = positions.MM !== undefined ? parseInt(match[positions.MM], 10) - 1 : 0;
  const day = positions.DD !== undefined ? parseInt(match[positions.DD], 10) : 1;
  const hour = positions.HH !== undefined ? parseInt(match[positions.HH], 10) : 0;
  const minute = positions.mm !== undefined ? parseInt(match[positions.mm], 10) : 0;
  const second = positions.ss !== undefined ? parseInt(match[positions.ss], 10) : 0;
  const millisecond = positions.SSS !== undefined ? parseInt(match[positions.SSS], 10) : 0;

  // Validate extracted values
  if (
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59 ||
    millisecond < 0 ||
    millisecond > 999
  ) {
    return null;
  }

  const date = new Date(year, month, day, hour, minute, second, millisecond);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}
