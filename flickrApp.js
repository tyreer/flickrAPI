'use strict'

document.getElementById("getdata").addEventListener("click", makeAJAXRequest);

//Add event listener for enter key
document.getElementById("query").addEventListener("keyup", function (e) {
        if (e.keyCode === 13) { 
          document.getElementById("getdata").click();
        }
    })

var resultsArray = [];

function makeAJAXRequest () {
    
    var request = new XMLHttpRequest();
    var url = "//api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14d6c693b3921164ffa803b24ba7fda2&format=json&nojsoncallback=?&text=";
     
    request.addEventListener("load", writeResponse);
    
    request.open("GET", url + document.getElementById("query").value);
    request.send();
}

function makeAJAX2Request () {
    
    var request2 = new XMLHttpRequest();
    var url = "//api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=14d6c693b3921164ffa803b24ba7fda2&format=json&nojsoncallback=?&user_id=";
    
    url += resultsArray.photos.photo[this.id].owner;
    
    var htmlString2 = "";
    
    htmlString2 +=  "<img src = https://farm" + resultsArray.photos.photo[this.id].farm + ".staticflickr.com/" + resultsArray.photos.photo[this.id].server + "/" + resultsArray.photos.photo[this.id].id + "_" + resultsArray.photos.photo[this.id].secret +".jpg>";
    
    document.getElementById("results").innerHTML = htmlString2;
     
    request2.addEventListener("load", writeSecondStage);
    
    request2.open("GET", url);
    request2.send();
}

function writeSecondStage() {
    var response2 = JSON.parse(this.responseText);

    var htmlString3 = document.getElementById("results").innerHTML;
    
    htmlString3 +=  "<h3>Courtesy of: " + response2.person.realname._content + "</h3> <p> <a href =" + response2.person.photosurl._content + "> Check out more </a> </p>";
    
    document.getElementById("results").innerHTML = htmlString3;
}

function writeResponse() {
    resultsArray = JSON.parse(this.responseText);
    var htmlString = "";
    
    for (var i = 0; i < resultsArray.photos.photo.length; i++) {
        htmlString += "<div class='photo-container'> <div class='photo'> <img src = https://farm" + resultsArray.photos.photo[i].farm + ".staticflickr.com/" + resultsArray.photos.photo[i].server + "/" + resultsArray.photos.photo[i].id + "_" + resultsArray.photos.photo[i].secret +".jpg> <div class='title_overlay'> <p>" + resultsArray.photos.photo[i].title + "</p> </div> </div> </div>"
        }
    
    document.getElementById("results").innerHTML = htmlString;
    
     for (var j = 0; j < resultsArray.photos.photo.length; j++) {
        document.getElementById(j).addEventListener("click", makeAJAX2Request);
    }
}