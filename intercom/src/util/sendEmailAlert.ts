import { sendTransactionalEmail } from "./sendinBlueConfig.js";

export const sendEmailAlert = async(users,shipmentno)=>{
    for(const user of users){
      let EmailData :any= {
        templateInput: {
          name: user.name,
          shipmentid:shipmentno,
        },
        templateName: "sendEmailTemplate",
        sendersData: {
          name: "saradhi",
          email: "vijaya.saradhi@intoglo.com",
        },
        receiversData: {
          to: [{ email: user.email }],
        },
    };
    let status = await sendTransactionalEmail(EmailData);
    console.log("email-status",status);
    }
}