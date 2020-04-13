var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')


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
            res.render(
                'root/service_mapping/zonarisque', {
                    tabside: tabside,
                    idpage: idpage
                }
            );
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

module.exports = router;