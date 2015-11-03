var https = require('https');
var fs = require('fs');

var champ = {"champions": [], "version":""}; //JSON wrapper
var URLtargetListChamp = "https://euw.api.pvp.net/api/lol/euw/v1.2/champion?api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
var URLversionListChamp = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/versions?api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
//Multiple request, one for each champion
function singleChamp(p) {
	for (i = 0; i < p.champions.length; i++) {
       var URLsingleChamp = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/"+p.champions[i].id+"?champData=stats,tags&api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8";
       https.get(URLsingleChamp, function(res) {
			var body='';
			res.on('data', function(chunk){
				body+=chunk;				
			});
         res.on('end', function(){	
				dataparsed = JSON.parse(body);
				console.log(dataparsed);
				champ.champions.push(dataparsed);
				if(champ.champions.length==p.champions.length){
					fs.writeFile("champ_file.json", JSON.stringify(champ, null, 4), function(err) {
						if(err) {
							console.log(err);
						} else {
							console.log("JSON champ list saved");
							var d = new Date();
							var month = d.getMonth();
							month = (month < 10 ? "0" : "") + month;
							var day = d.getDate();
							day = (day < 10 ? "0" : "") + day;
							var log =  month + ":" + day;
							data.champ_list_update.push(log);
							fs.writeFile("log.json", JSON.stringify(log, null, 4), function(err) {
								if(err) {
									console.log(err);
								} else {
									console.log("JSON log saved");
								}
							}); 
						}
					}); 
				}
			})
		 })
	}
};

https.get(URLversionListChamp, function (res) {
    var body = '';
    res.on('data', function (data) {
        body += data;
    });
    res.on('end', function () {
        // Data reception is done, do whatever with it!
       var parsed = JSON.parse(body);
       champ.version= parsed[0];
		 console.log(champ.version);
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