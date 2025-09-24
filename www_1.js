const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n<meta charset="utf-8">\n<title>Sten Kreek, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '<h1>Sten Kreek, veebiprogrammeerimine</h1>\n<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n<hr>';
const pageEnd = '</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Juhhei! Läkski käima!");
	res.write(pageStart);
	res.write(pageBody);
	res.write("<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate()+ "</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5313);