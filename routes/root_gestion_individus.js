var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')
const resultat_vide = require('../config/message').resultatVide()


const Individu = require('../models/Individu')

/**
 * PAGE D'ACCUEIL DE GESTION INDIVIDUS
 */


router.get('/', function (req, res, next) {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/gestion_individus/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

/**
 * PAGE PERMETTANT DE VOIR LES INFORMATIONS SUR UN INDIVIDUS
 */

router.get('/voir/:codindividu', (req, res, next) => {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var codindividu = req.params.codindividu

    Individu.findByOneField('code_individu', codindividu, (futindividu) => {
        if (futindividu !== null && futindividu.length != 0) {
            res.render(
                'root/gestion_individus/voirinfo', {
                    tabside: tabside,
                    idpage: idpage,
                    individu: futindividu[0]
                }
            );
        } else {
            res.redirect('/root/gestion_individus')
        }
    })
})

router.get('/:typaction/:code/:codindividu', (req, res, next) => {
    var typaction = req.params.typaction
    var code = req.params.code
    var codindividu = req.params.codindividu

    switch(typaction){
        case 'changer_statut':
            if (code == 0 || code == 1 || code == 2) {
                Individu.findByOneField('code_individu', codindividu, (futindividu) => {
                    if (futindividu !== null && futindividu.length != 0) {
                        var individu = futindividu[0]
                        if (individu.statut !== code) {
                            Individu.replaceByOneField(individu.codeIndividu, 'statut', code, (msg) => {
                                console.log(msg)
                            })
                            res.redirect('/root/gestion_individus/voir/'+codindividu)
                        } else {
                            console.log("L'individu a déja le même statut")
                            res.redirect('/root/gestion_individus/voir/'+codindividu)
                        }
                    } else {
                        console.log("Individu inexistant")
                    }
                })
            } else {
                res.redirect('/root/gestion_individus')
            }
            break;

        case 'devient_cible':
            if (code == 0 || code == 1) {
                Individu.findByOneField('code_individu', codindividu, (futindividu) => {
                    if (futindividu !== null && futindividu.length != 0) {
                        var individu = futindividu[0]
                        if (individu.statut !== code) {
                            Individu.replaceByOneField(individu.codeIndividu, 'est_cible', code, (msg) => {
                                console.log(msg)
                            })
                            res.redirect('/root/gestion_individus/voir/'+codindividu)
                        } else {
                            console.log("L'individu a déja le même statut de ciblage")
                            res.redirect('/root/gestion_individus/voir/'+codindividu)
                        }
                    } else {
                        console.log("Individu inexistant")
                    }
                })
            } else {
                res.redirect('/root/gestion_individus')
            }
            break;

        default:
            res.redirect('/root/gestion_individus')
            break;    
    }
})

/**
 * LISTE PAR CATEGORIE
 */

router.get('/recherche_type1', (req, res, next) => {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/gestion_individus/recherche_type1', {
            tabside: tabside,
            idpage: idpage
        }
    );
})

router.get('/recherche_type1/:categorie', (req, res, next) => {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var categorie = req.params.categorie


    var futindividu = null

    switch (categorie) {
        case 'tous':
            var type = 0
            Individu.all((futindividu) => {
                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }

                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;
        case 'actif':
            Individu.findByOneField('est_actif', 1, (futindividu) => {
                var type = 1

                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;
        case 'nonactif':
            Individu.findByOneField('est_actif', 0, (futindividu) => {
                var type = 2

                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;
        case 'sain':
            Individu.findByOneField('statut', 0, (futindividu) => {
                var type = 3

                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;
        case 'suspect':
            Individu.findByOneField('statut', 1, (futindividu) => {
                var type = 4

                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;
        case 'nonsain':
            Individu.findByOneField('statut', 2, (futindividu) => {
                var type = 5

                if (futindividu !== null && futindividu.length != 0) {
                    var info = "yes"
                } else {
                    var info = "no"
                }
                res.render(
                    'root/gestion_individus/resultat_recherche_type1', {
                        tabside: tabside,
                        idpage: idpage,
                        info: info,
                        individus: futindividu,
                        resultatVide: resultat_vide,
                        type: type
                    }
                );
            })
            break;

        default:
            res.redirect('/root/gestion_individus/recherche_type1')
            break;
    }
})

/**
 * RECHERCHE PAR CATEGORIE
 */

router.get('/recherche_type2', (req, res, next) => {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/gestion_individus/recherche_type2', {
            tabside: tabside,
            idpage: idpage
        }
    );
})

/**
 * RECHERCHE POUSSÉE PAR CATEGORIE
 * 
 * C-A-D en plus de faire la recherche type 2 on y ajoute de la recherche par paramètres individuels supplémentaires
 */

router.get('/recherche_type3', (req, res, next) => {
    var idpage = 1
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/gestion_individus/recherche_type3', {
            tabside: tabside,
            idpage: idpage
        }
    );
})

module.exports = router;