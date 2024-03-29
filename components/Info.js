import m from 'mithril'
import Data from '../Data'
    
var Info = {
    oninit: () => {
        m.request("https://heritage-backoffice.herokuapp.com/api/destinations/single/6305a5acbc325ce681dbdcd3", {
            method: "GET",
        }).then((res) => {
            console.log(res)
            Data.locationData = res.locations
            Data.currentLocation = Data.locationData[0]
            console.log(Data.currentLocation);
        }).catch((err) => {
            console.log(err)
        })

        // Data.currentLocation = Data.locationData[1]
    },
    
    oncreate: () => {
        Data.setupGeolocation(false)
        Data.setupGyro(false)
    },

    view: function(vnode) {
        return m('.center.p-4', [
            m("p.title", { id: "location" }),
            m(".arrow"),
            m("p.title", { id: "distance" }),
            m("iframe", { src: "" }),
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