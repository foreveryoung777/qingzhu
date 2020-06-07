const express = require('express')
const http = require('http')
const fs = require('fs')
const { parameter } = require('suanpan_node_sdk').sp
let app = express()

let server= http.createServer(app).listen(7000,function(){
    console.log(`listen at 7000`)
})

let data = {appId: "", nodeId: "", host: ""}

let appIdIndex = -1
let nodeIdIndex = -1
let hostIndex = -1

let allArguments = process.argv

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
data.id = allArguments[appIdIndex]
data.nodeId = allArguments[nodeIdIndex]
data.host = allArguments[hostIndex]

console.log(`Get process parameters id: ${data.id}, nodeId: ${data.nodeId}, host: ${data.host}, parameters: ${parameter}`)

fs.readFile('dist/index.html', 'utf-8', function(err, str){
	console.log("Modify index.html.");
	if (err) {
		throw err
	}
	str = str.replace('{{appId}}', data.id)
	str = str.replace('{{nodeId}}', data.nodeId)
	str = str.replace('{{host}}', data.host)
	str = str.replace('{{parameters}}', parameter)
	console.log("Pass process parameters complete.")
	fs.writeFile('dist/index.html', str, function(err){
		if(err) throw err;
		console.log('Writerite inddex.html complete.');
	});
})

app.use('/', express.static(__dirname+'/dist/'))

app.get('/', function(req, res){
	res.redirect('index.html');
	res.end()
})
	
