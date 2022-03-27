function search() {
  var input, filter, count, cards, i, txtValue;
  input = document.getElementById("search");
  cards = document.getElementsByClassName("card-box");
  filter = input.value.toUpperCase();
  count = document.getElementById("content").childElementCount;

  for (i = 0; i < count; i++) {
    element = cards[i];
    txtValue = element.getElementsByTagName("h5")[0].textContent;
    if (txtValue.toUpperCase().startsWith(filter)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}
