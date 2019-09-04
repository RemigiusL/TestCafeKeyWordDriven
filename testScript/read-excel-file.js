const readXlsxFile = require('read-excel-file/node');
 
// File path.
readXlsxFile('Keyword.xlsx').then((rows) => {
    console.log(rows[0])
  // `rows` is an array of rows
  // each row being an array of cells.
})
 
// Readable Stream.
var fs;
readXlsxFile(fs.createReadStream('Keyword.xlsx')).then((rows) => {
  console.log(rows[1])
})
