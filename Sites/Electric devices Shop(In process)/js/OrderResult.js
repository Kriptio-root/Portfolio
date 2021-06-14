let table=document.querySelector(".result__table");
for(let i=0;i<localStorage.length;i++){
    let newContent=document.createTextNode(i+1);
    createNewTr(table);
    createNewTd(table,newContent);
    newContent=document.createTextNode(localStorage.key(i));
    createNewTd(table,newContent);
    newContent=document.createTextNode(localStorage.getItem(localStorage.key(i)));
    createNewTd(table,newContent);
}
clearLocalStorage();
function createNewTr(table){
    let newTr=document.createElement("tr");
    table.appendChild(newTr);
    return table;
};
function createNewTd(table,newContent){
    let newTd=document.createElement("td");
    newTd.classList.add("result__data-cell");
    newTd.appendChild(newContent);
    table.appendChild(newTd);
    return table;
};
function clearLocalStorage(){
localStorage.clear();
};