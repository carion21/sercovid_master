var express = require('express');
var router = express.Router();
const Sidebare = require('../config/sidebare')
const tabsidebase = require('../config/tabsidebase')

const NotificationClient = require('../models/NotificationClient')

/* GET home page. */
router.get('/', function (req, res, next) {
    var idpage = 3
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/service_com/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

router.get('/notifications/new', function (req, res, next) {
    var idpage = 3
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/service_com/notifications/new', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

router.post('/notifications/new', function (req, res, next) {
    var idpage = 3
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    var content = req.body

    console.log(content.titre.length)

    let titre = content.titre
    let lienweb = content.lienweb
    let importance = content.importance

    var nbcharfixed = 20

    if (titre !== "" && lienweb !== "" && importance !== "") {
        if (titre.length <= nbcharfixed) {
            let niveau = parseInt(importance)
            if (niveau === 0 || niveau === 1 || niveau === 2) {
                var notification = {
                    codeNotification: NotificationClient.genCodeNotificationClient(),
                    titre: titre,
                    lienWeb: lienweb,
                    importance: niveau
                }

                NotificationClient.create(notification, (msg) => {
                    console.log(msg)
                })

                res.redirect('/root/service_com/notifications/list')
            } else {
                var error = "SVP, attention le niveau 'importance n'accepte que trois valeurs."
                res.render(
                    'root/service_com/notifications/new', {
                        tabside: tabside,
                        idpage: idpage,
                        error: error,
                        excontent: content
                    }
                );
            }
        } else {
            var error = "SVP, le nombre de caractères du titre ne doit pas excéder " + nbcharfixed + "."
            res.render(
                'root/service_com/notifications/new', {
                    tabside: tabside,
                    idpage: idpage,
                    error: error,
                    excontent: content
                }
            );
        }
    } else {
        var error = "SVP, Tous les champs sont obligatoires."
        res.render(
            'root/service_com/notifications/new', {
                tabside: tabside,
                idpage: idpage,
                error: error,
                excontent: content
            }
        );
    }






});

router.get('/notifications/list', function (req, res, next) {
    var idpage = 3
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")

    NotificationClient.all((futnotifications) => {
        if (futnotifications.length !== 0 && futnotifications !== null) {
            var info = "yes"
            res.render(
                'root/service_com/notifications/list', {
                    tabside: tabside,
                    idpage: idpage,
                    info,
                    notifications: futnotifications
                }
            );
        } else {
            var info = "no"
            res.render(
                'root/service_com/notifications/list', {
                    tabside: tabside,
                    idpage: idpage,
                    info
                }
            );
        }
    })
    
});

router.get('/notifications/delete/:codenotification', (req, res, next) => {
    var codenotification = req.params.codenotification

    NotificationClient.findByOneField('code_notification', codenotification, (futnotif) => {
        if (futnotif.length === 1) {
            NotificationClient.remove({ codeNotificationClient: codenotification }, (msg) => {
                console.log(msg)
            })
            res.redirect('/root/service_com/notifications/list')
        } else {
            console.log("Notification inconnue")
            res.redirect('/root/service_com/notifications/list')
        }
    })
})

router.get('/notifications/voirinfo/:codenotification/', function (req, res, next) {
    var idpage = 3
    var tabside = Sidebare.activeSidebare(tabsidebase, idpage)
    console.log("================================================================================")
    console.log(tabside[idpage])
    console.log("================================================================================")
    res.render(
        'root/service_com/index', {
            tabside: tabside,
            idpage: idpage
        }
    );
});

module.exports = router;