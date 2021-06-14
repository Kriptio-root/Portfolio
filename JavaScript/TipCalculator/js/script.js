var select = document.getElementById("percent");

for (var num = 5; num <= 50; num = num + 5) {
  var option = document.createElement("option");
  option.text = `${num}%`;
  option.value = num;

  select.add(option);
  newFunction(num);

}

//func for adding option selected
function newFunction(num) {
  if (num == 10) {
    option.selected = num;
  }
}

//reset function -- Refresh the page
function reset() {
  location.reload();
}

//calculate the tip by %
function Calculator() {
  let TotalSum;
  var amount = document.getElementById("MoneyToPay").value;
  var percent = document.getElementById("percent").value;
  var sum = amount * (percent / 100);
  console.log(sum);
  TotalSum = Number(amount) + Number(sum);
  document.getElementById("tipcal").value = sum;
  document.getElementById("sum").value = TotalSum;
}