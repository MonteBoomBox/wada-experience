import axios from 'axios'
import m from 'mithril'
import Data from '../Data'
    
var Backend = {
    oninit: () => {
        
        // axios.get("http://localhost:8888/heritage/jsonapi/node/destination").then((res) => {
        //     var locations = res.data.data.relationships.field_locations.data

        //     locations.map((location) => {
        //         axios.get(`http://localhost:8888/heritage/jsonapi/node/destination/${location.id}`).then((res) => {
        //             var data = res.data.data.attributes
        //             var loc = {}
        //             loc.name = data.title
        //             loc.latitude = data.field_latitude
        //             loc.longitude = data.field_longitude
        //             loc.tolerance = data.field_tolerance
        //             loc.direction = data.field_rotation

        //             Data.locationData.push(loc)
        //         })
        //     })
            
        //     console.table(Data.locationData)
        // })

        m.request("http://localhost:8888/heritage/jsonapi/node/destination", { headers: { "Access-Control-Allow-Origin:": "*" } }).then((res) => {
            var locations = res.data.relationships.field_locations.data

            locations.map((location) => {
                m.request(`http://localhost:8888/heritage/jsonapi/node/destination/${location.id}`, { headers: { "Access-Control-Allow-Origin:": "*" } }).then((res) => {
                    var data = res.data.attributes
                    var loc = {}
                    loc.name = data.title
                    loc.latitude = data.field_latitude
                    loc.longitude = data.field_longitude
                    loc.tolerance = data.field_tolerance
                    loc.direction = data.field_rotation

                    Data.locationData.push(loc)
                })
            })
        })

        Data.currentLocation = Data.locationData[0]
    },

    // oncreate: () => {
    //     Data.setupGyro(true)
    //     Data.setupGeolocation(true)
    // },

    view: function(vnode) {
        return m(".center.p-4", [
            m('p.title#lat', Data.latitude),
            m('p.title#lon', Data.longitude),
            m('p.title#z', Data.rotation),
            m('.arrow')
        ])
    }
}
    
export default Backend