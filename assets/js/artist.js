function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");
}

function parseDates(date) {
  let result;
  let content = date.textContent;
  content = content.charAt(0).toUpperCase() + content.slice(1);
  result = content.replaceAll("-", "/");
  return result;
}

function parseLocs(loc) {
  let result;
  let content = loc.textContent;
  result = content.replaceAll("_", " ");
  result = result.replaceAll("-", ", ");
  return result;
}

function artist() {
  var members, m, tmp, album, locs, dates;
  members = document.getElementById("members");
  m = members.textContent;
  album = document.getElementById("firstAlbum");
  locs = document.getElementsByClassName("locs");
  dates = document.getElementsByClassName("dates");

  members.textContent = m.slice(0, m.length - 2);

  album.textContent = parseDates(album);

  for (let index = 0; index < dates.length; index++) {
    dates[index].textContent = parseDates(dates[index]);
  }

  for (let index = 0; index < locs.length; index++) {
    let loc = parseLocs(locs[index]);
    locs[index].textContent = capitalize(loc);
  }
}

artist();
