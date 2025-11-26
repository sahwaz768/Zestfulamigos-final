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
    timeZone: "Asia/Kolkata",
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const endtimeoptions = {
    timeZone: "Asia/Kolkata",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return `${startdate.toLocaleString('en-IN', options)} - ${enddate.toLocaleString('en-IN', endtimeoptions)}`;
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

export function generateStimeSlots(startMs, endMs) {
 // const offsetInMs = 5.5 * 60 * 60 * 1000;
  let startTime = new Date(startMs);
  let endTime = new Date(endMs);
  let times = [];
  while (startTime < endTime) {

      let starthours = startTime.getHours();
      // let minutes = startTime.getMinutes();
      let startampm = starthours >= 12 ? 'PM' : 'AM';

      starthours = starthours % 12;
      starthours = starthours ? starthours : 12;
      // minutes = minutes < 10 ? '0' + minutes : minutes; // 
      let formattedstartTime = starthours + ':' + '00' + ' ' + startampm;
      
      let endhours = new Date(startTime.getHours() + 1);
      // let minutes = startTime.getMinutes();
      let endampm = endhours >= 12 ? 'PM' : 'AM';

      endhours = endhours % 12;
      endhours = endhours ? endhours : 12;
      // minutes = minutes < 10 ? '0' + minutes : minutes; // 
      let formattedendTime = endhours + ':' + '00' + ' ' + endampm;
      
      times.push(`${formattedstartTime} - ${formattedendTime}`);
      startTime.setHours(startTime.getHours() + 1);
  }

  return times;
}

export function formatBookingTime(startTime) {
  const startdate = new Date(Number(startTime));
  // const enddate = new Date(Number(endtime));

  const options = {
   timeZone: "Asia/Kolkata",
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
  console.log("Before formatting",new Date(Number(startTime)))
  // return `${startdate.toLocaleString('en-US', options)} - ${enddate.toLocaleString('en-US', endtimeoptions)}`;
  return `${startdate.toLocaleString('en-In', options)}`;
}

export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const months = Math.floor(diffInSeconds / (3600 * 24 * 30));
  const years = Math.floor(diffInSeconds / (3600 * 24 * 365));

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}


export const getBookingDataforUserUi = (bookingdata) => {
  const results = []
  for (let i = 0; i < bookingdata.length; i += 1) {
    const value = {
      id: bookingdata[i].id,
      companion: bookingdata[i].users.filter((l) => l.isCompanion)[0],
      user: bookingdata[i].users.filter((l) => !l.isCompanion)[0],
      bookingdate: formatBookingTimingsforUi(
        bookingdata[i].bookingstart,
        bookingdata[i].bookingend
      ),
      status: bookingdata[i].status,
      amount: bookingdata[i].amount,
      sessions: bookingdata[i].sessions
    };
    results.push(value)
  }
  return results;
}

export const calculateRemainingTime = (endTime) => {
  const currentTime = Date.now();
  const remainingTime = Number(endTime) - currentTime;

  if (remainingTime <= 0) return 0;

  return remainingTime;
};




export const convertSlotsToSchedule = (selectedSlots) => {
  // Day mapping: Sunday = 0, Monday = 1, etc.
  const dayMap = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6
  };

  // Group slots by day
  const groupedByDay = {};
  selectedSlots.forEach(slot => {
    const [day, hour] = slot.split('-');
    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }
    groupedByDay[day].push(parseInt(hour));
  });

  // Convert to desired format
  const result = Object.entries(groupedByDay).map(([day, hours]) => {
    hours.sort((a, b) => a - b);
    const startHour = Math.min(...hours);
    const endHour = Math.max(...hours) + 1; // End time is one hour after last selected hour

    // Create a date for today to get unix milliseconds for the time
    const today = new Date();
    today.setHours(startHour, 0, 0, 0);
    const startTime = today.getTime();

    today.setHours(endHour, 0, 0, 0);
    const endTime = today.getTime();

    return {
      dayOfWeek: dayMap[day],
      startTime: JSON.stringify(startTime),
      endTime: JSON.stringify(endTime)
    };
  });

  return result;
};



export const ScheduleToSlots = (schedule) => {
  // Reverse day mapping: 0 = Sunday, 1 = Monday, etc.
  const dayMap = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };

  const slots = [];

  schedule.forEach(slot => {
    const { dayOfWeek, startTime, endTime } = slot;
    
    // Parse timestamps (handle both string and number formats)
    const startTimestamp = typeof startTime === 'string' ? parseInt(startTime) : startTime;
    const endTimestamp = typeof endTime === 'string' ? parseInt(endTime) : endTime;
    
    // Convert timestamps to Date objects
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);
    
    // Get start and end hours
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    
    // Get day abbreviation
    const dayAbbr = dayMap[dayOfWeek];
    
    // Generate slot strings for each hour in the range
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${dayAbbr}-${hour}`);
    }
  });

  return slots;
};


export const formatUnixMillisToDate =(unixMillis) =>{
  const date = new Date(unixMillis);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}


export const  getTodayIndex = () => {
  const today = new Date();
  return today.getDay(); // Returns 0-6 (Sunday-Saturday)
}

export const  filterScheduleByDay = (index, data) => {
  // Calculate the next 4 consecutive days starting from index
  const daysToInclude = [];
  for (let i = 0; i < 4; i++) {
    daysToInclude.push((index + i) % 7);
  }
  
  // Filter the data array to include only the calculated days
  const filtered = data.filter(item => daysToInclude.includes(item.dayOfWeek));
  
  // Sort by the order of days in daysToInclude
  filtered.sort((a, b) => {
    return daysToInclude.indexOf(a.dayOfWeek) - daysToInclude.indexOf(b.dayOfWeek);
  });
  
  return filtered;
}


export const  convertArrayToIndexedObject = (arr) => {
    const result = {};
    
    arr.forEach((item, index) => {
        // Use the array index as the key in the result object
        result[index] = item.slots;
    });
    
    return result;
}


export const  replaceTimeslots = (data) => {
  // Define the new timeslots that should be used
  const newTimeslots = [
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    '10:00 PM - 11:00 PM'
  ];

  // Create a new object to store the result
  const result = {};

  // Iterate through each key in the data object
  for (const key in data) {
    // Get the existing timeslots for this key
    const existingTimeslots = data[key];
    
    // Filter out timeslots from newTimeslots that already exist
    const filteredTimeslots = newTimeslots.filter(
      slot => !existingTimeslots.includes(slot)
    );
    
    // Assign the filtered timeslots to the result
    result[key] = filteredTimeslots;
  }

  return result;
}


export const  mergeTimeSlots = (obj1, obj2) => {
    // Create a deep copy of obj1 to avoid mutation
    const result = JSON.parse(JSON.stringify(obj1));
    
    // Iterate through keys in obj2
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            // If the key exists in result, merge arrays
            if (result[key]) {
                // Combine both arrays
                const combined = [...result[key], ...obj2[key]];
                
                // Remove duplicates using Set
                result[key] = [...new Set(combined)];
            } else {
                // If key doesn't exist in result, add it
                result[key] = [...obj2[key]];
            }
        }
    }
    
    return result;
}



export const  formatUnixToDate = (unixMs) => {
  const date = new Date(unixMs);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}${m}${d}`;
}

export const getUnixMsAfter3Days = () => {
  const today = new Date();
  const after3Days = new Date(today);
  after3Days.setDate(today.getDate() + 3);

  return after3Days.getTime(); // returns unix milliseconds
}
