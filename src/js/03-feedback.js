import throttle from 'lodash.throttle';

const refs = {
emailEl: document.querySelector("input"),
textAreaEl: document.querySelector("textarea"),
submitButtonEl: document.querySelector("form")
};

const USER_DATA = "feedback-form-state";


refs.emailEl.addEventListener("input", throttle(onEmailInput, 500));
refs.textAreaEl.addEventListener("input", throttle(onTextareaInput, 500));
refs.submitButtonEl.addEventListener("submit", onFormSubmit);

let emailValue = "";
let textareaValue = "";

const storageObj = {
    email: emailValue,
    message: textareaValue,
};

function savingObjectToLocalStorage() {
    const userDataJSON = JSON.stringify(storageObj);
    localStorage.setItem(USER_DATA, userDataJSON);
}

// function setFeedback() {localStorage.setItem(USER_COMMENT, textareaValue);}

function onEmailInput(event) {
    emailValue = event.target.value;
    storageObj.email = emailValue;
    // console.log(emailValue);
    savingObjectToLocalStorage();
};

function onTextareaInput(event) {
    textareaValue = event.target.value;
    storageObj.message = textareaValue;
    savingObjectToLocalStorage();
    // setFeedback();
    
// console.log(textareaValue)
};

function onFormSubmit(event) {
    console.log("email:", emailValue, "message:", textareaValue);
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(USER_DATA);
    
};


function getDataFromStorage() {
    const savedUserDataString = localStorage.getItem(USER_DATA);
    const savedUserDataObj = JSON.parse(savedUserDataString);
    if(savedUserDataObj) {
        refs.textAreaEl.value = savedUserDataObj.message;
        refs.emailEl.value = savedUserDataObj.email;
    }
};

getDataFromStorage();
// console.log(storageObj);




// function onInputEmailListener() {emailEl.addEventListener("input", console.log(emailEl.value))};
// console.log(onInputEmailListener);

// emailEl.addEventListener("input", console.log(emailEl))


