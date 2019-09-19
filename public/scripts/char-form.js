// Selectors =================================
let charBtn = $(".char-btn");
let submitBtn = $("#submit-btn");
let dialogueForm = $(".dialogue-form");
let dialogueName = $(".dialogue-name");
let dialogueNameInput = $(".dialogue-name-input");
let fontColorInput = $(".font-color-input");
let highlightInput = $(".highlight-input");


// Event Listeners ===========================
charBtn.click(function(e){
  let charName = e.target.innerText;
  let charColor = rgbToHex(e.target.style.color);
  let highlight = rgbToHex(e.target.style.backgroundColor);
  
  dialogueName.text(charName);
  dialogueNameInput.val(charName);
  dialogueName.css("color", charColor);
  dialogueName.css("background-color", highlight);
  fontColorInput.val(charColor);
  highlightInput.val(highlight);

  let newForm = dialogueForm.clone().removeClass("d-none");

  submitBtn.before(newForm);
});

// HELPER FUNCTIONS ============================
function componentToHex(colorStr) {
  let colorNum = Number(colorStr);
  let hex = colorNum.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  let rgbStr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")"));
  let rgbArr = rgbStr.split(", ");

  let r = rgbArr[0];
  let g = rgbArr[1];
  let b = rgbArr[2];

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
