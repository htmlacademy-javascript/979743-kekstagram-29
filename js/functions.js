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
  } //else if (time1.hours === time2.hours) {
  //}
  // теперь сравниваем минуты
  if (time1.minutes > time2.minutes) {
    return false;
  } else if (time1.minutes < time2.minutes) {
    return true;
  } else if (time1.minutes === time2.minutes) {
    return true;
  }
};

const formatMeetingDuraion = (minutes) => {
  //превращаем минуты в массив чисел: часы и минуты
  const meetingDuration = {};
  meetingDuration.hours = Math.trunc(minutes / 60);
  meetingDuration.minutes = minutes % 60;
  return meetingDuration;
};

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
  //return meetingEnd.join(':'); // возвращаем строку
  return String(meetingEnd.hours) + ':' + String(meetingEnd.minutes); // возвращаем строку
};

//console.log('getMeetingEnd - ', getMeetingEnd('14:15', 50));

// оновная функция
const isMeetengInWorkingDay = (
  workingStart,
  workingEnd,
  meetingStart,
  meetingDuration
) => {
  // workingStart, workingEnd - string 08:05, 8:5, 08:5, 8:05
  // meetingDuration - number, minutes
  //проверяем, попадает ли время начала встречи в рабочий день
  if (compareTime(workingStart, meetingStart)) {
    //console.log('начало встречи в рабочее время');
  } else {
    //console.log('начало встречи раньше начала рабочего дня');
    return false;
  }
  const meetingEnd = getMeetingEnd(meetingStart, meetingDuration);
  //проверяем, укаладывается ли время окончания встречи в рабочий день
  if (compareTime(meetingEnd, workingEnd)) {
    //console.log('встреча закончилась в рабочее время');
    return true;
  } else {
    //console.log('встреча закончилась позже окончания рабочиего дня');
    return false;
  }
};

//console.log(isMeetengInWorkingDay('8:0', '10:0', '8:0', 120));
