var data = null;

var xhr = new XMLHttpRequest();


function Display_Games(arr)
{
    let display = document.getElementById("game-display");
    arr.forEach(element => {
        if(element.art_url === null)
            display.innerHTML += "<div class=\"list_item, list_text\">" + element.title + "<div>";
        else
            display.innerHTML += "<div class=\"list_item\">" + "<img class= \"list_image\" src='" + element.art_url + "'>" + "<div class=\"list_text\">" + element.title + "<div>" + "<div>";
    });
}

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    let x = JSON.parse(this.responseText);
    console.log(x);
    Display_Games(x);
  }
});

xhr.open("GET", "getprofilegames/");

xhr.send(data);
