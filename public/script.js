function onOff() {
  document.querySelector("#modal").classList.toggle("hide");

  document.querySelector("body").classList.toggle("hideScroll");
  document.querySelector("#modal").classList.toggle("addScroll");
}

document.querySelector("buttons.fat2").addEventListener("click", onOff);

function checkFields(event) {
  const valueToCheck = ["title", "category", "image", "description", "link"];

  const isEmpty = valueToCheck.find(function(value) {
    const checkIfString = typeof event.target[value].value === "string";
    const checkIfIsEmpty = !event.target[value].value.trim();

    if (checkIfString && checkIfIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert("Por favor, preencha todos os campos");
  }
}
