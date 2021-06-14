let aNumber=[],token=[];
aNumber= !!localStorage.getItem('form-data') ? JSON.parse(localStorage.getItem('form-data')) : [];
token= !!localStorage.getItem('accessTokenStored') ? JSON.parse(localStorage.getItem('accessTokenStored')) : [];
console.log(aNumber);
console.log(token);