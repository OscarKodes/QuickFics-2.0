let fontColorInput = $("#font-color-input");
let highlightInput = $("#highlight-input");
let namePreview = $("#name-preview");
let nameInput = $("#name-input");

nameInput.change(changeNameText);
fontColorInput.change(changeFontColor);
highlightInput.change(changeHighlight);

function changeNameText(){
  let name = nameInput.val();
  namePreview.text(name);
}

function changeFontColor() {
  let fontColor = fontColorInput.val();
  namePreview.css("color", fontColor);
}

function changeHighlight() {
  let highlight = highlightInput.val();
  namePreview.css("background-color", highlight);
}

changeNameText();
changeFontColor();
changeHighlight();
