const express = require('express');
const app = express();

const path = require('path');

const hbs = require('hbs');

const requests = require("requests");

const staticPath = path.join(__dirname,"/public");

//builtin middleware
//app.use(express.static(staticPath));

const templatePath = path.join(__dirname,"./template")
const partial_path = path.join(__dirname,'./template/partials');

app.set('view engine','hbs');
app.set('views',templatePath);

hbs.registerPartials(partial_path);

//template engine route

app.get("/",(req,res)=>{
    res.render('index',{
        location: req.query.name,
        tempval: req.query.temp,
    });
});

app.get("/", (req, res) => {   
    res.send("Hello World from Ram"); 
});
app.get("/about", (req, res) => {
    //console.log(req.query.name)
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name},In&APPID=b97d45f5d894e2544e69405da646018e`
    )
    .on("data",(chunk) => {
        const obj_data = JSON.parse(chunk);
        const arr_data = [obj_data];
        console.log(`Current data temp is ${arr_data[0].main.temp}` );
        // const realTimeData = arr_data.map((val)=> replaceVal(mainFile,val));
        //  res.write(realTimeData.join(''));
        //  console.log(realTimeData.join(""));
        
    res.send(arr_data[0].name);
})});
app.get("*",(req,res)=>{
    res.render("404",{
        comment :"Error 404,Page not found",
    });
});

app.listen(8000, () => {
    console.log("listening to 8000");
});

