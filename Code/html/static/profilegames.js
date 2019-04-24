var data = null;

var xhr = new XMLHttpRequest();

function Display_Games(arr)
{
    let display = document.getElementById("game-display");
    arr.forEach(element => {
        if(element.art_url === null)
            display.innerHTML += "<div class=\"list_item, list_text\">" + "<p>" + element.title + "</p>" + "<div>";
        else
            display.innerHTML += "<div class=\"list_item\">" + "<img class= \"list_image\" src='" + element.art_url + "'>" + "<div class=\"list_text\">" + "<p>" + element.title + "<p>" + "<div>" + "<div>";
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

var xhr2 = new XMLHttpRequest();

function Display_Exchanges(arr)
{
    let display = document.getElementById("exchanges");
    arr.forEach(element => {
      display.innerHTML += "<div> Exchange id: "+ element.exchange_id + " Exchange Date: " + element.exchange_date +
      "Owner_id" + element.owner_id + "Borrower: " + element.borrower_id + "Game ID:" + element.game_id + "</div>"
    });
}

xhr2.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    let x = JSON.parse(this.responseText);
    console.log(x);
    Display_Exchanges(x);
  }
});

xhr2.open("GET", "getprofileexchanges/");

xhr2.send(data);
