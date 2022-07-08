var Data = {
    locationData: [],

    rotation: 0,
    latitude: 0,
    longitude: 0,

    inLocation: false,
    contentURL: "",

    setupGyro: function(showText) {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", (e) => {
                
            var x = e.beta
            var y = e.gamma
            var z = e.alpha

            if (showText) {
                // document.getElementById("x").textContent = `X: ${x.toFixed()}`
                // document.getElementById("y").textContent = `Y: ${y.toFixed()}`
                Data.rotation = z.toFixed()
            }

            const rotation = Data.currentLocation.degrees

            document.querySelector(".arrow").style.transform = `rotate(${-rotation - (-z.toFixed())}deg)`
        })
        } else {
            console.log("DeviceOrientation not supported");
        }
    },

    setupGeolocation: function(showText) {
        if (showText) {
            navigator.geolocation.watchPosition(Data.showLocationText, Data.errorLocation, { timeout: 2000 })
            return
        }

        navigator.geolocation.watchPosition(Data.showLocation, Data.errorLocation, { timeout: 2000 })
    },

    showLocation: function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        
        const location = Data.currentLocation
        
        var distance = Data.getDistance(latitude, longitude, location.latitude, location.longitude)
        document.getElementById("distance").textContent = distance

        if (distance < location.tolerance) {
            Data.inLocation = true
        } else {
            Data.inLocation = false
        }
        
        if (Data.inLocation) {
            document.getElementById("location").textContent = location.name
            document.querySelector("iframe").src = `https://player.vimeo.com/video/${Data.currentLocation.content[0]}`
        } else {
            document.getElementById("location").textContent = "Not in location"
            document.querySelector("iframe").src = ""
        }
    },

    showLocationText: function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        document.getElementById("lat").textContent = `Lat: ${latitude}`
        document.getElementById("lon").textContent = `Lon: ${longitude}`
        
        const location = Data.currentLocation
        
        var distance = Data.getDistance(latitude, longitude, location.latitude, location.longitude)
        document.getElementById("distance").textContent = distance

        if (distance < location.tolerance) {
            Data.inLocation = true
        } else {
            Data.inLocation = false
        }

        if (Data.inLocation) {
            document.getElementById("location").textContent = location.name
            document.querySelector("iframe").src = `https://player.vimeo.com/video/${Data.currentLocation.content[0]}`
        } else {
            document.getElementById("location").textContent = "Not in location"
            document.querySelector("iframe").src = ""
        }
    },
    
    errorLocation: (position) => {
        console.log("Not working!")
    },

    getDistance: function(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1609.34
        return dist;
    },

    currentLocation: {}
}

export default Data