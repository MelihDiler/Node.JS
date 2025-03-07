
//*--------------------------------------------------------------------------------------------------------------------------------------------
//*                                             EXPRESS.JS
//*--------------------------------------------------------------------------------------------------------------------------------------------

// const express = require("express");              //*     Kutuphaneyi ekledik.

// const app = express();                           //*     expres'in icindekiler export edildiği icin fonksiyona karsilik geliyor. Bir uygulamaya ihtiyacimiz oldugu icinde "app" ile uygulama tanimladik.

// app.use((req, res) => {                          //*     use komutu her istek icin calisacak bir fonksiyon ekler.
//     res.end("Hello");                            //*     end ile response'un kapandigini belirttik.
// });

// app.listen(3000, function () {
//     console.log("listening on port 3000");
// });
//*--------------------------------------------------------------------------------------------------------------------------------------------
//?--------------------------------------------------------------------------------------------------------------------------------------------
//?                                              NODEMON
//?--------------------------------------------------------------------------------------------------------------------------------------------

//?     Gelistirme asamasinda ctrl + c ile node'u durdurup sonrasinda tekrar node index.js ile calistirma yapmamak icin otomatiklestiren bir kutuphanedir.
//?     nodemon calistirmak icin node index.js yerine npx nodemon yazıyoruz. nodemon bir kutuphane olduguicin npx yazdik.
//?     index.js varsayilan dosyamizdir. Bu sebeple baska calistirmak istersek eger npx nodemon app.js seklinde calistiririz.

//?--------------------------------------------------------------------------------------------------------------------------------------------
//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//TODO                                          MIDDLEWARE
//TODO-----------------------------------------------------------------------------------------------------------------------------------------

//TODO  Middleware, Express.js gibi çerçevelerde istekler işlenirken araya girip ekstra işlemler yapan özel fonksiyonlardır.

const express = require("express");              //*     Kutuphaneyi ekledik.

const app = express();                           //*     expres'in icindekiler export edildiği icin fonksiyona karsilik geliyor. Bir uygulamaya ihtiyacimiz oldugu icinde "app" ile uygulama tanimladik.

app.use((req, res, next) => {                    //*     use komutu her istek icin calisacak bir fonksiyon ekler.
    console.log("Middleware 1");                 //*     console'a calistigini kontrol etmek icin calistirdik.
    next();                                      //*     Bir sonraki katmana gecisi saglar.
});

app.use((req, res, next) => {                    //*     use komutu her istek icin calisacak bir fonksiyon ekler.
    console.log("Middleware 2");                 //*     console'a calistigini kontrol etmek icin calistirdik.
    next();                                      //*     Bir sonraki katmana gecisi saglar.
});

app.use((req, res, next) => {                    //*     use komutu her istek icin calisacak bir fonksiyon ekler.
    console.log("Middleware 3");                 //*     console'a calistigini kontrol etmek icin calistirdik.
    res.send("<h1>homepage</h1>");               //*     send hem mesaj yollar hem de end gorevi gorur.
});

app.listen(3000, function () {
    console.log("listening on port 3000");
});

//TODO-----------------------------------------------------------------------------------------------------------------------------------------
//!--------------------------------------------------------------------------------------------------------------------------------------------
//!
//!--------------------------------------------------------------------------------------------------------------------------------------------


//!--------------------------------------------------------------------------------------------------------------------------------------------

