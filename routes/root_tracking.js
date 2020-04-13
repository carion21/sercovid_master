var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')

const resultatVide = require('../config/message').resultatVide()

const Individu = require('../models/Individu')
const PositionIndividu = require('../models/PositionIndividu')

const geolib = require('geolib')

/* GET home page. */
router.get('/', function (req, res, next) {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/tracking/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

router.get('/:trackercible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible

    switch (trackercible) {
        case 'individus':
            res.render(
                'root/tracking/individus_tracking', {
                    tabside: tabside,
                    idpage: idpage
                }
            );
            break;

        case 'zones':
            res.render(
                'root/tracking/zones_tracking', {
                    tabside: tabside,
                    idpage: idpage
                }
            );
            break;

        default:
            res.redirect('/root/tracking')
            break;
    }

})


router.get('/:trackercible/newcible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible

    switch (trackercible) {
        case 'individus':
            var type = 1
            res.render(
                'root/tracking/new_cible_tracking', {
                    tabside: tabside,
                    idpage: idpage,
                    typeTracking: type
                }
            );
            break;

        case 'zones':
            var type = 2
            res.render(
                'root/tracking/new_cible_tracking', {
                    tabside: tabside,
                    idpage: idpage,
                    typeTracking: type
                }
            );
            break;

        default:
            res.redirect('/root/tracking')
            break;
    }

})

router.post('/:trackercible/newcible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible

    var content = req.body

    switch (trackercible) {
        case 'individus':

            var identifiant = content.identifiant
            var telephone = content.telephone

            console.log(content)

            if ((identifiant !== "" && telephone !== "") || (identifiant === "" && telephone !== "") || (identifiant !== "" && telephone === "")) {
                console.log(true)

                /**
                 * AJOUTER LA VERIFICATION POUR LE TELEPHONE
                 */

                if (identifiant !== "" && telephone !== "") {
                    atcas = 1
                }
                if (identifiant === "" && telephone !== "") {
                    atcas = 2
                }
                if (identifiant !== "" && telephone === "") {
                    atcas = 3
                }

                switch (atcas) {
                    case 1:
                        //code ici ajouter la verification pour le telephone
                        Individu.findByTwoField('code_individu', identifiant, 'telephone', telephone, (futindividu) => {
                            if (futindividu !== null && futindividu.length != 0) {
                                var individu = futindividu[0]
                                if (individu.estCible == 0) {
                                    Individu.replaceByOneField(individu.codeIndividu, 'est_cible', 1, (msg) => {
                                        console.log(msg)
                                    })
                                    res.redirect('/root/tracking/' + trackercible + '/allcible')
                                } else {
                                    var error = "Cet individu est déja ciblé"
                                    console.log(error)

                                    var type = 1
                                    res.render(
                                        'root/tracking/new_cible_tracking', {
                                            tabside: tabside,
                                            idpage: idpage,
                                            typeTracking: type,
                                            error: error,
                                            excontent: content
                                        }
                                    );
                                }
                            } else {
                                var error = "Individu inexistant"
                                console.log(error)

                                var type = 1
                                res.render(
                                    'root/tracking/new_cible_tracking', {
                                        tabside: tabside,
                                        idpage: idpage,
                                        typeTracking: type,
                                        error: error,
                                        excontent: content
                                    }
                                );
                            }
                        })
                        break;
                    case 2:
                        //code ici
                        Individu.findByOneField('telephone', telephone, (futindividu) => {
                            if (futindividu !== null && futindividu.length != 0) {
                                var individu = futindividu[0]
                                if (individu.estCible == 0) {
                                    Individu.replaceByOneField(individu.codeIndividu, 'est_cible', 1, (msg) => {
                                        console.log(msg)
                                    })
                                    res.redirect('/root/tracking/' + trackercible + '/allcible')
                                } else {
                                    var error = "Cet individu est déja ciblé"
                                    console.log(error)

                                    var type = 1
                                    res.render(
                                        'root/tracking/new_cible_tracking', {
                                            tabside: tabside,
                                            idpage: idpage,
                                            typeTracking: type,
                                            error: error,
                                            excontent: content
                                        }
                                    );
                                }
                            } else {
                                var error = "Individu inexistant"
                                console.log(error)

                                var type = 1
                                res.render(
                                    'root/tracking/new_cible_tracking', {
                                        tabside: tabside,
                                        idpage: idpage,
                                        typeTracking: type,
                                        error: error,
                                        excontent: content
                                    }
                                );
                            }
                        })
                        break;
                    case 3:
                        //code ici
                        Individu.findByOneField('code_individu', identifiant, (futindividu) => {
                            if (futindividu !== null && futindividu.length != 0) {
                                var individu = futindividu[0]
                                if (individu.estCible == 0) {
                                    Individu.replaceByOneField(individu.codeIndividu, 'est_cible', 1, (msg) => {
                                        console.log(msg)
                                    })
                                    res.redirect('/root/tracking/' + trackercible + '/allcible')
                                } else {
                                    var error = "Cet individu est déja ciblé"
                                    console.log(error)

                                    var type = 1
                                    res.render(
                                        'root/tracking/new_cible_tracking', {
                                            tabside: tabside,
                                            idpage: idpage,
                                            typeTracking: type,
                                            error: error,
                                            excontent: content
                                        }
                                    );
                                }
                            } else {
                                var error = "Individu inexistant"
                                console.log(error)

                                var type = 1
                                res.render(
                                    'root/tracking/new_cible_tracking', {
                                        tabside: tabside,
                                        idpage: idpage,
                                        typeTracking: type,
                                        error: error,
                                        excontent: content
                                    }
                                );
                            }
                        })
                        break;
                }

            } else {
                var error = "SVP, Remplissez au moins un des champs."

                var type = 1
                res.render(
                    'root/tracking/new_cible_tracking', {
                        tabside: tabside,
                        idpage: idpage,
                        typeTracking: type,
                        error: error
                    }
                );
            }
            break;

        case 'zones':

            var latitude = content.latitude
            var longitude = content.longitude
            var rayon = content.rayon

            console.log(content)

            if (latitude !== "" && longitude !== "" && rayon !== "") {

                //code ici

                res.redirect('/root/tracking/' + trackercible + 'newcible')
            } else {
                var error = "SVP, Tous les champs sont obligatoires."

                var type = 2
                res.render(
                    'root/tracking/new_cible_tracking', {
                        tabside: tabside,
                        idpage: idpage,
                        typeTracking: type,
                        error: error
                    }
                );
            }

            break;

        default:
            res.redirect('/root/tracking')
            break;
    }

})


router.get('/:trackercible/allcible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible

    switch (trackercible) {
        case 'individus':
            //code restant ici
            Individu.findByOneField('est_cible', 1, (futindividu) => {
                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                var type = 1
                res.render(
                    'root/tracking/all_cible_tracking', {
                        tabside: tabside,
                        idpage: idpage,
                        typeTracking: type,
                        info: info,
                        i_cibles: futindividu,
                        resultatVide: resultatVide
                    }
                );
            })


            break;

        case 'zones':
            //code restant ici
            var futzones = null
            if (futzones !== null) {
                var info = "yes"
            } else {
                var info = "no"
            }
            var type = 2
            res.render(
                'root/tracking/all_cible_tracking', {
                    tabside: tabside,
                    idpage: idpage,
                    typeTracking: type,
                    info: info,
                    z_cibles: futzones,
                    resultatVide: resultatVide
                }
            );
            break;

        default:
            res.redirect('/root/tracking')
            break;
    }




})

router.get('/:trackercible/tracking_special/:codecible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible
    var codecible = req.params.codecible

    switch (trackercible) {
        case 'individus':
            //code restant ici
            Individu.findByOneField('code_individu', codecible, (futindividu) => {
                if (futindividu !== null && futindividu.length != 0) {
                    var individu = futindividu[0]

                    PositionIndividu.findFirstByOneField('code_individu', codecible, (futfirst) => {
                        PositionIndividu.findLastByOneField('code_individu', codecible, (futlast) => {
                            if ((futfirst.length != 0 && futfirst != null) && (futlast.length != 0 && futlast != null)) {

                                var datedebut = futfirst[0].dateRegister
                                var datefin = futlast[0].dateRegister

                                var dd = Date.parse(""+datedebut+"")
                                var df = Date.parse(""+datefin+"")

                                console.log(dd)
                                console.log(df)

                                var type = 1
                                res.render(
                                    'root/tracking/tracking_special', {
                                        tabside: tabside,
                                        idpage: idpage,
                                        typeTracking: type,
                                        firstposition: futfirst[0],
                                        lastposition: futlast[0],
                                        individu: individu,
                                        notrack: 0
                                    }
                                );
                            } else {
                                var msglog = "Aucun enregitrement"
                                console.log(msglog)
                                var type = 1
                                res.render(
                                    'root/tracking/tracking_special', {
                                        tabside: tabside,
                                        idpage: idpage,
                                        typeTracking: type,
                                        firstposition: msglog,
                                        lastposition: msglog,
                                        individu: individu,
                                        notrack: 1
                                    }
                                );
                            }
                        })
                    })
                } else {
                    console.log("Individu cible inexistant")
                }
            })

            break;

        case 'zones':
            var type = 2
            res.render(
                'root/tracking/tracking_special', {
                    tabside: tabside,
                    idpage: idpage,
                    typeTracking: type
                }
            );
            break;

        default:
            res.redirect('/root/tracking')
            break;
    }
})

/**
 * ALGORITHME DE TRACKING TOUS TYPES CONFONDUS
 * TYPE INDIVIDU ET TYPE ZONE
 */

router.post('/:trackercible/tracking_special/:codecible', (req, res, next) => {
    var idpage = 2
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var trackercible = req.params.trackercible
    var codecible = req.params.codecible

    var content = req.body

    switch (trackercible) {
        case 'individus':
            //code restant ici
            Individu.findByOneField('code_individu', codecible, (futindividu) => {
                if (futindividu !== null && futindividu.length != 0) {
                    var individu = futindividu[0]

                    // RECUPERATION DES POSITIONS FIRST ET LAST
                    PositionIndividu.findFirstByOneField('code_individu', codecible, (futfirst) => {
                        PositionIndividu.findLastByOneField('code_individu', codecible, (futlast) => {
                            if ((futfirst.length != 0 && futfirst != null) && (futlast.length != 0 && futlast != null)) {

                                // POSITIONS RECUPÉRÉES FIRST ET LAST
                                var firstposition = futfirst[0]
                                var lastposition = futlast[0]

                                //console.log(firstposition)
                                //console.log(lastposition)

                                // VALEURS DU FORMULAIRE
                                var rayon = content.rayon
                                var user_date_debut = content.datedebut
                                var user_heure_debut = content.heuredebut
                                var user_date_fin = content.datefin
                                var user_heure_fin = content.heurefin

                                //VALEURS RÉELLES DES DATES DES POSITIONS FIRST ET LAST
                                var vrai_date_debut = firstposition.dateRegister
                                var vrai_date_fin = lastposition.dateRegister

                                //VALEURS DES DATES DE DEBUT ET DE FIN QUI SERONT UTILISÉES ICI
                                var datedebut;
                                var datefin;

                                //VERIFICATION SUR LA DISPONIBIITÉ OBLIGATOIRE DU RAYON

                                if (rayon !== '' && !isNaN(parseFloat(rayon)) && Math.sign(parseFloat(rayon)) != -1 && Math.sign(parseFloat(rayon)) != 0) {
                                    //VERIFICATION DES VALEURS DE DATES DU FORMULAIRE ET HARMONISATION DES CAS
                                    if (user_date_debut == "" && user_date_fin == "") {
                                        var atcas = 0
                                        var datedebut = vrai_date_debut
                                        var datefin = vrai_date_fin
                                    }
                                    if (user_date_debut !== "" && user_date_fin == "") {
                                        var atcas = 1
                                        var datedebut = user_date_debut
                                        var datefin = vrai_date_fin
                                    }
                                    if (user_date_debut == "" && user_date_fin !== "") {
                                        var atcas = 2
                                        var datedebut = vrai_date_debut
                                        var datefin = user_date_fin
                                    }
                                    if (user_date_debut !== "" && user_date_fin !== "") {
                                        var atcas = 3
                                        var datedebut = user_date_debut
                                        var datefin = user_date_fin
                                    }

                                    var dd = Date.parse(""+datedebut+"")
                                    var df = Date.parse(""+datefin+"")

                                    var rayon = parseFloat(rayon)

                                    //console.log(dd)
                                    //console.log(df)


                                    PositionIndividu.findByOneField('code_individu', codecible, (futciblepositions) => {
                                        if (futciblepositions.length != 0 && futciblepositions != null) {
                                            
                                            var ciblepositions = []
                                            
                                            console.log("AVANT FILTRE "+futciblepositions.length)
                                            console.log(ciblepositions.length)
                                            futciblepositions.forEach(cibleposition => {
                                                var dcp  = Date.parse(cibleposition.dateRegister)
                                                if (dcp >= dd && dcp <= df && cibleposition.latitude != "" && cibleposition.latitude != "") {
                                                    
                                                    //console.log("dcp :"+dcp)

                                                    ciblepositions.push(cibleposition)

                                                }                                  
                                            });

                                            console.log("APRES FILTRE" + ciblepositions.length)

                                            var bonne_distance = 1.2*rayon

                                            console.log("bonne distance : "+bonne_distance)
                                            
                                            var totalciblepositions = []
                                            for (let index = 0; index < ciblepositions.length-1; index++) {
                                                const aposition = ciblepositions[index];
                                                const bposition = ciblepositions[index+1];

                                                console.log("INDEX : "+index)

                                                const a = {
                                                    latitude: aposition.latitude,
                                                    longitude: aposition.longitude
                                                }
                                                const b = {
                                                    latitude: bposition.latitude,
                                                    longitude: bposition.longitude
                                                }

                                                const distance = geolib.getDistance(a, b)

                                                
                                                //var bonne_distance = 1.2*rayon

                                                //console.log("bonne distance : "+bonne_distance)

                                                if (distance > 0 && distance <= bonne_distance) {
                                                    //STOCKAGE DANS LE TABLEAU FINAL DES POSITIONS GPS CORRECTES SELON bonne_distance
                                                    totalciblepositions.push(a)
                                                } else {
                                                    if (distance == 0) {
                                                        //console.log("distance actuelle : "+distance)
                                                        //console.log("inutile je te saute alors")
                                                        continue
                                                    }
                                                    if(distance > bonne_distance){
                                                        //console.log("distance actuelle : "+distance)
                                                        let z = 0
                                                        //console.log("attention distance : "+distance)
                                                        
                                                        
                                                        let miciblepositions = []
                                                        let miposition = {}
                                                        //var actucentreposition = {}
                                                        let newdistance = distance
                                                        let maincentre = {}
                                                        
                                                        while (newdistance > bonne_distance) {

                                                            
                                                            //console.log("NEW DISTANCE WHILE: "+newdistance)
                                                            //console.log("Z WHILE: "+z)
                                                            
                                                            if (z == 0) {
                                                                console.log("recorrection en cours : "+z)
                                                                console.log("je passe au premier fourneau actu ")
                                                                let centre = geolib.getCenter([
                                                                    a,b
                                                                ])
                                                                miposition = {
                                                                    centre: centre,
                                                                    parent1: b,
                                                                    parent2: a,
                                                                    znaissance: z
                                                                }
                                                                miciblepositions.push(miposition)

                                                                let maincentre = centre
                                                                
                                                                let newdistance = geolib.getDistance(a, maincentre)
                                                                //console.log("NEWDISTANCE : "+newdistance)
                                                                //z++
                                                                //break
                                                            } else {
                                                                console.log("recorrection en cours : "+z)
                                                                console.log("je passe au second fourneau actu ")

                                                                for (let x = 0; x < miciblepositions.length; x++) {

                                                                    let cibleposit = miciblepositions[x];

                                                                    miciblepositions.forEach(miposit => {
                                                                        if (miposit.parent2.latitude == a.latitude && miposit.parent2.longitude == a.longitude && miposit.znaissance == z) {
                                                                            //let actucentreposition = miposit
                                                                            let maincentre = miposit.centre
                                                                        }
                                                                    });

                                                                    if (cibleposit.znaissance == z-1) {

                                                                        let centre1 = geolib.getCenter([
                                                                            cibleposit.centre,cibleposit.parent1
                                                                        ])

                                                                        let centre2 = geolib.getCenter([
                                                                            cibleposit.centre,cibleposit.parent2
                                                                        ])

                                                                        miposition1 = {
                                                                            centre: centre1,
                                                                            parent1: cibleposit.centre,
                                                                            parent2: cibleposit.parent1,
                                                                            znaissance: z
                                                                        }
                                                                        miposition2 = {
                                                                            centre: centre2,
                                                                            parent1: cibleposit.centre,
                                                                            parent2: cibleposit.parent2,
                                                                            znaissance: z
                                                                        }

                                                                        miciblepositions.push(miposition1)
                                                                        miciblepositions.push(miposition2)
                                                                    }

                                                                    //POINT LE PLUS PROCHE DE A

                                                                    miciblepositions.forEach(miposit => {
                                                                        if (miposit.parent2.latitude == a.latitude && miposit.parent2.longitude == a.longitude && miposit.znaissance == z) {
                                                                            //var actucentreposition = miposit
                                                                            maincentre = miposit.centre
                                                                        }
                                                                    });

                                                                    newdistance = geolib.getDistance(a, maincentre)
                                                                    //z++
                                                                    
                                                                }
                                                                //z++
                                                            }
                                                            console.log("recorrection effectuée => Nouvelle distance :"+newdistance)
                                                            z++
                                                            //console.log("NEWDISTANCE : "+newdistance)
                                                            //console.log("NEW Z : "+z)
                                                        }

                                                        //STOCKAGE DANS LE TABLEAU FINAL DES POSITIONS GPS CORRECTES SELON bonne_distance

                                                        totalciblepositions.push(a)
                                                        miciblepositions.forEach(micible => {
                                                            totalciblepositions.push(micible.centre)
                                                        });

                                                    }
                                                }
                                            }

                                            console.log("BRUTES CIBLES POSITIONS  : "+futciblepositions.length)
                                            console.log("TOTAL CIBLES POSITIONS : "+totalciblepositions.length)

                                            let totalothercible = []
                                            //let othercibles = []
                                            PositionIndividu.all((allpositions) => {
                                                if(allpositions.length != 0 && allpositions != null){
                                                    console.log(true)
                                                    console.log(totalothercible.length)
                                                    let actudistance;
                                                    totalciblepositions.forEach(cibleposition => {
                                                        allpositions.forEach(otherposition => {
                                                            
                                                            let cposition = {
                                                                latitude: cibleposition.latitude,
                                                                longitude: cibleposition.longitude
                                                            }
                                                            let oposition = {
                                                                latitude: otherposition.latitude,
                                                                longitude: otherposition.longitude
                                                            }
                                                            //console.log(oposition)
                                                            actudistance = geolib.getDistance(cposition, oposition)

                                                            //STOCKAGE
                                                            if(actudistance <= rayon && otherposition.codeIndividu !== codecible) {
                                                                //console.log(otherposition.codeIndividu)
                                                                if (totalothercible.length !== 0 || totalothercible !== null || totalothercible !== undefined) {
                                                                    if(totalothercible.indexOf(otherposition.codeIndividu) == -1){
                                                                        totalothercible.push(otherposition.codeIndividu)
                                                                    }
                                                                } else {
                                                                    totalothercible.push(oposition.codeIndividu)
                                                                }

                                                            }

                                                        });
                                                    });

                                                    console.log(totalothercible)
                                                    console.log("nombres des contacts possibles : "+totalothercible.length)

                                                }
                                            })

                                            res.redirect('/root/tracking/' + trackercible + '/tracking_special/' + codecible)
                                        }
                                    })

                                    
                                } else {
                                    var type = 1
                                    var error = "SVP, Le rayon est obligatoire, doit être numérique positif et différent de 0."
                                    res.render(
                                        'root/tracking/tracking_special', {
                                            tabside: tabside,
                                            idpage: idpage,
                                            typeTracking: type,
                                            firstposition: futfirst[0],
                                            lastposition: futlast[0],
                                            individu: individu,
                                            notrack: 0,
                                            error: error,
                                            excontent: content
                                        }
                                    );
                                }
                            } else {
                                console.log("Aucun enregistrement")
                                res.redirect('/root/tracking/' + trackercible + '/tracking_special/' + codecible)
                            }
                        })
                    })
                } else {
                    console.log("Individu cible inexistant")
                    res.redirect('/root/tracking/' + trackercible + '/allcible')
                }
            })

            break;

        case 'zones':
            var type = 2
            res.render(
                'root/tracking/tracking_special', {
                    tabside: tabside,
                    idpage: idpage,
                    typeTracking: type
                }
            );
            break;

        default:
            res.redirect('/root/tracking')
            break;
    }
})

module.exports = router;