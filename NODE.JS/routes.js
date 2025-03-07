
//*--------------------------------------------------------------------------------------------------------------------------------------------
//*
//*--------------------------------------------------------------------------------------------------------------------------------------------

var fs = require("fs");                          //TODO  fs modulunu import ederek hmtl sayfalarını if icinde kullanacagiz

const routeHandler = (req, res) => {
    if (req.url == "/") {                        //TODO  Sorgu sadece 3000 olursa calisir.
        res.writeHead(200, { "Content-Type": "text/html" });//TODO  "Content-Type": "text/html" ile tarayıcaya yanıtımın html oldugunu soylemıs oluyorum.
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
                    res.statusCode = 302;        //TODO  302 ile yonlendirme gerceeklestirdik.
                    res.setHeader("Location", "/");//TODO  Ana sayfaya yönlendirdik.
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

}

module.exports = routeHandler;


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


