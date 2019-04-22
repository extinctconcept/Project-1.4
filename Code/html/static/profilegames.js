var data = null;

var xhr = new XMLHttpRequest();


function Display_Games(arr)
{
    let display = document.getElementById("game-display");
    display.innerHTML = "<p>Owned Games:</p>";
    arr.forEach(element => {
        if(element.cover === undefined)
            display.innerHTML += "<div class=\"list_item, list_text\">" + element.name + "<div>";
        else
            display.innerHTML += "<div class=\"list_item\">" + "<img class= \"list_image\" src='" + element.cover.url + "'>" + "<div class=\"list_text\">" + element.name + "<div>" + "<div>";
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
