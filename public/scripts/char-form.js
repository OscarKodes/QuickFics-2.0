// Selectors =================================
let charBtn = $(".char-btn");
let submitBtn = $("#submit-btn");
let dialogueForm = $(".dialogue-form");
let dialogueName = $(".dialogue-name");
let dialogueNameInput = $(".dialogue-name-input");


// Event Listeners ===========================
charBtn.click(function(e){
  dialogueName.text(e.target.innerText);
  dialogueNameInput.val(e.target.innerText);
  let newForm = dialogueForm.clone().removeClass("d-none");

  submitBtn.before(newForm);
});
