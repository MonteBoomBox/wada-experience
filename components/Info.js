import m from 'mithril'
import Data from '../Data'
    
var Info = {
    id: undefined,
    oncreate: () => {
        Data.currentLocation = Data.locationData[0]
        navigator.geolocation.watchPosition(Info.showLocation, Info.errorLocation, { timeout: 2000 })
        
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", (e) => {
                
                var x = e.beta
                var y = e.gamma
                var z = e.alpha

                // document.getElementById("x").textContent = `X: ${x.toFixed()}`
                // document.getElementById("y").textContent = `Y: ${y.toFixed()}`
                // document.getElementById("z").textContent = `Z: ${z.toFixed()}`

                const location = 173

                document.querySelector(".arrow").style.transform = `rotate(${-location - (-z)}deg)`
            })
        } else {
            alert("DeviceOrientation not supported");
        }
    },
    
    showLocation: function(position) {
        alert("Geolocation working!");
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        var inLocation = false

        // document.getElementById("lat").textContent = latitude
        // document.getElementById("lon").textContent = longitude
        
        const location = Data.currentLocation
        
        var distance = Data.getDistance(latitude, longitude, location.latitude, location.longitude)
        document.getElementById("distance").textContent = distance

        if (distance < location.tolerance) {
            inLocation = true
        } else {
            inLocation = false
        }

        if (inLocation) {
            document.getElementById("location").textContent = location.name
        } else {
            document.getElementById("location").textContent = "Not in location"
        }
    },
    
    errorLocation: (position) => {
        console.log("Not working!")
    },

    view: function(vnode) {
        return m('.center.p-4', [
            m("p.title", { id: "location" }),
            m(".arrow"),
            m("p.title", { id: "distance" }),
            m(".buttons", [
                Data.locationData.map((location, index) => {
                    return m(`button.button.${Data.currentLocation == location && "is-success"}`, { onclick: () => Data.currentLocation = Data.locationData[index] }, location.name)
                })
            ])
        ])
    },

    // onbeforeremove: () => {
    //     navigator.geolocation.clearWatch(Info.id)
    // }
}
    
export default Info