const fs = require('fs');
const https =require('https');
console.log("Hello from async.js");


fs.readFileSync('./Water Scarcity.pdf','utf-8'); //blocking code, takes more time to execute
console.log("File read synchronously");

https.get("https://dummyjson.com/products",(res)=>{ //take less time than fs to execute
  console.log("Fetched data successfully");
})

setTimeout(()=>{
  console.log("This is from setTimeout");  //take more time to execute
} ,2000);

fs.readFile('./check.txt','utf-8',(err,data)=>{ //executed less than 20 millisec
  if(err){
    console.log("Error reading file", err);
  } else {
    console.log("File data:", data);
  }
});


function add(a, b) {
  return a + b;
}

let c = add(3, 7);;
console.log(c);
module.exports = { add };