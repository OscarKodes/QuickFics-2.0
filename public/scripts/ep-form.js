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
let createTextMarker = $("#create-text-marker");
let premadeDialogue = $(".premade-dialogue");
let premadeTextMarkerBtns = $(".move-text-marker-btn");
let bottomMarkerBtn = $("#bottom-marker-btn");

// Event Listener for Character Buttons ===========================
charBtn.click(function(e){

  let charName = e.target.innerText;
  let charColor = rgbToHex(e.target.style.color);
  let highlight = rgbToHex(e.target.style.backgroundColor);

  dialogueNameTemplate.text(charName);
  dialogueNameTemplateInput.val(charName);
  dialogueNameTemplate.css("color", charColor);
  dialogueNameTemplate.css("background-color", highlight);
  fontColorTemplateInput.val(charColor);
  highlightTemplateInput.val(highlight);

  let newForm = dialogueForm.clone().removeClass("d-none");

  // Add cancel listener to newForm ===============
  newForm
    .children(".dialogue-form-row")
    .children(".dialogue-textarea")
    .children(".cancel-btn-container")
    .children(".cancel-btn")
    .click(function(){
      newForm.remove();
    });

  // Add text Marker Btn listener to newForm ===============
  let currentMarkerBtn = newForm
    .children(".marker-btn-container")
    .children(".move-text-marker-btn");

  currentMarkerBtn.click(function(){
      newForm.before(createTextMarker);
      $(".move-text-marker-btn").show();
      bottomMarkerBtn.show();
      currentMarkerBtn.hide();
    });

  // Insert the newForm before the text marker
  createTextMarker.before(newForm);

  // Scroll to the bottom
  window.scrollTo(0,document.body.scrollHeight);

  // focus on the text area in newForm
  newForm
    .children(".dialogue-form-row")
    .children(".dialogue-textarea")
    .children("textarea")
    .focus();
});

// Add Listener to Cancel Button for Edit Page's Premade Dialogues=====
premadeDialogue
  .click(function(){
    let entireDialogue = $("#" + this.id).parent().parent().parent().parent();
    entireDialogue.remove();
  });

// Add Listener to Premade marker buttons for Edit Page's Premade Dialogues=====
premadeTextMarkerBtns
  .click(function(){
    let currentMarkerBtn = $("#" + this.id);
    let entireDialogue = currentMarkerBtn.parent().parent();
    entireDialogue.before(createTextMarker);
    $(".move-text-marker-btn").show();
    bottomMarkerBtn.show();
    currentMarkerBtn.hide();
  });

// Add Listener to Bottom marker button=========================================
bottomMarkerBtn
  .click(function(){
    let bottomBtnContainer = bottomMarkerBtn.parent();
    bottomBtnContainer.before(createTextMarker);
    $(".move-text-marker-btn").show();
    bottomMarkerBtn.hide();
  });

// Hide bottomMarkerBtn right from the beginning ==========================
bottomMarkerBtn.hide();


// Event Listener for Background Color ==========================
bgColorInput.change(changeColor);


// HELPER FUNCTIONS ===============================================

// BG COLOR FUNCTION
// Set up background color based on input
function changeColor() {
  let chosenColor = bgColorInput.val();
  $(".master-container").css("background-color", chosenColor);
  // $(".bottom-spacer").css("background-color", chosenColor);
  if($(window).width() < 1080) {
    $("body").css("background-color", chosenColor);
  };
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
