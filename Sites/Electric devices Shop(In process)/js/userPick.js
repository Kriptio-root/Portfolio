let itemList=document.querySelectorAll('.item');
function onItemClick(element) {
    let userPick = element.dataset.item;
    console.log(userPick);
    localStorage.setItem('userPick', userPick);
}

itemList.forEach(element => element.addEventListener('click',evt =>onItemClick(element)));