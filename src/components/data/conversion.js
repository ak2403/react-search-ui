var Converter = require("csvtojson").Converter;
var fs = require('fs');
var converter = new Converter({});

converter.fromFile("./ign.csv",function(err,result){
    if(err){
        console.log("An Error Has Occured");
        console.log(err);  
    } 
    var json = result;
    fs.writeFile('ign.json', JSON.stringify(json));
});