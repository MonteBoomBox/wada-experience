import m from "mithril"
import Backend from "./components/Backend"
import Info from "./components/Info"

m.route(document.body, "/info", {
    "/info": {
        render: function() {
            return m(Info)
        }
    },
    "/backend": {
        render: function() {
            return m(Backend)
        }
    },
})