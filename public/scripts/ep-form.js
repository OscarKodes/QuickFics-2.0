// Selectors =================================
let charBtn = $(".char-btn");
let submitBtn = $("#submit-btn");
let dialogueForm = $(".dialogue-form");
let dialogueNameTemplate = $("#dialogue-name-template");
let dialogueNameTemplateInput = $("#dialogue-name-template-input");
let fontColorTemplateInput = $("#font-color-template-input");
let highlightTemplateInput = $("#highlight-template-input");
let bgColorInput = $("#bg-color");
let dialogueContainer = $("#dialogue-container");
let instructions = $("#instructions");

// Event Listener for Character Buttons ===========================
charBtn.click(function(e){
  instructions.addClass("d-none");

  let charName = e.target.innerText;
  let charColor = rgbToHex(e.target.style.color);
  let highlight = rgbToHex(e.target.style.backgroundColor);

  dialogueNameTemplate.text(charName);
  dialogueNameTemplateInput.val(charName);
  dialogueNameTemplate.css("color", charColor);
  dialogueNameTemplate.css("background-color", highlight);
  fontColorTemplateInput.val(charColor);
  highlightTemplateInput.val(highlight);

  let newForm = dialogueForm.clone().removeClass("d-none").addClass("newDialogue");

  dialogueContainer.append(newForm);
  window.scrollTo(0,document.body.scrollHeight);

  // Event Listener for Cancel Dialogue Button
  // Placed inside another Listener because it needs to be done each time
  // --- Instructions:
  /// Target all .cancel-btn with DOM
  /// Target all .newDialogue with DOM
  // loop thru all .cancel-btn adding listeners to each
  // based on which index remove specific newDialogue with .remove()
});



// Event Listener for Background Color ==========================
bgColorInput.change(changeColor);


// HELPER FUNCTIONS ===============================================

// BG COLOR FUNCTION
// Set up background color based on input
function changeColor() {
  let chosenColor = bgColorInput.val();
  $("body").css("background-color", chosenColor);
};

changeColor(); // sets up page based on pre-settings

// RBG TO HEX FUNCTIONS
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
