
const ftp = require('basic-ftp');
const fs = require('fs');
const cus_modules = require('./CUSTOM_MODULES');
fileTransfer2G();
async function fileTransfer2G(){
    const client = new ftp.Client();
    client.ftp.verbose = true;
    let files = [];
    fs.readdir(`/home/lot/Documents/Qcell/pura/pm/pmexport_${cus_modules.dateFunction()}`,(err,data)=>{
    // fs.readdir(`/home/lot/Documents/Qcell/pura/pm/pmexport_${dateFunction()}`,(err,data)=>{
        try{
            // <*2G*KPI*TEMP*.csv>
            let regex = /[a-zA-Z0-9_]*2G[ a-zA-Z0-9_]*TEMP[a-zA-Z0-9]*.csv/;
            // let data = "pmresult_60_201904292200_201904292300_PURA 2G KPI TEMPLATE.csv";
            // data.match(regex);
    
            if(data){
                data.map((d)=>{
                    let flag = d.match(regex);
                    if(flag){
                        files.push(d);
                    }
                });
            }
            
        }catch(err){
            console.error("Sorry no such file");
            
        }
    });
    let counter = 0;
    try{
        await client.access({
            host:"10.42.0.89",
            user:"ftpuser",
            password:"4472897njieS_",
            // secure:true
        });
    }catch(error){
        console.log("Error... Server Cannot be reached.");
        const errorMessage = "<b>Please be informed that The Pura FTP Server cannot be reached.</b><br/>"+
        "<b> Thank you.</b>";
        await cus_modules.sendMail(errorMessage);
        process.exit(1);
    }
    //let fileToMove = `/home/lot/Documents/Qcell/pura/pm/pmexport_20190429/${files[i]}`;
    const filePath = `/home/lot/Documents/Qcell/pura/pm/pmexport_${cus_modules.dateFunction()}`;
    let file2Delete = "";
    while(true){
        try{
            //console.log(await client.list());
            for(let i = 0; i<files.length; i++){
                let fileToMove = filePath+"/"+files[i];
                console.log("sdfs");
                await client.uploadFrom(fileToMove, files[i]);
                file2Delete = files.splice(i,1)[0];
                cus_modules.fileBackup(`/home/lot/Documents/Qcell/pura/pm/pmexport_${cus_modules.dateFunction()}/${file2Delete}`,file2Delete,`/home/lot/NODEAPPs/ftpApp/pura_${cus_modules.dateFunction()}`)
            }
            if(files.length == 0){
                break;
            }
        }catch(err){
            counter ++;
            console.error("ERROR...");
            console.log(err);
            if(counter == 5){
                break;
            }
        }
    }
    if(files.length > 0){
        const errorMsg = "<b>Please be informed that There Are some Files Tht couldn't be transfered to the via ftp to the Pura Server.</b>"+
        "<br/><b>Please check the Network Connection issue To ensure these files are successfully sent. Thank you.</b>";
        cus_modules.sendMail(errorMsg);
    }
    client.close();
}
