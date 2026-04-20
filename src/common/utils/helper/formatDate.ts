 function formatDate(
  dateString: string | null | undefined,
  withTime: boolean = true
): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return ""; 

  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    : {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

  return date.toLocaleString("az-AZ", options);
}


export { formatDate };