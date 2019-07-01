let express = require('express')
let http = require('http')

let app = express()

let server= http.createServer(app).listen(7000,function(){
    console.log(`listen at 7000`)
})

let info = {id: "", nodeId: "", host: ""}

//app.use('/',express.static(__dirname+'/dist'))

let appIdIndex = -1
let nodeIdIndex = -1
let hostIndex = -1

let allArguments = process.argv;
allArguments.forEach((val, index) => {
	if (val == "--stream-app-id") {
		appIdIndex = index + 1
	}
	if (val == "--stream-node-id") {
		nodeIdIndex = index + 1
	}
	if (val == "--stream-host") {
		hostIndex = index + 1
	}
})
info.id = allArguments[appIdIndex]
info.nodeId = allArguments[nodeIdIndex]
info.host = allArguments[hostIndex]

app.get('/getSpInfo', function (req, res) {
	let result = {
		"appId": "test1",
		"nodeId": "test2",
		"host": "test3" 
	}
	res.send(result)
})

app.get('/', function (req, res) {
	res.send(info)
})