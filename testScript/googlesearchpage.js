import { Selector, t } from 'testcafe';

 var XLSX = require('xlsx/types')
        var workbook = XLSX.readFile('Keyword - Copy.xlsx');
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0,1,2,3,4,5,6]]);
export default class GoogleSearchPage {

    get searchbox() 
    {return  '#lst-ib';}

    constructor() {
    }

    async getTitle(){
         return Selector('title').textContent
     }

     async searchFor(searchterm){
         await t.typeText(this.searchbox, searchterm)
         await t.pressKey('enter')
     }

     async  testme(){
        xlData.forEach(element => {
       
      
            console.log(element);
        })
       
    
     }
}