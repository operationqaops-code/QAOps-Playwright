const ExcelJs=require('exceljs');
const {test,expect}=require('@playwright/test');

async function WriteExcel(serachText,replaceText,change,writeFilePath){

   
    const workBook=new ExcelJs.Workbook();
    await workBook.xlsx.readFile(writeFilePath);
    const workSheet=workBook.getWorksheet('Sheet1');
   
    const output=await readExcel(workSheet,serachText);

    const Cell=workSheet.getCell(output.row,output.column + change.colChange);
    Cell.value=replaceText;
    await workBook.xlsx.writeFile(writeFilePath);
    

}

async function readExcel(workSheet,serachText){
     let output={row:-1,column:-1};
     workSheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell,colNumber)=>{

            //console.log(cell.value);
            if(cell.value===serachText)
            {
                output.row=rowNumber;
                output.column=colNumber;
              
                
            }
            
        })

    })
    return output;
}

//WriteExcel("Banana","Republic","D:/excelFile/excelDownloadTest.xlsx");

test('download,update,upload & validation of excel file',async({page})=>{

await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

const downloadPromise=page.waitForEvent("download");
await page.getByRole('button',{name:'Download'}).click();
await downloadPromise;

WriteExcel("Apple",350,{rowChange:0,colChange:2},"C:/Users/abdul/Downloads/download.xlsx");
page.locator("#fileinput").click();
page.locator("#fileinput").setInputFiles("C:/Users/abdul/Downloads/download.xlsx");


})
