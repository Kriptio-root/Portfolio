var i = 0;
var j = 0;
var k = 0;
var g = 0;
var arg = [];
var item = 0;
var clicke = 0;
/////////////////DefineItem//////////
function DefineItem(event, ui) {
  item = $(ui.item);
  console.log(item);
  return item;
};
//////////////////////////////////////
//////////// DropOnClick///////////
function DropOnClick(item) {
       if (g < 1) {
    console.log('passed');
    g++;
       }
       else{
        console.log('notpassed');
       
  let parentID = $(item).parent().attr('id'); //sortable1 or sortable2
    console.log(parentID);
  if (parentID == 'todo')
  {
    $("#done").append(item);
  }
  else  if (parentID == 'done')
  {
    $("#todo").append(item);
  }
}
};
//////////////////////AddNewTask///////////////
function AddNewTask(butn) {
  console.log('hello');
  i = 0;
  j = 0;
  while (!(($("#do" + i).siblings('label').children('span').text()) === "")) {
    j++;
    i++;
  }
  var newtext = $(".addTask__input").val();
  $(".addTask__input").val('');
  var newTask = ($(butn).parent().parent().nextAll().eq(1).closest('.todo__item').clone(true, true));
  $(newTask).removeClass('hidden');
  $(newTask).children('input').attr("id", "do" + j);
  $(newTask).children('label').attr("for", "do" + j);
  $(newTask).children('label').children('span').text(newtext);
  $(newTask).appendTo("#todo");
};
//////////////ChangeClass////////////////
function ChangeClass(myitem) {
  clicke = 0;
  console.log(myitem);
  if (($(myitem).children('.todo__input').hasClass("undone")) && (($(myitem).parent().attr('id'))) == 'done') {
    $(myitem).children('.todo__input').removeClass('undone');
    $(myitem).children('.todo__input').addClass('done');
    $(myitem).children('.todo__input').trigger("click");
  } else {
    $(myitem).children('.todo__input').removeClass('done');
    $(myitem).children('.todo__input').addClass('undone');
    $('#todo').children('.todo__item').children('.todo__input').attr('checked', false);
  }
};
////////////////////////////////////////////
$(function () {
  $("#done, #todo").sortable({
    connectWith: ".todo__list",
    appendTo: document.body,
    items: "> div",
    remove: function (event, ui) {
      DefineItem(event, ui);
      ChangeClass(item);
    },
  });
});
/////////////
////////add
$(".addTask__btn").click(function () {
  AddNewTask(this);
});
////delete
$(".delete-btn").click(function () {
  $(this).closest('.todo__item').remove();
});
////click
$('.todo__item').click(function () {
  g=0;
  MYLOOP:do {
g = g + 1;
if (g > 1) break MYLOOP;
continue MYLOOP;
} while (0)
  if (clicke < 1) {
    //  console.log(clicke)
    clicke++;
  } else {
    clicke = 0;
    item = this;
    console.log(this);
    console.log(item);
    if (item === this) {
      console.log('true');
    }
    DropOnClick(item);
  }
});