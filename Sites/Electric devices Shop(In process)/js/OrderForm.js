//Get List of Items
const ListOfItems = [
    "Stand mixer silver",
    "Stand mixer red",
    "Stand mixer with extra power",
    "Stand mixer silver extreme",
    "Stand mixer red extreme"
];
const ListPlaceholder = document.querySelector('.order-form__chooseModel-list');
for (let g = 0; g != ListOfItems.length; g++) {
    let listElem = document.createElement("option");
    let l = ListOfItems[g];
    const userPick = localStorage.getItem('userPick');
    listElem.value = l;
    listElem.textContent = l;
    ListPlaceholder.append(listElem);
    if(listElem.value==userPick)
        listElem.selected = true;

}
//List of Cards
const ListOfCards = [
    "Visa",
    "Master Card"
];
const CardListPlaceholder = document.querySelector('.payment__cards-list');
for (let f = 0; f != ListOfCards.length; f++) {
    let listCard = document.createElement("option");
    let c = ListOfCards[f];
    listCard.value = c;
    listCard.textContent = c;
    CardListPlaceholder.append(listCard);
}
//Get list of districts
const ListOfDistricts = [
    "Tel-Aviv",
    "Jerusalem",
    "Haifa",
    "Beer-Sheva",
    "Eilat"
];
const DListPlaceholder = document.querySelectorAll('.districts');
DListPlaceholder.forEach((el) => {
    for (let g = 0; g != ListOfDistricts.length; g++) {
        let listElem = document.createElement("option");
        let l = ListOfDistricts[g];
        listElem.value = l;
        listElem.textContent = l;
        el.append(listElem);
    }
});
//Same Delivery address Logic
const sameAddr = document.querySelector('.delivery-address__same');
sameAddr.addEventListener('click', checkStatusSame);
function checkStatusSame() {
    const sameAddrSectionInputsNodeList = document.querySelector('.delivery-address--wrapper').querySelectorAll('input');
    const sameAddrSectionDropDownsNodeList = document.querySelector('.delivery-address--wrapper').querySelectorAll('select');
    if (sameAddr.checked) {
        sameAddrSectionDropDownsNodeList.forEach(element => element.disabled = true);
        sameAddrSectionInputsNodeList.forEach((element) => {
            element.disabled = true;
            element.value = "";
            element.style.borderBottomColor="grey";
            if(element.nextSibling)
            element.nextSibling.remove();
        });
    }
    else {
        sameAddrSectionDropDownsNodeList.forEach(element => element.disabled = false);
        sameAddrSectionInputsNodeList.forEach((element) => {
            element.disabled = false;
            element.value = "";
        });
    }
}
/////DatePicker Logic
(function DatePick() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const qntYears = 4;
    let selectYear = document.querySelectorAll('[data-date="year"]');
    let selectMonth = document.querySelectorAll('[data-date="month"]');
    let selectDay = document.querySelectorAll('[data-date="day"]');
    let currentYear = new Date().getFullYear();
    for (let i = 0; i != selectYear.length; i++) {
        AppendYear(selectYear[i], currentYear);
    }
    for (let j = 0; j != selectMonth.length; j++) {
        AppendMonth(selectMonth[j]);
    }
    for (let k = 0; k != selectDay.length; k++) {
        AppendDay(selectYear[k], selectMonth[k], selectDay[k]);
    }
    function AppendYear(yearField, currentYear) {
        for (let y = 0; y < qntYears; y++) {
            let date = new Date(currentYear);
            let yearElem = document.createElement("option");
            yearElem.value = currentYear
            yearElem.textContent = currentYear;
            yearField.append(yearElem);
            currentYear++;
        }
    }
    function AppendMonth(monthField) {
        for (let m = 0; m < 12; m++) {
            let month = monthNames[m];
            let monthElem = document.createElement("option");
            monthElem.value = m;
            monthElem.textContent = month;
            monthField.append(monthElem);
        }
    }

    function AppendDay(selectYear, selectMonth, selectDay) {
        let d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
        let day = d.getDate();

        selectYear.value = year;
        selectYear.addEventListener("change", AdjustDays);
        selectMonth.value = month;
        selectMonth.addEventListener("change", AdjustDays);

        AdjustDays();
        selectDay.value = day;

        function AdjustDays() {
            let year = selectYear.value;
            let month = parseInt(selectMonth.value) + 1;
            selectDay.innerHTML = '';

            //get the last day, so the number of days in that month
            let days = new Date(year, month, 0).getDate();

            // create the days of that month
            for (let d = 1; d <= days; d++) {
                let dayElem = document.createElement("option");
                dayElem.value = d;
                dayElem.textContent = d;
                selectDay.append(dayElem);
            }
        }
    }
})();
//serialize
function serialize(evt, form) {
    localStorage.clear();
    let currentEl = "",
                    checkboxsame = document.querySelector('.delivery-address__same'),
                    cvv=document.querySelector('#cardCVV'),
                    a, b, c, n = 0,
                    i, j, q = [];
    if (!form || form.nodeName !== "FORM") {
        return false;
    }
    for (i = form.elements.length - 1; i >= 0; i--) {
        if (form.elements[i].name === "") {
            continue;
        }
        if (form.elements[i].dataset.required == "maybe") {
            if (checkboxsame.checked) {
                continue;
            }
        }
        if (form.elements[i].dataset.required == "no") {

            continue;

        }
        //Woohooo in the end i need boolean algebra i learned in college! =)
        if (form.elements[i].dataset.createacc) {
            if (form.elements[i].dataset.createacc == "repass") {
                a = form.elements[i].value;
                aEl= form.elements[i];
                if(a!='')
                a=true;
                else
                a=false;
            }
            if (form.elements[i].dataset.createacc == "password") {
                b =  form.elements[i].value;
                bEl=form.elements[i];
                if(b!="")
                b=true;
                else
                b=false;
                
            }
            if (form.elements[i].dataset.createacc == "username") {
                c =  form.elements[i].value;
                cEl=form.elements[i];
                if(c!='')
                c=true;
                else
                c=false;

            }
            n++;
            if (n == 3) {
                if (!(a === false && b === false && c === false)) {
                    if(a===false)
                    {
                        insertItem(aEl);
                    }
                    
                    if(b===false)
                    {
                        insertItem(bEl);
                    }
                    if(c===false)
                    {
                        insertItem(cEl);
                    }
                    if (a === true && b === true && c === true) {
                     }
                 }
                
              

                



            }
        }
        if(form.elements[i].nextSibling)
        form.elements[i].nextSibling.remove();
        if(form.elements[i].dataset.createacc){}
         else if(form.elements[i].value === "" || form.elements[i].value < 1)
          {
            insertItem(form.elements[i]);
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'tel':
                    case 'email':
                    case 'hidden':
                    case 'number':
                    case 'tel':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'checkbox':
                    case 'submit':
                        // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q.push(form.elements[i].name + "=" + form.elements[i].value);
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            q.push(form.elements[i].name + "=" + form.elements[i].value);
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                //  q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                q.push(form.elements[i].name + "=" + form.elements[i].value);
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        //q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q.push(form.elements[i].name + "=" + form.elements[i].value);
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                //q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                q.push(form.elements[i].name + "=" + form.elements[i].options[j].value);
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q.push(form.elements[i].name + "=" + form.elements[i].value);
                        break;
                }
                break;
        }
    }

    if(cvv.value.length!=3)
    {  
        insertItem(cvv,1)    
    }
          
     else{
         if(cvv.nextSibling)
        cvv.nextSibling.remove();
    }
    let newq=[],newEl=[];
    q.forEach((el,myStorage,newEl)=>{
        newEl=el.split('=');
        localStorage.setItem(newEl[0],newEl[1]);
        return newEl;
    });
//return q;
newq.push(newEl);
    return q;
    
}
///
function insertItem(el,type=0) {
    console.log(el);
    console.log(el.nextSibling);
    if(el.nextSibling){
    el.nextSibling.remove();
    } 

    let requireText = document.createTextNode("Required");
    let requireTextWrap = document.createElement('div');
    if(type==1)
    {
    requireText.nodeValue="CVV MUST be 3 digits";
    }
    if(type==2)
    {
        requireText.nodeValue="Here must be 15 numbers"

    }
    if(type==3)
    {
    requireText.nodeValue="Here must be 16 numbers";
    }
    if(type==4)
    {
        requireText.nodeValue="Digits only";
    }
    if(type==5){
        requireText.nodeValue="ENTER password please";
    }
    if(type==6){
        requireText.nodeValue="Passwords must much";
    }
    if(type==7)
    {
        requireText.nodeValue="ZIP is 9 digits";
    }
    requireTextWrap.appendChild(requireText);
    requireTextWrap.style.width = "186px";
    requireTextWrap.style.height = "25px";
    requireTextWrap.style.marginBottom = "4px"
    requireTextWrap.style.marginTop = "4px"
    requireTextWrap.style.display = "block";
    requireTextWrap.style.color = "red";
    el.style.display = "flex";
    el.style.maxWidth = "190px";
    el.style.flexDirection = "column";
    let currentEl = el;
    el.parentNode.insertBefore(requireTextWrap, currentEl.nextSibling);
    return currentEl;
}
//scoped NUMBER validation
function getInputNumbersValue(input){
    return input.value.replace(/\D/g, "");
}
//Pelephone
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[type=tel]');

    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

//cvv+vcardNum

document.addEventListener("DOMContentLoaded",function(){
    let cvv=document.querySelector('#cardCVV'),
        cardNum=document.querySelector('#cardNum'),
        deliveryZip=document.querySelector('#deliveryZip'),
        billingZip=document.querySelector('#billingZip');
    let onCVVInput =function(e){
        let input=e.target,
            inputNumbersValue=getInputNumbersValue(input);
        changeColor(input,1);
            if(!inputNumbersValue||inputNumbersValue.length>3){
                insertItem(input,1)
                 return input.value="";
         }
    }
    cvv.addEventListener("input",onCVVInput);
    let onNumberInput =function(e){
        let input=e.target,
            cardType=document.querySelector('#cardType'),
            inputNumbersValue=getInputNumbersValue(input);
        if (input.id=="cardNum")
        {
            if (cardType.value=='Visa'){
           changeColor(input,3)
            }
             else{
            changeColor(input,2)
            }

        }
        else{
            changeColor(input,7);
        }

        if(!inputNumbersValue){
            console.log(input);
            insertItem(input,4)
            return input.value="";
        }
    }
    cardNum.addEventListener("input",onNumberInput);
    deliveryZip.addEventListener("input",onNumberInput);
    billingZip.addEventListener("input",onNumberInput);
});
function changeColor(el,type,len=3) {
    console.log(el);
    if(type ==1){
       len = 3;
    }
    if(type ==2){
        len = 15;
    }
    if(type ==3){
        len = 16;
    }
    if(type ==4){
        len = 9;
    }
    if(type ==7){
        len = 9;
    }
    if (el.value.length == 0) {
        el.style.borderBottomColor = "black";
        if (el.nextSibling)
            el.nextSibling.remove();
    } else if (el.value.length != len) {
        el.style.borderBottomColor = "red";
        insertItem(el, type);
        if (el.value.length>len)
        {
            insertItem(el, type);
            el.value="";
        }
    } else if (el.value.length == len) {
        el.style.borderBottomColor = "green";
        if (el.nextSibling)
            el.nextSibling.remove();
    }
}
//scoped TEXT validation
function getInputCharsValue(input){
    console.log(input.value);
    console.log(input.value.replace(/\W/g, ""));
  return input.value.replaceAll(/.*[0-9\W].*/g, "");
   // return input.value.replaceAll(/\x00-\x41]*/g, "");
}
//Text Input
function onTextInput (e){
    console.log(e);
    let input=e,
        inputCharsValue=getInputCharsValue(input);
   // changeColor(input,5);
    if(!inputCharsValue){
        console.log(input);
        return input.value="";
    }
}
//text elements
const textElems=document.querySelectorAll('input[data-text]');
textElems.forEach(elem=>elem.addEventListener('input',evt =>onTextInput(elem)));
//Password same
function checkPassword(password1,password2) {
    // If password not entered
    if (password1.value == '')
        insertItem(password1, 5);

    // If confirm password not entered
    else if (password2.value == '')
        insertItem(password2, 5);

    // If Not same return False.
    else if (password1.value != password2.value) {
        insertItem(password2, 6);
        return false;
    }

    // If same return True.
    else {
        if (password1.nextSibling)
            password1.nextSibling.remove();
        if (password2.nextSibling)
            password2.nextSibling.remove();
        return true;

    }
}
//
let password1 = document.querySelector('#pass');
let password2 = document.querySelector('#repass');
password1.addEventListener('input',evt => checkPassword(password1,password2));
password2.addEventListener('input',evt => checkPassword(password1,password2));
//BTN
const SubmitBtn = document.querySelector('.btn__inside');
let form = document.querySelector('form');
SubmitBtn.addEventListener('click',evt => serialize(evt, form));
// pattern="[a-zA-Z]"

