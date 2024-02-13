export function formatDate(date: any) {
  return date.toISOString().split('T')[0].replace(/-/g, '') + 'T00';
}

export default function calculateStartDate(days: any) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
}
