const formatTime = (string) => {
  // форматируем время, приводим к массиву чисел
  const stringArray = string.split(':');
  const result = stringArray;
  for (let i = 0; i < stringArray.length; i++) {
    result[i] = Number(stringArray[i]);
  }
  return result; // возвращаем массив чисел
};

const compareTime = (timeStr1, timeStr2) => {
  // сравниваем два значения времени,
  // на входе - строки, на выходе true если первое меньше или равно, false если первое больше
  const time1 = formatTime(timeStr1);
  const time2 = formatTime(timeStr2);
  //сначала часы
  if (time1[0] > time2[0]) {
    console.log('первое время больше, т.е. позже');
    return false;
  } else if (time1[0] < time2[0]) {
    console.log('первое время меньше, т.е. раньше');
    return true;
  } else if (time1[0] === time2[0]) {
    console.log('часы совпадают, надо сравнивать минуты');
  }
  // теперь сравниваем минуты
  if (time1[1] > time2[1]) {
    console.log('первое время больше, т.е. позже');
    return false;
  } else if (time1[1] < time2[1]) {
    console.log('первое время меньше, т.е. раньше');
    return true;
  } else if (time1[1] === time2[1]) {
    console.log('время совпадает');
    return true;
  }
};

const formatMeetingDuraion = (minutes) => {
  //превращаем минуты в массив чисел: часы и минуты
  const meetingDuration = [];
  meetingDuration.push(Math.trunc(minutes / 60));
  meetingDuration.push(minutes % 60);
  //console.log('meetingDuration - ', meetingDuration);
  return meetingDuration;
};

const getMeetingEnd = (meetingStart, meetingDuration) => {
  // формируем время окончания встречи
  const formatedMeetingStart = formatTime(meetingStart);
  const formatedMeetingDuraion = formatMeetingDuraion(meetingDuration);
  const meetingEnd = [];
  meetingEnd.push(formatedMeetingStart[0] + formatedMeetingDuraion[0]);
  meetingEnd.push(formatedMeetingStart[1] + formatedMeetingDuraion[1]);
  if (meetingEnd[1] >= 60) {
    meetingEnd[0] += 1;
    meetingEnd[1] = meetingEnd[1] - 60;
  }

  return meetingEnd.join(':'); // возвращаем строку
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
    console.log('начало встречи в рабочее время');
  } else {
    console.log('начало встречи раньше начала рабочего дня');
    return false;
  }
  const meetingEnd = getMeetingEnd(meetingStart, meetingDuration);
  //проверяем, укаладывается ли время окончания встречи в рабочий день
  if (compareTime(meetingEnd, workingEnd)) {
    console.log('встреча закончилась в рабочее время');
    return true;
  } else {
    console.log('встреча закончилась позже окончания рабочиего дня');
    return false;
  }
};

console.log(isMeetengInWorkingDay('8:00', '17:30', '08:00', 900));
