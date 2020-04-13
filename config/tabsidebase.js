const Sidebare = require('../config/sidebare')
const ElementSidebare = require('../config/element_sidebare')



const tabsidebase = [
    ElementSidebare.nouveauElement("Tableau de bord", "/root/index", "dashboard", 0),
    ElementSidebare.nouveauElement("Gestion Individus", "/root/gestion_individus", "people", 0),
    ElementSidebare.nouveauElement("Tracking", "/root/tracking", "gps_fixed", 0),
    ElementSidebare.nouveauElement("Service Com.", "/root/service_com", "rss_feed", 0),
    ElementSidebare.nouveauElement("Service Mapping", "/root/service_mapping", "place", 0)
]

module.exports = tabsidebase