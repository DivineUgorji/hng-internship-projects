function getUTCDateTime() {
  const now = new Date();
  // Format: YYYY-MM-DD HH:MM:SS
  const utcDateTime = now.toISOString().replace("T", " ").substring(0, 19);
  return utcDateTime;
}
document.addEventListener("DOMContentLoaded", () => {
  const utcElement = document.getElementById("utc-time");
  if (utcElement) {
    utcElement.textContent = getUTCDateTime();
  }
});
