const formatTime = (string) => {
  // форматируем время, приводим к массиву чисел
  const stringArray = string.split(':');
  return {
    // возвращаем объект с числами
    hours: Number(stringArray[0]),
    minutes: Number(stringArray[1]),
  };
};

const compareTime = (timeStr1, timeStr2) => {
  // сравниваем два значения времени,
  // на входе - строки, на выходе true если первое меньше или равно, false если первое больше
  const time1 = formatTime(timeStr1);
  const time2 = formatTime(timeStr2);
  //сначала часы
  if (time1.hours > time2.hours) {
    return false;
  } else if (time1.hours < time2.hours) {
    return true;
  }
  // теперь сравниваем минуты
  if (time1.minutes > time2.minutes) {
    return false;
  } else if (time1.minutes <= time2.minutes) {
    return true;
  }
};

const formatMeetingDuraion = (minutes) => ({
  //превращаем минуты в массив чисел: часы и минуты
  hours: Math.trunc(minutes / 60),
  minutes: minutes % 60,
});

const getMeetingEnd = (meetingStart, meetingDuration) => {
  // формируем время окончания встречи
  const formatedMeetingStart = formatTime(meetingStart);
  const formatedMeetingDuraion = formatMeetingDuraion(meetingDuration);
  const meetingEnd = {};
  meetingEnd.hours = formatedMeetingStart.hours + formatedMeetingDuraion.hours;
  meetingEnd.minutes =
    formatedMeetingStart.minutes + formatedMeetingDuraion.minutes;
  if (meetingEnd.minutes >= 60) {
    meetingEnd.hours += 1;
    meetingEnd.minutes = meetingEnd.minutes - 60;
  }
  return `${String(meetingEnd.hours)}:${String(meetingEnd.minutes)}`; // возвращаем строку
};

const isMeetengInWorkingDay = (
  workingStart,
  workingEnd,
  meetingStart,
  meetingDuration
) => {
  //проверяем, попадает ли время начала встречи в рабочий день
  if (!compareTime(workingStart, meetingStart)) {
    return false;
  }
  const meetingEnd = getMeetingEnd(meetingStart, meetingDuration);
  //проверяем, укаладывается ли время окончания встречи в рабочий день
  return compareTime(meetingEnd, workingEnd);
};
isMeetengInWorkingDay('8:0', '10:0', '8:0', 120);
// console.log(isMeetengInWorkingDay('08:00', '17:30', '14:00', 90)); // true
// console.log(isMeetengInWorkingDay('8:0', '10:0', '8:0', 120)); // true
// console.log(isMeetengInWorkingDay('08:00', '14:30', '14:00', 90)); // false
// console.log(isMeetengInWorkingDay('14:00', '17:30', '08:0', 90)); // false
// console.log(isMeetengInWorkingDay('8:00', '17:30', '08:00', 900)); // false
