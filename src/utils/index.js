export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const textMutated = (text) => {
  return String(text ?? "").length === 0 ? "text-muted" : "";
};
