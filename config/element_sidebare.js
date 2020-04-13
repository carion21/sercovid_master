class ElementSidebare {
    
    static  nouveauElement(texte, route, icone, active){

        var nouveau = {
            texte: texte,
            route: route,
            icone: icone,
            active: active
        }

        return nouveau

    }
}

module.exports = ElementSidebare