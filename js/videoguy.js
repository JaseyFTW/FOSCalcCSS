var doobie = getData();

let vardata = [];


async function getData() {
  const response = await fetch('./data/bankHolidays.json');
  const data = await response.text();
  vardata.push("potato");
  console.log(vardata);
}
