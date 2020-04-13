var express = require('express');
var router = express.Router();

const Individu = require('../models/Individu')
const PositionIndividu = require('../models/PositionIndividu')
const GoTrackTracks = require('../models/go_track_tracks')
const GoTrackTracksPoints = require('../models/go_track_trackspoints')

const csvjson = require('csvjson');
const readFile = require('fs').readFile;

/* GET users listing. */
router.get('/', function (req, res, next) {
    var fichier1 = '/home/carion/zeus/gcovid19/samdev/sercovid_master/csv/go_track_tracks.csv'
    var fichier2 = '/home/carion/zeus/gcovid19/samdev/sercovid_master/csv/go_track_trackspoints.csv'
    var fichier = fichier1
    readFile(fichier, 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const jsonObj = csvjson.toObject(fileContent);

        var idand = []
        var i = 0
        console.log("longueur du tab :" + idand.length)
        console.log("valeur de i :" + i)
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var ida1 = element['"id"']
            var ida2 = element['"track_id"']
            var ida = ida1
            console.log("id_andr :" + ida)

            if (idand.length != 0) {
                if (idand.indexOf(ida) == -1) {
                    idand[i] = ida
                    i++
                    console.log("la valeur " + ida + " n'existe pas")
                    console.log("valeur de i :" + i)
                }
            } else {
                idand[i] = ida
                i++
                console.log("valeur de i :" + i)
            }



            //res.json(element['"id_android"'])
        });

        //console.log(idand.length)
        console.log("longueur du tab :" + idand.length)
        console.log("valeur de i :" + i)

        var a = jsonObj
        //console.log(a['"id"'])
        res.json(idand)

    })
});

router.get('/create_users', (req, res, next) => {
    /*

    var fichier1 = '/home/carion/zeus/gcovid19/samdev/sercovid_master/csv/go_track_tracks.csv'
    var fichier2 = '/home/carion/zeus/gcovid19/samdev/sercovid_master/csv/go_track_trackspoints.csv'
    var fichier = fichier1
    readFile(fichier, 'utf-8', (err, fileContent) => {
        if (err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
        }
        const jsonObj = csvjson.toObject(fileContent);

        var idand = []
        var trackid = []
        var i = 0
        console.log("longueur du tab :" + idand.length)
        console.log("valeur de i :" + i)
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var ida1 = element['"id_android"']

            trackid = element['"id"']
            //var ida2 = element['"track_id"']
            var ida = ida1
            console.log("id_andr :" + ida)

            if (idand.length != 0) {
                if (idand.indexOf(ida) == -1) {
                    idand[i] = ida

                    i++
                    console.log("la valeur " + ida + " n'existe pas")
                    console.log("valeur de i :" + i)
                }
            } else {
                idand[i] = ida
                i++
                console.log("valeur de i :" + i)
            }



            //res.json(element['"id_android"'])
        });

        //console.log(idand.length)
        console.log("longueur du tab :" + idand.length)
        console.log("valeur de i :" + i)

        idand.forEach(idan => {
            if ((idan % 2) == 1) {
                var sexe = "homme"
            } else {
                var sexe = "femme"
            }
            var min = 16
            var max = 70
            var age = Math.floor(Math.random() * (max - min + 1)) + min

            var nmin = 0
            var nmax = 99

            var an = Math.floor(Math.random() * (max - min + 1)) + min
            var bn = Math.floor(Math.random() * (max - min + 1)) + min
            var cn = Math.floor(Math.random() * (max - min + 1)) + min
            var dn = Math.floor(Math.random() * (max - min + 1)) + min

            var phone = "" + an + "" + bn + "" + cn + "" + dn

            var individu = {
                codeIndividu: Individu.genCodeIndividu(),
                nom: "Bini_" + idan,
                prenom: "Samuel_" + idan,
                sexe: sexe,
                age: age,
                villeResidence: "Ville Y",
                telephone: phone,
                motdepasse: "g",
                cleApi: "cle_api-" + idan + "-_-" + idan
            }

            Individu.create(individu, (msg) => {
                console.log(msg);
            })
        });

        var a = jsonObj
        //console.log(a['"id"'])
        res.json(idand)

    })

    */
})


router.get('/create_positions', (req, res, next) => {
    /*
    GoTrackTracksPoints.all((futpoints) => {
        if (futpoints != null) {
            console.log(futpoints.length);

            futpoints.forEach(point => {

                GoTrackTracks.findByOneField('id', point.trackId, (futrack) => {
                    if (futrack.length != 0 && futrack != null) {
                        track = futrack[0]
    
                        var cle_api = "cle_api-"+track.idAndroid+"-_-"+track.idAndroid
    
                        Individu.findByOneField('cle_api', cle_api, (futindividu) => {
                            if(futindividu.length != 0 && futindividu != null){
                                var individu = futindividu[0]
    
                                var position = {
                                    codePositionIndividu: PositionIndividu.genCodePositionIndividu(),
                                    codeIndividu: individu.codeIndividu,
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                    dateRegister: point.time
                                }
    
                                PositionIndividu.create(position, (msg) => {
                                    console.log(msg)
                                })
                                
                            } else {
                                console.log("Individu inexistant.")
                            }
                        })
                    } else {
                        console.log("Déplacement inexistant.")
                    }
                })
            });

            res.send("ok c bon")
        } else {
            console.log("Aucun déplacements")
        }
        //res.send("ok c bon")
        //res.json(futpoints)
    })
    */
})

router.get('/test', (req, res, next) => {
    var tab = [
        "a",
        "b",
        "c",
        "d"
    ]

    GoTrackTracks.all((futracks) => {
        console.log(futracks);
    })

    console.log(tab.indexOf("a"));
    res.send('ok')
    
})

module.exports = router;