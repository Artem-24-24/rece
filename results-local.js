// Read file from server
const path = "results.txt"
const fs = require("fs");

fs.readFile(path, (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
});