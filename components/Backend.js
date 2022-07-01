import axios from 'axios'
import m from 'mithril'
import Data from '../Data'
    
var Backend = {
    oninit: () => {
        
        m.request("https://heritage-backoffice.herokuapp.com/api/destinations", {
            method: "GET",
            headers: { "heritage-token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6Imhlcml0YWdlLTdmNWIyIiwiaWF0IjoxNjU2NjAzMzM2LCJleHAiOjE2NTc4MTI5MzYsInVzZXJfaWQiOiIxZ3dWQkRVSDBZUW9hdlZWTUZLYnBzMzNqSUwyIiwiZW1haWwiOiJtYW5hc0B0ZXN0LmNvbSIsInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCIsInZlcmlmaWVkIjpmYWxzZSwiZGlzcGxheV9uYW1lIjoiTWFuYXMifQ.egeI30l_KQIyHCCmgmYFFLfTeHH_1XDIMkJdqU5yONOYS9hiug_wl3jupLwmQXNu2NrEe_G-zYs_3xYWr65C1AIeQbrl6Ky36oEF46XMyUsGcQVMbXx4PE-p4Prdiu1TM2t826_N1-DS5M5JDLxKD6oqqr-cUoKy6kAQ7BcU_ukYcV1lVIhGx5oyJeRBtD357CTBDWY_4OVZzQzHkJOA04ZTEGhvV3xHVrVvywXz2ZOc_zFRj2mKcbthhqmSMkRTmIYQI1IPpQSD_jLE16B-ahJnUAzVNS376VwFlcOmjnE7yZN7H2lJ2E_zbeo6Mkv7RazMTlE0_JtrrCj43-VEFQ" }
        }).then((res) => {
            console.log(res)
            Data.locationData = res[0].locations
            Data.currentLocation = Data.locationData[0]
        })

        // axios.get("http://localhost:8000/destinations").then((res) => {
        //     // Data.locationData = res.data.data
        //     var locations = res.data.data[0].relationships.field_locations.data

        //     var locs = [1, 3]

        //     locations.map((location) => {
        //         axios.get(`http://localhost:8000/destination/${location.id}`).then((response) => {
        //             var data = response.data.data.attributes
        //             var loc = {}
        //             loc.name = data.title
        //             loc.latitude = data.field_latitude
        //             loc.longitude = data.field_longitude
        //             loc.tolerance = data.field_tolerance
        //             loc.direction = data.field_rotation

        //             locs.push(loc)
        //         })
        //     })

        //     console.log(locs)
        //     Data.currentLocation = Data.locationData[1]
        //     console.log(Data.currentLocation)
        // })
    },
    view: function(vnode) {
        return m(".center.p-4", [
            m('p.title#lat', Data.currentLocation.name),
            m('p.title#lon', Data.currentLocation.latitude),
            m('p.title#lon', Data.currentLocation.longitude),
            m('p.title#z', Data.currentLocation.tolerance),
            m('p.title#z', Data.currentLocation.direction),
            m('.arrow')
        ])
    }
}
    
export default Backend