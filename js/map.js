// Initialize and add the map
function initMap() {
    // The location of San Francisco.
    var sf = {lat: 37.7749, lng: -122.4194};
    // The map, centered at San Francisco.
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: sf, disableDefaultUI: true});
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
      });
}

var latLngString;

// Create a marker.
function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    openInput(marker);
    marker.addListener('click', function(e) {
        showJournalInfo(e.latLng.toString());
    });
  }

// Open journal input.
function openInput(marker) {
    $("#journal").removeClass("hidden").addClass("visible");
    latLngString = marker.position.toString();
}

// Save information to local storage.
function saveInfo() {
    alert("Information saved!");
    var date = $("#dateArea").val();
    var title = $("#titleArea").val();
    var words = $("#wordsArea").val();
    var JSONobj = { date: date, title: title, words: words};
    var JSONstring = JSON.stringify(JSONobj);
    localStorage.setItem(latLngString, JSONstring);
    $("#journal").removeClass("visible").addClass("hidden");
    $('#dateArea').val('');
    $('#titleArea').val('');
    $('#wordsArea').val('');
}

// Show local storage information.
function showJournalInfo(inputLatLngString) {
    var getJSON = localStorage.getItem(inputLatLngString);
    var JSONobj = JSON.parse(getJSON);
    $("#displayBox").removeClass("hidden").addClass("visible");
    $("#date").text(JSONobj.date);
    $("#title").text(JSONobj.title);
    $("#words").text(JSONobj.words);
}

function hideJournalInfo() {
    $("#displayBox").removeClass("visible").addClass("hidden");
}
