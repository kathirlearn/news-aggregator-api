const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname,'..','users.json');

const saveTasks = (tasks) => {
    const data = JSON.stringify(tasks);
        fs.writeFile(dataFilePath, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Tasks saved successfully');
        }
    });
};

module.exports = {
    saveTasks,
}