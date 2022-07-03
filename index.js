const fetch = require("node-fetch");
const parse = require("node-html-parser").parse;
const fs = require("fs");

const { log } = console;

const getResult = (roll, sem, cb) => {
  fetch("https://jcboseustymca.co.in/Forms/Student/ResultStudents.aspx", {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },

    body: `__VIEWSTATE=%2FwEPDwUJOTk0Nzk4ODg3D2QWAgIDD2QWBAIJDw8WAh4EVGV4dGVkZAIPDzwrABECARAWABYAFgAMFCsAAGQYAQUIZ3ZSZXN1bHQPZ2SOX6wDaqKgJ%2BBKtObm%2BjY3l5mGojphj%2Bc1cz8pPeAMRA%3D%3D&__VIEWSTATEGENERATOR=1B3FDA92&__EVENTVALIDATION=%2FwEdAAy6TcgvK0iJ4LCP9tSO1W%2B9WB%2Ft8XsfPbhKtaDxBSD9L0L3vCrUf6dClr8hUZ8VK%2Bdmq49Iq17HcAK72c3%2FqYJC4efD0czLtBzCgdNCxdJrXXfTl3lojC6GZpStxRhSleQdRgGj%2BeSfpqun74X6HYVOGaY4EKuZNdOC597OcYFB3%2Fc3NB5nrW6pX5viR2xal9qGJXqDLNRl6Mpw%2BbZRc3LrwbR9LtIVRZpwDO1YK6L4Gy%2B%2FyJEA4EQNtbaAJJ0rSlXb4ZN0lctztE2eXfxGI1PaQEcSneiPf7AlZ4xlna9lYQ%3D%3D&txtRollNo=${roll}&ddlSem=0${sem}&btnResult=View+Result`,
    method: "POST",
  }).then((e) => {
    let cookie = e.headers.get("set-cookie").split(";")[0];
    fetch("https://jcboseustymca.co.in/Forms/Student/PrintReportCardNew.aspx", {
      headers: {
        cookie: cookie,
      },
      method: "GET",
    })
      .then((e) => e.text())
      .then((k) => cb(k))
  }).catch(err=>{
    console.log(err);
  });
};

let N, NN;
N = NN = 90;
let SEM = 3;
let base = 190200040;
let p = [];
for (let i = 1; i <= NN; i++) {
  setTimeout(() => {
    getResult(`${base}${i <= 9 ? `0${i}` : i}`, SEM, (data) => {
      try {
        let I = formater(parse(data));
        
        p.push(I);
        
      } catch (err) {
        
        log(`NOT FOUND of ${i}`);
      }
      N--;
      if (!N) {
    
        fs.writeFile(`${base}_${NN}_${SEM}.json`, JSON.stringify(p), (err) => {
          log("FILE is READY!!");
        });
      }
    });
  }, i * 200);
}

const formater = (html) => {
  let a = html.querySelectorAll("table");
  let b = {};
  let c = (c, d) => c.querySelectorAll(d);
  let e = (f) => f.innerText.trim();
  let g = (h, i) => h.split(i);
  let j = (k) =>
    k.split(" ").join("").split("\r\n").join("").split("&nbsp;").join("");

  let _3 = c(a[3], "td");
  let _4 = c(a[4], "td");
  let _5 = c(a[5], "td");

  b[g(e(_3[0]), ":")[0]] = e(_3[1]); //DMC Number
  b[g(e(_3[3]), ":")[0]] = e(_3[4]); //Regn Number
  b[g(e(_4[0]), ":")[0]] = e(_4[1]); //Regn Number
  b[g(e(_5[0]), ":")[0]] = e(_5[1]); // Name
  b[g(e(_5[2]), ":")[0]] = e(_5[3]); // Mother's Name
  b[g(e(_5[4]), ":")[0]] = e(_5[5]); // Father's Name

  let _ts = (c(a[6], "tr").length - 1) / 8;
  for (let i = 0; i < _ts; i++) {
    let __ = c(a[9 + i * 3], "tr");
    b[j(e(c(a[7 + i * 3], "td")[1]))] = [j(e(__[0])), j(e(__[1])), j(e(__[2]))];
  }

  let _7 = c(a[3 * _ts + 6 + 1], "td");
  b[g(e(_7[0]), ":")[0]] = e(_7[1]);
  b[j(g(e(_7[2]), ":")[0])] = e(_7[3]);
  b[j(g(e(_7[4]), ":")[0])] = e(_7[5]);
  b[g(e(_7[6]), ":")[0]] = e(_7[7]);
  return b;
};
