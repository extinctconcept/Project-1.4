var data = null;

var xhr = new XMLHttpRequest();


function Display_Games(arr)
{
    let display = document.getElementById("game-display");
    display.innerHTML = "<p>TOP GAMES!!!!!!:</p>";
    arr.forEach(element => {
        if(element.cover === undefined)
            display.innerHTML += "<p>" + element.name + "<p>";
        else
            display.innerHTML += "<p>" + "<img src='" + element.cover.url + "'>" + element.name + " " + "<p>";
    });
}

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    let x = JSON.parse(this.responseText);
    console.log(x);
    Display_Games(x);
  }
});

xhr.open("GET", "games/");

xhr.send(data);
