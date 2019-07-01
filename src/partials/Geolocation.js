let pos = {};
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;
    });
} else {
    alert("Can't get location");
     pos.lat = 12;
     pos.lng = 12;
}

export default pos;
