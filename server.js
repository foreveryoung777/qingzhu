const express = require("express");
const http = require("http");
const fs = require("fs");
let app = express();

let server = http.createServer(app).listen(7000, function () {
  console.log(`listen at 7000`);
});

let appIdIndex = -1;
let nodeIdIndex = -1;
let hostIndex = -1;
let backendUrlIndex = -1;

let allArguments = process.argv;

allArguments.forEach((val, index) => {
  if (val == "--stream-app-id") {
    appIdIndex = index + 1;
  }
  if (val == "--stream-node-id") {
    nodeIdIndex = index + 1;
  }
  if (val == "--stream-host") {
    hostIndex = index + 1;
  }
  if (val == "--backendUrl") {
    backendUrlIndex = index + 1;
  }
});

const trim = (str) => {
	return str.slice(str.indexOf("'") + 1, str.lastIndexOf("'"));
}

const data = {
  appId: allArguments[appIdIndex],
  nodeId: allArguments[nodeIdIndex],
  url: trim(allArguments[hostIndex]),
  parameters: { backendUrl: trim(allArguments[backendUrlIndex]) },
};

console.log(
  `Get process parameters appId: ${data.appId}, nodeId: ${data.nodeId}, url: ${data.url}, parameters: ${JSON.stringify(data.parameters)}`
);

fs.readFile("dist/index.html", "utf-8", function (err, str) {
  console.log("Modify index.html.");
  if (err) {
    throw err;
  }
  str = str.replace("{{appConfig}}", JSON.stringify(data));
  console.log("Pass process parameters complete.");
  fs.writeFile("dist/index.html", str, function (err) {
    if (err) throw err;
    console.log("Writerite inddex.html complete.");
  });
});

app.use("/", express.static(__dirname + "/dist/"));

app.get("/", function (req, res) {
  res.redirect("index.html");
  res.end();
});
