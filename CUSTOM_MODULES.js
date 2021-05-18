const nodemailer = require("nodemailer");
const fs = require('fs');



const fileBackup = (sourceName,destinationName,destinationFolder)=>{
  fs.readdir(destinationFolder,(err)=>{
    if(err){
      fs.mkdir(destinationFolder,(err)=>{
        if(err){
          console.log("Error unable to create folder in this directory.");
        }
        else{
          fs.rename(sourceName,`${destinationFolder}/${destinationName}`,(err)=>{

          })
        }
      })
    }
    
    else{
      fs.rename(sourceName,`${destinationFolder}/${destinationName}`,(err)=>{
        if (err){
          console.log("Error Sorry NO such file exists.");
        }
        else{
          console.log("File Successfully Sent. Thank you.");
        }
      });
    }
  })
/*
  
  */
};


const sendMail = async (message)=> {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "testmailsend363@gmail.com", // generated ethereal user
      pass: "sendmail_123", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Warning!!!"', // sender address
    to: "lamin.touray1@qcell.gm,lo2raymoori@gmail.com", // list of receivers
    subject: "Error 🙋", // Subject line
    html: message, // html body

  });
}

/*
5900095
bought 95
poweramount 73.91 When actually it should be 85
Service fee = 10;
6.8 8.4
*/
const  dateFunction = ()=>{
  const d = new Date();
  let date = d.toDateString();
  let dateMassage = date.split(" ");
  let monthNo = "";
  switch(dateMassage[1]){
      case "Jan":
      monthNo = "01";
      break;
      case "Feb":
      monthNo = "02";
      break;
      case "Mar":
      monthNo = "03";
      break;
      case "Apr":
      monthNo = "04";
      break;
      case "May":
      monthNo = "05";
      break;
      case "Jun":
      monthNo = "01";
      break;
      case "Jul":
      monthNo = "01";
      break;
      case "Aug":
      monthNo = "01";
      break;
      case "Sep":
      monthNo = "03";
      break;
      case "Oct":
      monthNo = "04";
      break;
      case "Nov":
      monthNo = "05";
      break;
      case "Dec":
      monthNo = "01";
      break;
  }
  const finalDate = dateMassage[3]+""+monthNo+""+dateMassage[2];
  return finalDate;
}

module.exports = {
  sendMail : sendMail,
  dateFunction : dateFunction,
  fileBackup:fileBackup
}