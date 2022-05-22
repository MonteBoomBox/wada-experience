import m from "mithril"
import Info from "./components/Info"

m.route(document.body, "/info", {
    "/info": {
        render: function() {
            return m(Info)
        }
    }
})