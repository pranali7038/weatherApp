const http = require('http');
const fs = require('fs');
var requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal,orgVal)=>{
             temperature = temperature.replace("{%tempCountry%}",orgVal.main.temp);
             temperature = temperature.replace("{%templat%}",orgVal.main.templat);
             temperature = temperature.replace("{%templon%}",orgVal.main.templon);
             temperature = temperature.replace("{%location%}",orgVal.main.location);
             temperature = temperature.replace("{%tempCountry%}",orgVal.main.tempCountry);

             return temperature;
}
const server = http.createServer((req,res) =>{
    if(req.url == "/"){
        requests("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7f521f792d645fec54bd50b75eb849f7")
        
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            //console.log(arrData[0].main.name);

            const reaTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
            res.write(reaTimeData);
                
        })
        .on("end",(err) =>{
            if(err) return console.log("Connection closed due  to error");
            res.end();
        });
    }
});

server.listen(8000,"127.0.0.1");