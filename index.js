// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector(".fruits__list"); // список карточек
const shuffleButton = document.querySelector(".shuffle__btn"); // кнопка перемешивания
const filterButton = document.querySelector(".filter__btn"); // кнопка фильтрации
const sortKindLabel = document.querySelector(".sort__kind"); // поле с названием сортировки
const sortTimeLabel = document.querySelector(".sort__time"); // поле с временем сортировки
const sortChangeButton = document.querySelector(".sort__change__btn"); // кнопка смены сортировки
const sortActionButton = document.querySelector(".sort__action__btn"); // кнопка сортировки
const kindInput = document.querySelector(".kind__input"); // поле с названием вида
const colorInput = document.querySelector(".color__input"); // поле с названием цвета
const weightInput = document.querySelector(".weight__input"); // поле с весом
const addActionButton = document.querySelector(".add__action__btn"); // кнопка добавления
const minWeightInput = document.querySelector(".minweight_input"); // данные из поля minweight__input
const maxWeightInput = document.querySelector(".maxweight_input"); // данные из поля maxweight__input
const sortTimeOutput = document.querySelector(".sort__time"); // время сортировки sort__time

// для добавления, сортировки создаем переменные с цветами
const colorViolet = "фиолетовый";
const colorGreen = "зеленый";
const colorCarmazin = "розово-красный";
const colorYellow = "желтый";
const colorLightbrown = "светло-коричневый";
 // для сравнения вводимого цвета с допустимым создаем массив из значений цветов
const colorFruit = [colorViolet, colorGreen, colorCarmazin, colorYellow, colorLightbrown];

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind":"Мангустин","color":"фиолетовый","weight":13},
  {"kind":"Дуриан","color":"зеленый","weight":35},
  {"kind":"Личи","color":"розово-красный","weight":17},
  {"kind":"Карамбола","color":"желтый","weight":28},
  {"kind":"Тамаринд","color":"светло-коричневый","weight":22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

console.log(fruits);

/*** ОТОБРАЖЕНИЕ ***/
// отрисовка карточек
const display = () => {
  // TODO (Задача): очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  fruitsList.replaceChildren(); // Очищаем все вложенные элементы .fruits__list (список карточек)

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    // Назначаем переменную в зависимости от цвета фрукта (назначаем переменной название соответсвующего стиля css)
    let fuitsIndex = i;
    let colorFruitCSS =
      fruits[i].color === "фиолетовый" ?
      "fruit_violet" :
      fruits[i].color === "зеленый" ?
      "fruit_green" :
      fruits[i].color === "розово-красный" ?
      "fruit_carmazin" :
      fruits[i].color === "желтый" ?
      "fruit_yellow" :
      "fruit_lightbrown";

    let fruitsLi = document.createElement("li");
    fruitsLi.classList.add("fruit__item", colorFruitCSS);
    fruitsLi.innerHTML = `<div class="fruit__info">
<div>index: ${fuitsIndex}</div>
<div>kind: ${fruits[i].kind}</div>
<div>color: ${fruits[i].color}</div>
<div>weight (кг): ${fruits[i].weight}</div>`;
    fruitsList.appendChild(fruitsLi);

  }
};
// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/
// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива

    //   Получаем рандомное число из диапозона длинны объекта fruits
    let fruitsRandom = getRandomInt(0, fruits.length - 1);

    // Удаляем из объекта 1 свойтво с индексом  fruitsRandom
    let fruitsRandomArr = fruits.splice(fruitsRandom, 1);
    // помещаем в новый массив значение с индексом fruitsRandom
    result = [...result, ...fruitsRandomArr];
  }

  // Сравниваем перемешались ли карточки относительно начального значение преобразуя массив в строку
  if (fruitsJSON === JSON.stringify(result)) {
    alert("перемешивание не получилось, попробуйте ещё раз!");
  } else {
    fruits = result;
  }

};

shuffleButton.addEventListener("click", () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/
// фильтрация массива
const filterFruits = () => {
  // возвращаем fruits начальное значение
  fruits = JSON.parse(fruitsJSON);

  // Приводим значения полей min weight и max weight к типу Number для валидации формы
  let minW = Number(minWeightInput.value);
  let maxW = Number(maxWeightInput.value);

  // Проверяем на валидность данные из фомы ФИЛЬТРОВАТЬ
  if (minW > maxW || !Number.isFinite(minW) || !Number.isFinite(maxW) /*|| !Number.isInteger(maxWeightInput.value) || !Number.isInteger(minWeightInput.value)*/ ) {
    alert("Введите корректно минимальное и максимальное значение");
  } else {
    let fruitsFilter = fruits.filter((item) => {

      return item.weight >= minW && item.weight <= maxW;

    });
    fruits = fruitsFilter;
  }
};

filterButton.addEventListener("click", () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету (хороший тон отдельно описать функцию сравнения при сортировке)
    const priority = ["красный", "оранжевый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"];
    const indexA = priority.indexOf(a.color);
    const indexB = priority.indexOf(b.color);

    if (indexA < indexB) {
        return -1;
    } else if (indexA > indexB) {
        return 1;
    } else {
        return 0;
    }
};

const sortAPI = {
    bubbleSort(arr, comparation) {
      // TODO: допишите функцию сортировки пузырьком
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (comparation(arr[j], arr[j + 1]) > 0) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
      // ---------------------------------
    },

    quickSort(arr, comparation, start = 0, end = arr.length - 1) {
      // TODO: допишите функцию быстрой сортировки
        if (start >= end) {
            return;
        }
        const pivotIndex = partition(arr, comparation, start, end);
        sortAPI.quickSort(arr, comparation, start, pivotIndex - 1);
        sortAPI.quickSort(arr, comparation, pivotIndex + 1, end);
    },

    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sortAPI[sort](arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
    },
};

function partition(arr, comparation, start, end) {
    const pivot = arr[end];
    let i = start;

    for (let j = start; j < end; j++) {
        if (comparation(arr[j], pivot) <= 0) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
        }
    }

    const temp = arr[i];
    arr[i] = arr[end];
    arr[end] = temp;

    return i;
}
// инициализация полей
sortKindLabel.textContent = sortKind; // выводит в HTML метод сортировки
sortTimeLabel.textContent = sortTime; // выводит в HTML время сортировки

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
    if (sortKind === 'bubbleSort') {
        sortKind = 'quickSort';
    } else {
        sortKind = 'bubbleSort';
    }
    sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
    sortTimeLabel.textContent = 'sorting...';
    const sort = sortKind;
    sortAPI.startSort(sort, fruits, comparationColor);
    console.log(fruits);
    display();
    // TODO: вывести в sortTimeLabel значение sortTime
    sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/
addActionButton.addEventListener("click", () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let fruitInput = {};
  let kindInputValue = kindInput.value;
  let colorInputValue = colorInput.value;
  let weightInputValue = weightInput.value;
  console.log('Значение indexOf при сравнении с вводимым цветом ', colorFruit.indexOf(colorInputValue));
  
  // проверяем поле weight (вес) на целочисленное значение больше нуля
  if ( Number.isInteger(weightInputValue) || weightInputValue <= 0) {
    console.log('weightInputValue до алерт', weightInputValue);
    alert ('Введите целое положительное число в поле weight(вес)');
    // проверяем правильность ввода в поле цвет
  } if (colorFruit.indexOf(colorInputValue) == -1) {
    alert ('Введите цвет фрукта из возможно допустимых: фиолетовый, зеленый, розово-красный, желтый, светло-коричневый');
  } if (!kindInputValue) {
    alert ('Введите название фрукта');
  }
   else {
    fruitInput = {kind : kindInputValue, color : colorInputValue, weight: +weightInputValue};
    //добавляем в объект fruits новый фрукт
    fruits.push(fruitInput);
    display();
   
  }
});