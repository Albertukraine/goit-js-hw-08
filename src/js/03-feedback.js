import throttle from 'lodash.throttle';

const refs = {
  emailEl: document.querySelector('input'),
  textAreaEl: document.querySelector('textarea'),
  formEl: document.querySelector('.feedback-form'),
};

// refs.textAreaEl.addEventListener('input', throttle(onTextareaInput, 500));
refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onInput, 500));

const USER_DATA = 'feedback-form-state';

const storageObj = {};

// Сохраняет в локальное хранилище браузера из обьекта кода, вызывается во время инпута в поля формы
function savingObjectToLocalStorage() {
  const userDataJSON = JSON.stringify(storageObj);
  localStorage.setItem(USER_DATA, userDataJSON);
}

// function setFeedback() {localStorage.setItem(USER_COMMENT, textareaValue);}
// записывыет в обьект результат события при вводе  в поле почта
function onInput(event) {
  dataToObject();
  event.target.type === 'email'
    ? (storageObj.email = event.target.value)
    : (storageObj.message = event.target.value);
  savingObjectToLocalStorage();
}

//  записывает в обьект при вводе текста в поле текст

function clearStorageAndFields() {
  refs.formEl.reset();
  localStorage.removeItem(USER_DATA);
}

function fillFormFields() {
  const savedUserDataObj = JSON.parse(localStorage.getItem(USER_DATA));
  if (savedUserDataObj) {
    refs.textAreaEl.value = savedUserDataObj.message;
    refs.emailEl.value = savedUserDataObj.email;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (refs.emailEl.value === '' || refs.textAreaEl.value === '') {
    return alert('Please check that both fields are filled');
  }
  dataToObject();
  console.log(storageObj);
  clearStorageAndFields();
}

// запись данных из локального хранилища как значение обьекта кода
function dataToObject() {
  storageObj.email = refs.emailEl.value;
  storageObj.message = refs.textAreaEl.value;
}
fillFormFields();


