const http = require("http");
const fs = require("fs");
// laeme mooduli päringu küsimiseks
const url = require("url");
//failitee module
const path = require("path");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Sten Kreek, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="vp_banner_2025_TA.jpg" alt="vp banner">'
const pageBody = '\t<h1>Sten Kreek, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	// küsin urli
	console.log("Päring: " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("Parsituna: " + currentUrl.pathname);
	// lisaparameetreid ei arvestata nt kui teen :5133/?!#asdasdasdasdas
	// favicon pagei üleval olev logo
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
			res.write(pageFoot);
			return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad/"){
	
	res.writeHead(200, {"Content-type": "text/html"});
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
			res.write(pageFoot);
			return res.end();
		} else {
			let folkWisdom = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < folkWisdom.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageFoot);
			return res.end();
			}
		});
	}
	
	else if(currentUrl.pathname === "/vp_banner_2025_TA.jpg"){
	// liidame muidu kättesaamatu piltide kausta
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/jpeg"})
				res.end(data);
			}
		});
	}
}).listen(5313);