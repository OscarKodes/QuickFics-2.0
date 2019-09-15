// Selectors =================================
let addBtn = $("#add-btn");
let submitBtn = $("#submit-btn");
let dialogueForm = $(".dialogue-form");



// Event Listeners ===========================
addBtn.click(function(){

  let newForm = dialogueForm.clone().removeClass("d-none");
  submitBtn.before(newForm);
});
