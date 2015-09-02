var https = require('https');
var fs = require('fs');

var champ = {"champions": [], "version":""}; //JSON wrapper
var URLtargetListChamp = "https://euw.api.pvp.net/api/lol/euw/v1.2/champion?api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
var URLversionListChamp = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/versions?api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
//Multiple request, one for each champion
function singleChamp(p) {
    for (i = 0; i < p.champions.length; i++) {
        var URLsingleChamp = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+p.champions[i].id+"?champData=stats&api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
        https.get(URLsingleChamp, function(res) {
            res.on('data', function(data){
                var dataparsed = JSON.parse(data);
                console.log(dataparsed.id+": "+res.statusCode);
                champ.champions.push(dataparsed);
            });
            res.on('end', function(){
                if(champ.champions.length==p.champions.length){
                 fs.writeFile("champ_file.json", JSON.stringify(champ, null, 4), function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("JSON saved");
                        }
                    }); 
                };
            })
        })
    }
} ;

https.get(URLversionListChamp, function (res) {
    var body = '';
    res.on('data', function (data) {
        body += data;
    });
    res.on('end', function () {
        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        champ.version=parsed[0];
    }).on('error', function (e) {
        console.log("Got error: " + e.message);  
    });
});

https.get(URLtargetListChamp, function (res) {
    var body = '';
    res.on('data', function (data) {
        body += data;
    });
    res.on('end', function () {
        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        singleChamp(parsed);
        
    }).on('error', function (e) {
        console.log("Got error: " + e.message);  
    });
});





