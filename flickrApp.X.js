'use strict'

document.getElementById("getdata").addEventListener("click", makeAJAXRequest)

function makeAJAXRequest () {
    
    var request = new XMLHttpRequest();
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14d6c693b3921164ffa803b24ba7fda2&format=json&nojsoncallback=?&text=";
     
    request.addEventListener("load", writeResponse);
    
    request.open("GET", url + document.getElementById("query").value);
    request.send();
}

function writeResponse() {
    var response = JSON.parse(this.responseText);
    var htmlString = "";
    
    for (var i = 0; i < response.photos.photo.length; i++) {
        htmlString += "<p> <a href = https://farm" + response.photos.photo[i].farm + ".staticflickr.com/" + response.photos.photo[i].server + "/" + response.photos.photo[i].id + "_" + response.photos.photo[i].secret +".jpg style = 'text-decoration: none; color: black;'>" + response.photos.photo[i].title + " </a> </p>";
    }
    document.getElementById("results").innerHTML = htmlString;
    
}