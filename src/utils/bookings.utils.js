export function formatBookingDate(month, date, timeslots) {
  function parseTime(timeStr, dateObj) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    dateObj.setHours(hours, minutes, 0, 0);
    return dateObj;
  }

  const startHours = parseTime(timeslots[0].split(' - ')[0], new Date());
  const yearnow = new Date().getFullYear();
  const baseDate = new Date(yearnow, month - 1, date, startHours.getHours());
  const formattedDate = `${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}-${yearnow}`;
  let totalDuration = 0;
  timeslots.forEach((slot) => {
    const [startTime, endTime] = slot.split(' - ');
    const startDate = new Date(baseDate);
    const endDate = new Date(baseDate);
    const startTimeParsed = parseTime(startTime, startDate);
    const endTimeParsed = parseTime(endTime, endDate);

    const duration = (endTimeParsed - startTimeParsed) / (1000 * 60 * 60);
    totalDuration += duration;
  });

  return {
    formattedDate: `${formattedDate} ${String(baseDate.getHours()).padStart(2, '0')}:${String(baseDate.getMinutes()).padStart(2, '0')}:${String(baseDate.getSeconds()).padStart(2, '0')}`,
    totalDuration: totalDuration
  };
}

export function formatBookingTimingsforUi(startTime, endtime) {
  const startdate = new Date(Number(startTime));
  const enddate = new Date(Number(endtime));

  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const endtimeoptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return `${startdate.toLocaleString('en-US', options)} - ${enddate.toLocaleString('en-US', endtimeoptions)}`;
}

export const parseTimeSlot = (timeString) => {
  const [startTime, endTime] = timeString.split(' - ');
  const [startHour, startMinute] = startTime.split(' ')[0].split(':');
  const startAMPM = startTime.split(' ')[1];
  
  let hours = parseInt(startHour);
  if (startAMPM === 'PM' && hours !== 12) hours += 12;
  if (startAMPM === 'AM' && hours === 12) hours = 0;
  
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(parseInt(startMinute));
  date.setSeconds(0);
  return date;
};

export function convertToTimeSlots(startMs, endMs, intervalMinutes = 60) {
  const startTime = new Date(startMs);
  const endTime = new Date(endMs);
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
  }
  const timeSlots = [];
  
  while (startTime < endTime) {
    const slotEndTime = new Date(startTime.getTime() + intervalMinutes * 60000);
    
    const actualEndTime = slotEndTime > endTime ? endTime : slotEndTime;
 
    const startStr = formatTime(startTime);
    const endStr = formatTime(actualEndTime);
    
    timeSlots.push(`${startStr} - ${endStr}`);
   
    startTime.setTime(actualEndTime.getTime());
  }
  
  return timeSlots;
}