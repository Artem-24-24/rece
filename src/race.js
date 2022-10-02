const fs = require('fs');


let millis = parseTime("1:23.593")

console.log(millis)

console.log(formatMillis(millis))

fs.readFile('text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    const records = data.split('\n')

    const results = records.map(element => {
        const rows = element.split(',')
        let record = {}
        record.time = rows[5]
        //record.name = rows[2]
        //record.team = rows[3]
        return record
    })

   // const sortByTime = results.sort(it => it.time).map(it => `${it.time}, ${it.name}`)
    //const sortByName = results.sort(it => it.name).map(it => `${it.name}, ${it.time}`)
    //results.sort(it => it.team)

   // console.log(sortByTime)
    //console.log(sortByName)
});
    //     const Num = Number(1) * 60 * 1000 + Number(23) * 1000 + Number(593)
//     const Num2 = Number(1) * 60 * 1000 + Number(23) * 1000 + Number(674)
// const Xis = Num / 60
//
//
//     console.log(Num, Num2, Xis)


    let num_ms = parseTime("1:23.593")
    let num_alt = parseTime("1:23.674")

    function parseTime(time) {
        const period = time.indexOf(".")
        const colon = time.indexOf(":")

        const millis = Number(time.substr(period + 1))
        const sec = Number(time.substr(colon+1, period-colon-1))
        const minute = Number(time.substr(0, colon))
        const sum = minute * 60 * 1000 + sec * 1000 + millis
        return sum

    }


function formatMillis(millis) {
const partMillis = millis % 1000
const sec = (millis- partMillis) / 1000
const partSec = sec % 60
    const minute = (sec - partSec) / 60
    return `${minute}:${partSec}.${partMillis}`

};
