import UI from "./config/ui.config.js";
import{validate} from "./helpers/validate.js";
import {showInputError} from "./views/form.js";

const {form,inputEmail,inputPassword,inputUsername,inputPasswordConfirm}=UI;
const inputs=[inputEmail,inputPassword,inputUsername,inputPasswordConfirm];
localStorage.clear();
//Events
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    onSubmit();
} )
//Handlers
function onSubmit(){
   const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
       if(isValidInput&&inputs[1].value===inputs[3].value){
           return isValidInput;
       }
       else     if (!isValidInput){
           alert(showInputError(el));
       }
       else {
           alert('Password and password confirmation should much!')
       }

   });
    if (isValidForm) {
// var aNumber = !!localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : [];//Проверяем что локала нет если есть используем тот что есть
        const formStore = document.querySelector('.contactus');
        aNumber = formStore.addEventListener('submit', e => {
            //  e.preventDefault();
            // Создаем объект с данными из всех инпутов формы
            // Важно, чтобы у инпутов был атрибут name="some name"
            const inputsData = new FormData(e.target);
            //Вот тут не уверен, но недавно так делал
            // создаем пустой объект
            const objForStorage = {};
            // Проходимся по ключам inputsData, добавляя такие же ключи в наш объект,
            // назначая им соответствующие значения
            Array.from(inputsData.keys()).forEach(key => {
                objForStorage[key] = inputsData.get(key);
            })
            console.log(objForStorage);
            // кладем наш объект в виде строки в локал сторэдж.
            window.localStorage.setItem('form-data', JSON.stringify(objForStorage));
        })
    }
}

// var aNumber = !!localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : [];//Проверяем что локала нет если есть используем тот что есть
//     const formStore = document.querySelector('.contactus');
//     aNumber = formStore.addEventListener('submit', e => {
//         //  e.preventDefault();
//         // Создаем объект с данными из всех инпутов формы
//         // Важно, чтобы у инпутов был атрибут name="some name"
//         const inputsData = new FormData(e.target);
//         //Вот тут не уверен, но недавно так делал
//         // создаем пустой объект
//         const objForStorage = {};
//         // Проходимся по ключам inputsData, добавляя такие же ключи в наш объект,
//         // назначая им соответствующие значения
//         Array.from(inputsData.keys()).forEach(key => {
//             objForStorage[key] = inputsData.get(key);
//         })
//         console.log(objForStorage);
//         // кладем наш объект в виде строки в локал сторэдж.
//         window.localStorage.setItem('form-data', JSON.stringify(objForStorage));
//     })

