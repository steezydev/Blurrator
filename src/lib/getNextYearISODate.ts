export default function getNextYearISODate(): string {
  const now = new Date();
  const nextYear = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  return nextYear.toISOString();
}
