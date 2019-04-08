var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api-v3.igdb.com/games/?fields=name%2Ccover.url%2Cgenres.name");
xhr.setRequestHeader("cookie", "__cfduid=dbfedfdd2af3b8fd49a4dc01195a5a6841554437156");
xhr.setRequestHeader("user-key", "b75f7df0294c1201e3e195ee8a453ca9");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);

