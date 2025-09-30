const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Sten Kreek, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Sten Kreek, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageBanner = '<img src="images/vp_banner_2025_AA.jpg" alt="Kursuse bänner">';
const pageEnd = '\n</body>\n</html>';
http.createServer(function(req, res){
    console.log("Praegune URL: " + req.url);
    let currentUrl = url.parse(req.url, true);
    console.log("Puhas url: " + currentUrl.pathname);

    if(currentUrl.pathname === "/"){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageStart);
        res.write(pageBanner);
        res.write(pageBody);
        res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
        res.write('\n\t<p>Vaata ka valikut <a href="/vanasonad">vanasõnu</a> või <a href="/hobid">hobisid</a>.</p>');
        res.write(pageEnd);
        return res.end();
    }
    else if(currentUrl.pathname === "/vanasonad"){
        res.writeHead(200, {"Content-type": "text/html"});
        fs.readFile(textRef, "utf8", (err, data)=>{
            res.write(pageStart);
            res.write(pageBanner);
            res.write(pageBody);
            res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
            if(err){
                res.write("<p>Midagi pole pakkuda praegu!</p>");
            } else {
                let oldWisdomList = data.split(";");
                let folkWisdomOutput = "\n\t<ol>";
                for (let i = 0; i < oldWisdomList.length; i++){
                    folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
                }
                folkWisdomOutput += "\n\t</ol>";
                res.write("\n\t<h2>Valik Eesti vanasõnu</h2>");
                res.write(folkWisdomOutput);
            }
            res.write(pageEnd);
            return res.end();
        });
    }
    else if(currentUrl.pathname === "/hobid"){
        res.writeHead(200, {"Content-type": "text/html"});
        let hobbies = [
            {name: "Minu lemmik jõusaal", url: "https://24-7fitness.ee/"},
            {name: "Y8", url: "https://www.y8.com/"},
            {name: "Kodeerimine ja IT", url: "https://www.codecademy.com"}
        ];

        let hobbiesList = "\n\t<ul>";
        for(let i = 0; i < hobbies.length; i++){
            hobbiesList += `\n\t\t<li><a href="${hobbies[i].url}" target="_blank">${hobbies[i].name}</a></li>`;
        }
        hobbiesList += "\n\t</ul>";

        res.write(pageStart);
        res.write(pageBanner);
        res.write(pageBody);
        res.write("\n\t<h2>Minu hobid</h2>");
        res.write(hobbiesList);
        res.write('\n\t<img src="images/landscape.jpg" alt="Minu hobi foto" style="max-width:300px;">');
        res.write(pageEnd);
        return res.end();
    }
    else if(currentUrl.pathname.startsWith("/images/")){
        let imgPath = path.join(__dirname, currentUrl.pathname);
        fs.readFile(imgPath, (err, data)=>{
            if(err){
                res.writeHead(404);
                res.end("Pilt puudub!");
            } else {
                res.writeHead(200, {"Content-type": "image/jpeg"});
                res.end(data);
            }
        });
    }
    else {
        res.writeHead(404, {"Content-type": "text/html"});
        res.end("<h1>404</h1><p>Sellist lehte ei ole olemas!</p>");
    }

}).listen(5313);