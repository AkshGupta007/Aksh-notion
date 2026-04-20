export const formattedDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", options);

  let hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 → 12 for 12‑hour format

  const formattedTime = `${hour}:${minutes} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};
