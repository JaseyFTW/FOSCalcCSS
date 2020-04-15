// var MAX_WAITING_TIME = 5000;// in ms

// var timeoutId = setTimeout(function () {
//     wrappedFetch.reject(new Error('Load timeout for resource: ' + params.url));// reject on timeout
// }, MAX_WAITING_TIME);

// return wrappedFetch.promise// getting clear promise from wrapped
//     .then(function (response) {
//         clearTimeout(timeoutId);
//         return response;
//     });



//var endpoint = 'https://www.gov.uk/bank-holidays.json';
let requestURL = 'https://www.gov.uk/bank-holidays.json';
let requestFile = './data/bankHolidays.json';




// const t = fetch(requestURL)
//       .then((response) => response.json())
//       .then((data) => handleDates(data))
//       .then((bh) => {return bh});


//       t.then((result) => console.log("say wha? ,", result));

// function jsondata(){
//   return fetch(requestURL)
//         .then((response) => response.json())
//         .then((data) => handleDates(data))
//         .then((bh) => resolve(bh));
// }

// console.log(jsondata());

// function scaryClown(){

//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('raa');
//     },2000);
//   });
// }

// async function msg(){
//   const msg = await scaryClown();
//   console.log("cnl,",msg);
//   return "chips";
// }

// msg();
// msg();
// msg();
// mymsg = msg();
// console.log("mm",mymsg);

// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {

//   const requestData = request.response;
//   //console.log(handleDates(requestData));

// }

// var fileReader = new FileReader(); 
// fileReader.onload = function (e) { 

// } 
// fileReader.readAsText('data/bankHolidays.json'); 
//see the link above to see where the variable fileTobeRead comes from.

//var json = JSON.parse(freadFileSync('data/bankHolidays.json').toString());

//const endpoint = "./data/bankHolidays.json"

//console.log(endpoint);

// let $bankHolidays = endpoint;

// console.log(handleDates());

// let potato = [];

// fetch(endpoint)
// .then(function(response) {
//   potato = response.json();
// console.log("1. ", potato);
// }).then(function(data) {
//   console.log(data);
// }).catch(function() {
//   console.log("Booo");
// });

// // fetch(endpoint)
// // .then(function(response) {
// //   return response.json();
// // }).then(function(data) {
// //   console.log(data);
// // }).catch(function() {
// //   console.log("Booo");
// // });

// console.log(data);



// var xmlHttp = new XMLHttpRequest();

// xmlHttp.onreadystatechange = function() { 
//   if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//       callback(xmlHttp.responseText);
// }
// xmlHttp.open("GET", endpoint, true); // true for asynchronous 
// xmlHttp.send(null);
// console.log(xmlHttp.responseText);





// var client = new HttpClient();
// client.get(endpoint, function(response) {
//     // do something with response
// });

//let myRequest = new JSON(endpoint);
//let myRequest = (new Request(endpoint)).json();
//console.log(myRequest.json());

// const bankHolidays = () => {
//   return fetch(endpoint)
//   .then((res => res.json())
//   .then(hols => console.log(hols)));
// };
//console.log(getDates(endpoint));
//console.log(getDates(endpoint));

// let $bbh;
// let $ju = getDates(endpoint);
// console.log("juju", $ju);
// // console.log("hhh", $bhh);
// ;
// // console.log("woo, ", bankHolidays);
// function getDates(url)
// {
//   fetch(url)
//       .then((response) => response.json())
//       .then((data) => handleDates(data))
//       .then((bh) => {
//           //console.log("bh",bh);
//           //let $bbh = bh;
//           //return bh;
//           return 12345;
//       });
// }
     
//console.log(getDates(endpoint));

// function handleDates(data) {
//   let justDates = [];
//   let allBankHolidays = data;
//   let england = allBankHolidays["england-and-wales"].events;

//   for(let i = 0; i < england.length; i++){
//     justDates.push(dayjs(england[i].date,"YYYY-MM-DD").format("DD/MM/YYYY"));
//   }
//   //console.log ("in funct:", justDates);
//   const $bankHolidays = justDates;
//   //console.log("infffffff", justDates);
//   return justDates;

// };

//console.log(bankHolidays);