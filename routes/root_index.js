var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')


/* GET home page. */
router.get('/', function (req, res, next) {
    var idpage = 0
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/index/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

module.exports = router;