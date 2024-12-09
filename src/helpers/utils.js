export const formatDateToHashKey = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const options = {
    weekday: 'long',
    day: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('es-ES', options);

  const parts = formatter.formatToParts(date);
  const weekday = parts.find(part => part.type === 'weekday').value;
  const dayFormatted = parts.find(part => part.type === 'day').value;

  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}-${dayFormatted}`;
};

export const fahrenheitToCelsius = (tempF) => ((tempF - 32) * 5) / 9;

export const mpsToKmh = (speed) => speed * 3.6;

export const formatTime = (datetime) => {
  const [date, time] = datetime.split("T");
  
  return time.slice(0, 5);
};
