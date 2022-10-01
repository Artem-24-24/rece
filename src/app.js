// import {XMLHttpRequest} from 'xmlhttprequest'

// Source https://www.formula1.com/en/results.html/2017/races/964/monaco/fastest-laps.html
const url  = "https://raw.githubusercontent.com/williamshen-nz/F1-Results/master/data/2017/monaco/fastest-laps.txt"
const heads = ["NO", "DRIVER", "TIME", "AVERAGE SPEED"]
const sorted = {
    asc: "ascending",
    dsc: "descending",
    none: "none"
}

class App {

    constructor() {
        const container = document.createElement('TABLE')
        document.body.appendChild(container)
        this.container = container
        this.loadData(this.prepareResults)
    }

    prepareResults(data) {
        const self = this
        const results = data.split(/\n\r?/)
            .filter(el => el.length > 8)
            .map(row => {
                const columns = row.split(",")
                return {
                    pos: columns[0],
                    no: columns[1],
                    driver: columns[2],
                    car: columns[3],
                    lap: columns[4],
                    timeOfDay: columns[5],
                    time: columns[6],
                    avgSpeed: columns[7]
                }
            })
        this.results = results
        const tableContent = this.container
        const headContent = tableContent.createTHead()
        const headRow = headContent.insertRow()
        heads.forEach((e,i) => {
            const cell = document.createElement("TH")
            headRow.append(cell)
            cell.textContent = e
            cell.addEventListener('click', self.sort.bind(self, i, cell))
        })
        const bodyContent = tableContent.createTBody()
        this.tableBody = bodyContent
        results.forEach(el => {
            const row = bodyContent.insertRow()
            row.insertCell(0).textContent = el.no
            row.insertCell(1).textContent = el.driver
            row.insertCell(2).textContent = el.time
            row.insertCell(3).textContent = el.avgSpeed
        })
        document.body.appendChild(tableContent)
    }

    loadData() {
        const self = this
        const file = new XMLHttpRequest();
        file.open("GET", url, true);

        file.onreadystatechange = () => {
            if (file.readyState === 4 && file.status === 200) {
                console.log(file.responseText)
                self.prepareResults(file.responseText)
            }
        }
        file.send();
    }

    sort(i, cell) {
        let content = this.results.map(el => Object.assign({}, el))
        if (i == 1) {
            cell.ariaSort = this.switchSort(cell.ariaSort)
            if (cell.ariaSort == sorted.asc) {
                content.sort((a, b) => a.driver.localeCompare(b.driver))
            } else if (cell.ariaSort == sorted.dsc) {
                content.sort((a, b) => -a.driver.localeCompare(b.driver))
            }
        }
        this.updateContent(content)
    }

    switchSort(sortBy) {
        if (!sortBy || sortBy == sorted.none) {
            return sorted.asc
        } else if (sortBy == sorted.asc) {
            return sorted.dsc
        } else {
            return sorted.none
        }
    }

    updateContent(data) {
        const rows = this.tableBody.rows
        data.forEach((el, i) => {
            rows[i].cells[0].textContent = el.no
            rows[i].cells[1].textContent = el.driver
            rows[i].cells[2].textContent = el.time
            rows[i].cells[3].textContent = el.avgSpeed
        })
        return undefined;
    }

}

export {App}