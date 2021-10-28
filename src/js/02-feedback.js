import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/feedback-form.css';

const refs = {
  form: document.querySelector('.js-feedback-form'),
  textarea: document.querySelector('.js-feedback-form  textarea'),
  input: document.querySelector('.js-feedback-form  input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 200));

savedInputData();

refs.input.addEventListener('focus', () => {
  if (refs.input.value === refs.input.defaultValue) {
    refs.input.value = '';
  }
});

refs.input.addEventListener('blur', () => {
  if (refs.input.value === '') {
    refs.input.value = refs.input.defaultValue;
  }
});

/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem('formData');
  // console.log('savedNameData', savedNameData);
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */

const formData = {};

function onInput() {
  if (refs.input.value) {
    formData.msgName = refs.input.value;
  }

  formData.message = refs.textarea.value;

  if (refs.input.value === '') {
    // const key = 'msgName';
    formData.msgName = 'Анонимус';
    // delete formData[key];
  }

  if (refs.textarea.value === '') {
    const key = 'message';
    delete formData[key];
  }

  const stringifyData = JSON.stringify(formData);
  localStorage.setItem('formData', stringifyData);
  if (
    // (refs.input.value === '' && refs.textarea.value === '') ||
    refs.input.value === 'Анонимус' &&
    refs.textarea.value === ''
  ) {
    localStorage.removeItem('formData');
  }
  console.log(localStorage);
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function savedInputData() {
  // const savedNameData = localStorage.getItem('formData');
  // const savedMessageData = JSON.parse(localStorage.getItem(formData));
  const parsedData = JSON.parse(localStorage.getItem('formData'));
  console.log('localStorageData', localStorage.getItem('formData'));

  if (parsedData && parsedData.msgName !== undefined) {
    refs.input.value = parsedData.msgName;
  }

  if (parsedData && parsedData.message !== undefined) {
    refs.textarea.value = parsedData.message;
  }
}

// Домой
// сделать так чтобы сохраняло не только сообщение но и имя, и все в одном обьекте

// const formData = {};

// refs.form.addEventListener('input', e => {
//   // console.log(e.target.name);
//   // console.log(e.target.value);

//   formData[e.target.name] = e.target.value;
//   console.log(formData);
// });
