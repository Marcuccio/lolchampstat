var express = require('express');
var https = require('https');
var fs = require('fs');
var CronJob = require('cron').CronJob;

var app = express();
      
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img_square'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/champ_file.json', function(request, response) {
    var data = fs.readFileSync('./champ_file.json');
    try {
        myObj = JSON.parse(data);
        response.json(myObj);
    }
    catch (err) {
        console.log('There has been an error parsing your JSON.')
        console.log(err);
    }
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

var job = new CronJob('00 30 00 * * 0', function() {
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
							console.log("JSON saved");
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
  },
  true, /* Start the job right now */
  timeZone 'America/Los_Angeles'
);
