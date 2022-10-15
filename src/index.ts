import express from 'express';


let sharp = require('sharp');
const app = express();
const port = 3000;

app.get('/api', function(req, res) {
    const width = req.query.width ; 
    const height = req.query.height ; 
    const photoname = req.query.photoname ;

    let fs = require('fs');
    
   
    if (fs.existsSync('./thumbnails')){
        let folder = 'thumbnails' ; 
        let files = fs.readdirSync(folder) ; 
        for (const file of files) {  
            if(`${photoname}_${width}_${height}.png` == file)
                break
        }
        sharp(`./image/${photoname}`)
        .resize(Number(width), Number(height))
        .toFile(`thumbnails/${photoname}_${width}_${height}.png`);
        console.log(files)
    }else{
        fs.mkdirSync('./thumbnails');
        sharp(`./image/${photoname}`)
        .resize(Number(width), Number(height))
        .toFile(`thumbnails/${photoname}_${width}_${height}.png`);
}
  });

app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
    });