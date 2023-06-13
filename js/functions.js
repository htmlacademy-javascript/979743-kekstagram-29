
function checkStringLength (string, maxLength) {
  return (string.length <= maxLength);
}
// проверяем работу функции
// const isValidStringLength = checkStringLength ('an', 1);
// console.log(isValidStringLength);

// успокоим линтер
checkStringLength ('an', 1);

function checkPalindrom (string) {
  const normalazeString = string.replaceAll(' ', '').toLowerCase();

  let palindrom = '';
  for (let i = normalazeString.length - 1; i >= 0; i--) {
    palindrom += normalazeString[i];
  }
  return (palindrom === normalazeString);
}
// проверяем работу функции
// const isPalindrom = checkPalindrom('s o s');
// console.log(isPalindrom);

// успокоим линтер
checkPalindrom('dfvfdvdfvf');

function getNumberFromString (possiblyString) {
  //проверяем, что пришло в ф-ю
  let definitelyString = possiblyString;
  if (typeof(possiblyString) !== 'string') {
    definitelyString = possiblyString.toString();
  }

  // работаем со строкой
  let resultNumberStr = '';
  for (let i = 0; i < definitelyString.length; i++) {
    const currentNumber = parseInt(definitelyString[i], 10);
    if (!Number.isNaN(currentNumber)) {
      resultNumberStr += definitelyString[i];
    }
  }

  // делаем число из выбранных цифр или NaN
  const resultNumber = parseInt(resultNumberStr, 10);

  // контроль
  if (resultNumber >= 0 || Number.isNaN(resultNumber)) {
    return resultNumber;
  } else {
    return 'Что-то пошло не так...';
  }
}

// проверяем работу функции
// const testNum = 'агент 007';
// const numberFromString = getNumberFromString(testNum);
// console.log(numberFromString);

// успокоим линтер
getNumberFromString('5fvd1vd');
