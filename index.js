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

new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
