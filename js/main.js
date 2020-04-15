dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);

const requestURL = 'https://www.gov.uk/bank-holidays.json';
const requestFile = './data/bankHolidays.json';

requestLinks = [requestURL,requestFile];

const data = 
`20/01/2020 19:22-15/02/2020 03:18
17/01/2020 19:10-18/01/2020 12:47
05/02/2020 15:53-19/02/2020 12:17:45
16/01/2020 06:03-01/03/2020 19:02
27/01/2020 00:14-01/03/2020 04:21
16/01/2020 07:51-04/02/2020 17:51
17/02/2019 08:33:12-18/02/2019 04:36:56
24/12/2019 17:51-25/12/2019 13:51`;


const btnSubmit = document.getElementById("myBtn");
const txtOutput = document.getElementById("myText");

const OpenCutoffTime = dayjs(document.getElementById('offset').value,"HH:mm");
const CloseCutoffTime = dayjs(document.getElementById('offset').value,"HH:mm").subtract(1,'minute');

const delim = '\t';
const lineSplit = '\n';

let dates = {};
let real_opened=[];
let real_closed=[];
let fos_opened=[];
let fos_closed=[];
let fos_day=[];

let storedHolidays = [];
let holidaySource = '';
getDates();

btnSubmit.addEventListener('click', async function() {
  //console.log("clicky",real_opened);
  console.log(storedHolidays);
  let t = await navigator.clipboard.readText().then(text => {return text});
  //console.log("tto",t);
  parseInput(t);
  txtOutput.value = "";

  fos_opened = Day1(real_opened,storedHolidays,OpenCutoffTime,true);
  fos_closed = Day1(real_closed,storedHolidays,OpenCutoffTime,true);
  fos_day = Networkdays(fos_opened,fos_closed,storedHolidays,1)
  
  for(let i = 0; i < real_opened.length; i++){
    txtOutput.value += fos_opened[i].format("DD/MM/YYYY") + '\t' + fos_closed[i].format("DD/MM/YYYY") + '\t' + fos_day[i] + lineSplit; 
  }

  //txtOutput.value += "end";

});

function Day1(DateTimes,BankHolidays,CutoffTime,ExcludeWeekends){

  let NewStartDate = [];
  // let StartDateTimeWithOffset = dayjs();
  
  const Midnight = dayjs("23:59:59","HH:mm").add(1,'minute');
  const OffsetMinutesToMidnight = Midnight.diff(CutoffTime,'minute');
  // console.log("Midnight,", Midnight);
  // console.log("Offset to Midnight,", OffsetMinutesToMidnight);


  for(let i = 0; i < DateTimes.length; i++){
    //console.log("Date times,",DateTimes[i]);
    let StartDateTimeWithOffset = DateTimes[i].add(OffsetMinutesToMidnight,'minute');
    NewStartDate[i] = StartDateTimeWithOffset.startOf('day');
    
    while (NewStartDate[i].get('day') == 0 || NewStartDate[i].get('day') == 6 || BankHolidays.includes(NewStartDate[i].format("DD/MM/YYYY"))){
      NewStartDate[i] = NewStartDate[i].add(1,'day');
    }
    
  }
  return NewStartDate;

}

function Networkdays(DatesFrom,DatesTo,BankHolidays,StartCount){
  let fos_day = [];
  for(let i = 0; i < DatesFrom.length; i++){
    
    counter = StartCount;
    currentDateFrom = DatesFrom[i];
    
    while (currentDateFrom.format("DD/MM/YYYY") !== DatesTo[i].format("DD/MM/YYYY")){
      if (currentDateFrom.get('day') !== 0 && currentDateFrom.get('day') !== 6 && !BankHolidays.includes(currentDateFrom.format("DD/MM/YYYY"))){
        counter++;
      }
      currentDateFrom = currentDateFrom.add(1,'day');
      //console.log(DatesFrom[i].format("DD/MM/YYYY"));
    }
    fos_day[i] = counter;
  }
  return fos_day;
}

function parseInput(data){
  
  let lines = data.split(lineSplit);
  //console.log("in parse",lines);

  for(i = 0; i < lines.length;i++)
  {
    //let line = lines[i].split(delim);
    [real_opened[i], real_closed[i]] = lines[i].split(delim);
    //console.log(line);
    
    if (dayjs(real_opened[i],"DD/MM/YYYY HH:mm:ss").isValid()){

      real_opened[i] = dayjs(real_opened[i],"DD/MM/YYYY HH:mm:ss");

    }else{

      real_opened[i] = dayjs(real_opened[i],"DD/MM/YYYY HH:mm:");

    }

    if (dayjs(real_closed[i],"DD/MM/YYYY hh:mm:ss").isValid()){

      real_closed[i] = dayjs(real_closed[i],"DD/MM/YYYY HH:mm:ss");

    }else{

      real_closed[i] = dayjs(real_closed[i],"DD/MM/YYYY HH:mm:");

    }

  }
  
  //console.log (real_opened, real_closed);
}

async function getDates() {
  //first we get the data response
  [storedHolidays, holidaySource] = await extractHolidays(requestLinks);

  //console.log("hereiam",bankHolidays);

  //console.log(storedHolidays);
  return storedHolidays;

}

async function extractHolidays(filelinks) {
  //first we get the data response
  for(let i = 0; i < filelinks.length; i++){
    let bankHolidays = await fetch(filelinks[i])
    .then((resp) => resp.json())
    .then((data) => handleDates(data))
    .then((bh) => {return bh})
    .catch(() => {
      console.log("didnt work")
    });
    if(bankHolidays !== undefined) {
      return [bankHolidays, filelinks[i]];
    }
  }
  return [bankHolidays = [], ""];
}

async function handleDates(data) {
  let justDates = [];
  let allBankHolidays = data;
  let england = allBankHolidays["england-and-wales"].events;

  for(let i = 0; i < england.length; i++){
    justDates.push(dayjs(england[i].date,"YYYY-MM-DD").format("DD/MM/YYYY"));
  }

  return justDates;

};

//console.log (bankHolidays);

  // .then((response) => response.json())
  //       .then((data) => handleDates(data))
  //       .then((bh)

  // const status = response => {
  //   if (response.status >= 200 && response.status < 300) {
  //     return Promise.resolve(response)
  //   }
  //   return Promise.reject(new Error(response.statusText))
  // }

  // console.log(status);


  //console.log(response.status);
  //.then((resp) => console.log("fetch",resp));

  // const data = await response.text();
  // console.log(data);
  



// async function getDates() {
//   //first we get the data response
//   const response = await fetch('./data/bankHolidays.json')
//   .then((resp) => console.log(resp));


//   console.log("but response: ", await response.text())

//   const status = response => {
//     if (response.status >=200 && response.status < 300){
//       console.log('got data');
//       return Promise.resolve(response);
//     }
//     console.log('not got data');
//     return Promise.reject(new Error(response.statusText));
//   } 


//   //const dataresponse = await response.json();

//   for(i = 0; i < data.length;i++)
//   {
    
//     line = data[i].split(delim);
//     [real_opened[i], real_closed[i]] = data[i].split('-');
  
//     real_opened[i] = dayjs(real_opened[i],"DD/MM/YYYY hh:mm");
//     real_closed[i] = dayjs(real_closed[i],"DD/MM/YYYY hh:mm");
  
//     if (real_opened[i].isValid() && real_closed[i].isValid()){
  
//     };
  
//   };  

// }




// //console.log(bankHolidays);



//   navigator.clipboard.readText().then(text => t.value += text);

// });


// console.log("ttt",t);