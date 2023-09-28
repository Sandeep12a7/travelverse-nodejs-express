var express = require('express'); 
var app = express();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key1.json");
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();
const bp = require("body-parser");
const ejs = require("ejs")
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const axios = require('axios');
const { messaging } = require('firebase-admin');
app.use(express.static("public"));
var passwordHash = require('password-hash');
app.get('/signup', function (req, res) {  
    res.render(__dirname+'/views/'+'sign.ejs',{Response:""})  
    }) ;
app.post('/login', function (req, res) {  
        db.collection('data').where('Email','==',req.body.email)
        .get()
        .then((docs)=>{
                if(docs.size>0){
                        res.render(__dirname+'/views/'+'sign.ejs',{Response:"Email Already Existed!!!"})
                }
                else{
                if(req.body.password!==req.body.re_password){
                        res.render(__dirname+'/views/'+'sign.ejs',{Response:"Password not matched!!!"})
                }
                else{
                        db.collection('data').add({
                                Email:req.body.email,
                                Password: passwordHash.generate(req.body.password),
                                
                                
                        
                            })
                        res.render(__dirname+'/views/'+'login.ejs',{Response:"Successfully Registered!!!"});

                }
        }
})
    });

    app.get('/login', function (req, res) {  
        res.render(__dirname+'/views/'+'login.ejs',{Response:""})  
        }); 
    app.post('/states', function (req, res) {  
        db.collection('data').where('Email','==',req.body.email).get().then((docs)=>{
            let verified=false;
            docs.forEach((doc)=>{
                    verified=passwordHash.verify(req.body.password, doc.data().Password);
            });
            if(verified){
                    res.render("states")
            
            
            
            }
            else{
                res.render(__dirname+'/views/'+'login.ejs',{Response:"Invalid credentials"})
            }
        }).catch((error) =>{
            console.error(error)
            res.redirect('/login')
        })
    });

  
              
                
                    
app.get('/araku', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=araku&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("araku", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/bhadrachalam', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=bhadrachalam&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("bhadrachalam", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/birlamandir', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=hyderabad&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("birlamandir", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });  
app.get('/charminar', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=hyderabad&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("charminar", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/cochin', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=cochin&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("cochin", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/coimbatore', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=coimbatore&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("coimbator", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/gokarna', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=gokarna&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("gokarna", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });  
app.get('/golconda', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=golconda&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("golconda", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });  
app.get('/hampi', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=hampi&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("hampi", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });  
app.get('/kabini', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=kabini&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("kabini", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });  
app.get('/kanyakumari', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=kanyakumari&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("kanyakumari", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/kodaikanal', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=kodaikanal&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("kodaikanal", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/kollam', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=kollam&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("kollam", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/madurai', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=madurai&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("madurai", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/chikmagalur', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=chikmagalur&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("chikmagalur", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/munnar', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=munnar&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("munnar", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/mysore', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=mysore&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("mysore", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/nandihills', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=nandi hills&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("nandihills", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/ooty', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=ooty&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("ooty", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/papikondhalu', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=papikondalu hills&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("papikondhalu", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/pondicherry', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=pondicherry&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("pondicherry", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/rajahmundry', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=rajahmundry&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("rajahmundry", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/tirupati', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=tirupati&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("tirupati", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/trissur', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=trissur&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("trissur", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/trivandrum', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=trivandrum&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("trivandrum", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/vanjangi', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=vanjangi hills&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("vanjangi", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        });
app.get('/vijayawada', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=vijayawada&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("vijayawada", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/vizag', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=visakhapatnam&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("vizag", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/warangal', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=warangal&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("warangal", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/wayanad', function (req, res) {  
        const Api = `https://api.weatherapi.com/v1/current.json?key=adae5ddaa84d40e9897181855232408&q=kerala&aqi=no`;
                axios.get(Api).then((response) => {
                  res.render("wayanad", {temp:response.data.current.temp_c, climate:response.data.current.condition.text,humidity:response.data.current.humidity,windspeed:response.data.current.wind_kph});
                }); 
        }); 
app.get('/andhra', function (req, res) {  
        res.render(__dirname+'/andhra.ejs')  
        }); 

app.get('/tamilnadu', function (req, res) {  
        res.render(__dirname+'/tamilnadu.ejs')  
        }); 
app.get('/telangana', function (req, res) {  
        res.render(__dirname+'/telangana.ejs')  
        }); 
app.get('/karnataka', function (req, res) {  
        res.render(__dirname+'/karnataka.ejs')  
        }); 
app.get('/kerala', function (req, res) {  
        res.render(__dirname+'/kerala.ejs')  
        }); 




app.listen(3002);