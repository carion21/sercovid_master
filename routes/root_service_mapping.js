var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')

const geolib = require('geolib')

const Zone = require('../models/Zone')


/* GET home page. */
router.get('/', function (req, res, next) {
    var idpage = 4
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/service_mapping/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

router.get('/:tachedesuivi', (req, res, next) => {
    var idpage = 4
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var tachedesuivi = req.params.tachedesuivi

    switch (tachedesuivi) {
        case 'suivi_individus':
            res.render(
                'root/service_mapping/suivi_individus', {
                    tabside: tabside,
                    idpage: idpage
                }
            );
            break;
        case 'zonarisque':
            Zone.findByOneField('statut', 1, (futzones) => {
                let info;
                let zonar = 1
                if(futzones.length !== 0 && futzones !== null){
                    let info = "yes"
                    var polycenter = {}
                    var totalposit = []
                    let fzone = {}
                    let fzones = []
                    var z = 0
                    futzones.forEach(zposit => {
                        fzone = {
                            zid: z,
                            zone: zposit
                        }
                        fzones.push(fzone)
                        z++
                    });
                    if (futzones.length >= 2) {
                        let havecenter = 1
                        futzones.forEach(zone => {
                            zposit = {
                                latitude: zone.latitudeCentre,
                                longitude: zone.longitudeCentre
                            }
                            totalposit.push(zposit)
                        });
                        polycenter = geolib.getCenter(totalposit)

                        res.render(
                            'root/service_mapping/zonarisque', {
                                tabside: tabside,
                                idpage: idpage,
                                info: info,
                                zonar: zonar,
                                ztotal: futzones.length,
                                havecenter: havecenter,
                                zcenter: polycenter,
                                fzones: fzones,
                            }
                        );
                    } else {
                        let havecenter = 0

                        res.render(
                            'root/service_mapping/zonarisque', {
                                tabside: tabside,
                                idpage: idpage,
                                info: info,
                                zonar: zonar,
                                ztotal: futzones.length,
                                havecenter: havecenter,
                                fzones: fzones,
                            }
                        );
                        
                    }

                } else {
                    let info = "no"
                    res.render(
                        'root/service_mapping/zonarisque', {
                            tabside: tabside,
                            idpage: idpage,
                            info: info
                        }
                    );
                }
            })
            
            break;
        case 'pandemie_nationale':
            res.render(
                'root/service_mapping/pandemie_nationale', {
                    tabside: tabside,
                    idpage: idpage
                }
            );
            break;
        case 'pandemie_mondiale':
            var url = "https://www.covidvisualizer.com/"
            res.redirect(url)
            break;
    
        default:
            res.redirect('/root/service_mapping')
            break;
    }
})

router.get('/voir_zone/:codezone', (req, res, next) => {
    var idpage = 4
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var codezone = req.params.codezone

    Zone.findByOneField('code_zone', codezone, (futzone) => {
        if (futzone.length !== 0 && futzone !== null && futzone.length === 1) {
            let zone = futzone[0]
            var voir_zone = 1
            res.render(
                'root/service_mapping/voir_zone', {
                    tabside: tabside,
                    idpage: idpage,
                    zone: zone,
                    voir_zone: voir_zone
                }
            );
        } else {
            console.log('Zône inconnue')
            res.redirect('/root/tracking')
        }
    })
})

module.exports = router;