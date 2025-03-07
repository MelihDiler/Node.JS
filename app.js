//                                     ---------- NODE.JS ----------

//      ctrl + c ile node'u kapatabilirsin.
//      node app.js ile calistiriyoruz.
//      200 OK
//      400 Bad Request
//      404 Not Found
//      500 Server Error

//*--------------------------------------------------------------------------------------------------------------------------------------------
//*                                             HTTP MODULU
//*--------------------------------------------------------------------------------------------------------------------------------------------

var http = require("http");                      //*     require ile http modulunu eklemis olduk. Bu modul, web sunucusu olusturmak ve HTTP isteklerini islemek icin kullanilir.

// var server = http.createServer((req, res) => {   //*     createserver ile server objesi olusturup "server" adli objeye atama yaptik. Bu objede bir request alip ona gore cevap(res) dondurecek. Parametreler Talep ve Cevap
//     console.log(req.url, req.method);            //*     Bu tarayici console'unda degil node.js sunucusunda calisir. Cikti: / GET  -->  Sebebi locakhostta ana klasor oldugu icin "/" gozukur. Eger ki web tarayicisinda 3000/Urunler yazarsak cikti "/Urunler" olur. Get ise bir istek yapıldıgını soyler. 200 ise basarili oldugunu.
//     console.log(res.statusCode);                 //*     Çıktı: /favicon.ico GET 200.
//     res.write("<h1>ANA SAYFA</h1>");             //*     Geri döndürdüğümüz içeriği şimdilik kendimiz yazdık "ANA SAYFA".
//     res.end();                                   //*     HTTP yanıtını sonlandırır.
// })

// server.listen(3000, () => {                      //*     server 3000 portu altında hizmete açtık
//     console.log("node.js server at port 3000");  //*     server 3000 portunun çalıştığını anlamak için altına bir kod yazdık.
// });


//*--------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------------------------------------------------------------------------------
//?                                            MANUAL VERME
//?--------------------------------------------------------------------------------------------------------------------------------------------

// var server = http.createServer((req, res) => {
//     res.setHeader("Content-Type", "text/html");  //?     Header kısmında Content-Type bolumunde text/html yazisi yolladik.
//     res.statusCode = 200;                        //?     Default degerleri elle girdik.
//     res.statusMessage = "OK";                    //?     Default degerleri elle girdik.

//     res.write("<h1>ana sayfa</h1>");
//     res.end();
// })

// server.listen(3000, () => {
//     console.log("node.js server at port 3000");
// });

//?--------------------------------------------------------------------------------------------------------------------------------------------
//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//TODO
//TODO-----------------------------------------------------------------------------------------------------------------------------------------

var fs = require("fs");                          //TODO  fs modulunu import ederek hmtl sayfalarını if icinde kullanacagiz

var server = http.createServer((req, res) => {
    if (req.url == "/") {                        //TODO  Sorgu sadece 3000 olursa calisir.
        res.writeHead(200, { "Content-Type": "text/html" });
        //TODO  html dosyasi olusturmak yerine ilk basta ornek olmasi icin direkt yazdik. Diger sartlarda dosya okuyarak dogru bicimde gerceklestirilecek.
        res.write(`                              
            <html>
                <head>
                    <title>ana sayfa</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Ana Sayfa</h1>
                </body>
            </html>`);
        res.end();
    }
    else if (req.url == "/urunler") {            //TODO  Sorgu sadece urunler olursa calisir.
        fs.readFile("urunler.html", (error, html) => {//TODO  1. parametre okunacak olan dosya. Okuma islemi bittikten sonra 2. parametre olan arrow function calisir. function arrow icindeki 2. parametre olan htmli de asagida kullaniyoruz. Ust tarafta direkt yazmistik. Arrow'un 1. parametresini hata döndürme olarak ilerde deneyeceğiz.
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        });
    }
    else if (req.url == "/create" && req.method == "POST") {//TODO  /creat sayfasinda formdan bir veri girisi yaparsak çalisir.

        const data = [];                         //TODO  Birden fazla buffer olabilir diye dizi tanımlıyoruz.

        req.on("data", (chunk) => {              //TODO  on ile her bir buffer olayını yakaliyoruz. Veriler bir kerede yollanamiyor bu sebeple chunklara bolunuyor. Ornegin 4 chunk'a bolundu. İki chunkdan olusan gruplarda durak noktası olusturuluyor. Bu durak noktalarına Buffer deniyor ve on ile yakaliyoruz.
            data.push(chunk);                    //TODO  push methodu ile chunk degiskenini data dizisine atadık.
        })

        req.on("end", () => {                    //TODO  Butun durak noktalari biter ve butun bilgiler server'a aktarilinca arrow calisir.
            const result = Buffer.concat(data).toString();//TODO  Buffer.concat ile buffer'lari birlestirip ardindan binary oldugu icin stringe cevirdik.  
            const parsedData = result.split("=")[1];//TODO  result degiskeninin ciktisi "title=abcd" abcd=form kısmına yazdigin deger. Bizde = ile diziyi bolup 1. indeksi alarak sadece form tarafına girilen degeri almis olduk.

            fs.appendFile("blogs.txt", parsedData, (err) => {//TODO  blogs.txt dosyası varsa sonuna ekler, yoksa eğer oluşturur. 2. parametre ise dosyaya yazacağı değer.
                if (err) {                           //TODO  Egerki hata kodu donerse if blogu calisir.
                    console.log(err)
                } else {
                    res.statusCode = 302;            //TODO  302 ile yonlendirme gerceeklestirdik.
                    res.setHeader("Location", "/");  //TODO  Ana sayfaya yönlendirdik.
                    res.end();
                }
            })
        });



    }
    else if (req.url == "/create") {             //TODO  Sorgu sadece create olursa calisir.
        fs.readFile("create.html", (error, html) => {//TODO  1. parametre okunacak olan dosya. Okuma islemi bittikten sonra 2. parametre olan arrow function calisir. function arrow icindeki 2. parametre olan htmli de asagida kullaniyoruz. Ilk if'te direkt yazmistik. Arrow'un 1. parametresini hata döndürme olarak ilerde deneyeceğiz.
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        });

    } else {                                     //TODO  Sorgu sartlar disinda olursa calisir.
        fs.readFile("404.html", (error, html) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
        });
    }

});

server.listen(3000, () => {
    console.log("node.js server at port 3000");
});


//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------------------------------------------------------------------------------------------------
//!
//!--------------------------------------------------------------------------------------------------------------------------------------------


//!--------------------------------------------------------------------------------------------------------------------------------------------
//*--------------------------------------------------------------------------------------------------------------------------------------------
//*
//*--------------------------------------------------------------------------------------------------------------------------------------------


//*--------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------------------------------------------------------------------------------
//?
//?--------------------------------------------------------------------------------------------------------------------------------------------



//?--------------------------------------------------------------------------------------------------------------------------------------------
//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//TODO
//TODO-----------------------------------------------------------------------------------------------------------------------------------------



//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------------------------------------------------------------------------------------------------
//!
//!--------------------------------------------------------------------------------------------------------------------------------------------


//!--------------------------------------------------------------------------------------------------------------------------------------------
