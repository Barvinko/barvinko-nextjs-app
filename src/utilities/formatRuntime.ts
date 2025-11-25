export const formatRuntime = (totalMinutes: number | undefined) => {
  if (typeof totalMinutes !== 'number' || totalMinutes <= 0) {
    return undefined;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      result += ' ';
    }
    result += `${minutes}m`;
  }

  return result || `${totalMinutes}m`;
};
