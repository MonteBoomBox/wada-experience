import m from 'mithril'
import Data from '../Data'
    
var Info = {
    oninit: () => {
        
        m.request("https://heritage-backoffice.herokuapp.com/api/destinations", {
            method: "GET",
            headers: { "heritage-token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6Imhlcml0YWdlLTdmNWIyIiwiaWF0IjoxNjU2NjAzMzM2LCJleHAiOjE2NTc4MTI5MzYsInVzZXJfaWQiOiIxZ3dWQkRVSDBZUW9hdlZWTUZLYnBzMzNqSUwyIiwiZW1haWwiOiJtYW5hc0B0ZXN0LmNvbSIsInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCIsInZlcmlmaWVkIjpmYWxzZSwiZGlzcGxheV9uYW1lIjoiTWFuYXMifQ.egeI30l_KQIyHCCmgmYFFLfTeHH_1XDIMkJdqU5yONOYS9hiug_wl3jupLwmQXNu2NrEe_G-zYs_3xYWr65C1AIeQbrl6Ky36oEF46XMyUsGcQVMbXx4PE-p4Prdiu1TM2t826_N1-DS5M5JDLxKD6oqqr-cUoKy6kAQ7BcU_ukYcV1lVIhGx5oyJeRBtD357CTBDWY_4OVZzQzHkJOA04ZTEGhvV3xHVrVvywXz2ZOc_zFRj2mKcbthhqmSMkRTmIYQI1IPpQSD_jLE16B-ahJnUAzVNS376VwFlcOmjnE7yZN7H2lJ2E_zbeo6Mkv7RazMTlE0_JtrrCj43-VEFQ" }
        }).then((res) => {
            console.log(res)
            Data.locationData = res[0].locations
            Data.currentLocation = Data.locationData[0]
            console.log(Data.currentLocation);
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