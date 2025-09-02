export const showDate = (value: string) => {
  if (!value) return "--";

  const date = new Date(value);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks > 1 ? `${weeks} weeks ago` : "This week";
  }

  // >= 1 month → show actual date
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // e.g., Aug
    day: "numeric", // e.g., 23
    year: "numeric", // e.g., 2025
  }).format(date);
};