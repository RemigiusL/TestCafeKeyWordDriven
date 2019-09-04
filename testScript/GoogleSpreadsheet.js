
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require ('until');


const creds = require('./client_secret.json');

async function accessSpreadsheet(){
    const doc = new GoogleSpreadsheet('1hm6_ePQHs4WR9mlqgCSIUYpf2s42uqLqKjE6AsFgCnE');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet =  info.worksheet[0];

    const rows = await promisify(sheet.getRows)({
        offset:1
    });
    console.log(rows);
}
accessSpreadsheet();

