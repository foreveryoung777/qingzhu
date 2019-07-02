const express = require('express')
const http = require('http')
const fs = require('fs')

let app = express()

let server= http.createServer(app).listen(7000,function(){
    console.log(`listen at 7000`)
})

let data = {appId: "", nodeId: "", host: ""}

app.use('/static', express.static(__dirname+'/dist/static'))

let appIdIndex = -1
let nodeIdIndex = -1
let hostIndex = -1

let allArguments = process.argv

//for(let i=2; i < allArguments.length; ++i){
	//let cur = allArguments[i]
	//console.log("test" + cur + "," + cur.slice(9) )
	//if(/^(--stream-)/.test(cur) && data[cur.slice(8)] !== undefined){
		//data[cur.slice(8)] = allArguments[++i]
	//}
//}

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
console.log("Get process parameters id: " + data.id + ", nodeId: " + data.nodeId+ " host: " + data.host)

app.get('/index.html', function(req, res, next){
	console.log("Read index html.")
	fs.readFile('dist/index.html', 'utf-8', function(err, str){
		if (err) {
			throw err
		}
		str = str.replace('{{appId}}', data.id)
		str = str.replace('{{nodeId}}', data.nodeId)
		str = str.replace('{{host}}', data.host)
		console.log("Pass process parameters complete.")
		res.send(str)
	})
})

	
