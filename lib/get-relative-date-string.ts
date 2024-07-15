function formatDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formDateToday(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Returns a relative date string based on the input date.
 * @param inputDate - The input date to compare.
 * @returns The relative date string.
 */
export function getRelativeDateString(inputDate: Date): string {
  const now: Date = new Date();
  const input: Date = new Date(inputDate);

  // Set the time to midnight for date comparison only
  const nowDate: Date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const inputDateOnly: Date = new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate()
  );

  const oneDay: number = 24 * 60 * 60 * 1000; // milliseconds in one day

  const diffDays: number = Math.round(
    (inputDateOnly.getTime() - nowDate.getTime()) / oneDay
  );

  if (diffDays === 0) {
    return "today" + " " + formDateToday(input);
  } else if (diffDays === -1) {
    return "yesterday";
  } else if (diffDays === 1) {
    return "tomorrow";
  } else {
    return formatDate(input);
  }
}
