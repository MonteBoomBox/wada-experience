import m from 'mithril'
import Data from '../Data'
    
var Info = {
    oninit: () => {
        Data.currentLocation = Data.locationData[0]
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