
import "dotenv/config";
// @ts-ignore
import Sib from "sib-api-v3-sdk";
import {
    sendEmailTemplate
} from "./emailTemplate.js";

interface EmailObject {
  name: string;
  email: string;
}

interface SendTransactionalEmail {
  templateInput?: any;
  templateName: string;
  sendersData?: EmailObject;
  receiversData: {
    to: {email:string}[];
    CC?: EmailObject[];
    BCC?: EmailObject[];
    replyTo?: EmailObject;
  };
}

// Importing Email template 
const emailTemplatesMapping: any = {
    sendEmailTemplate
};



export const sendTransactionalEmail = async function (
  data: SendTransactionalEmail
) {

  try {
    // Configuration
    let defaultClient = Sib.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    let apiInstance = new Sib.TransactionalEmailsApi();
    let sendSmtpEmail = new Sib.SendSmtpEmail();

    // Selecting senders data if present OR providing default data
    sendSmtpEmail.sender = data.sendersData || {
      name: "Sufal Roongta",
      email: "sufal@intoglo.com",
    };
    sendSmtpEmail.to = data.receiversData.to;

    // Adding other optional fields if present
    if (data.receiversData.BCC) sendSmtpEmail.bcc = data.receiversData.BCC;
    if (data.receiversData.CC) sendSmtpEmail.cc = data.receiversData.CC;
    if (data.receiversData.replyTo)
      sendSmtpEmail.replyTo = data.receiversData.replyTo;

    // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234444" };
    // sendSmtpEmail.params = {
    //   parameter: "My param value",
    //   subject: "New Subject",
    // };

    // Mapping the incoming template name with the respective email template function
    const templateFn = emailTemplatesMapping[data.templateName];
    if (!templateFn) {
      return "Invalid template name";
    }

    // calling the template function after mapping
    let templateDataInput = {
      templateInput: data.templateInput,
      sendersData: data.sendersData || sendSmtpEmail.sender,
    };
    const templateData = templateFn(templateDataInput);

    sendSmtpEmail.subject = templateData.subject;
    sendSmtpEmail.htmlContent = templateData.htmlContent;
    // API call to send the email

    let email = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(email);
    
    if (!email) return false;
    return true
  } catch (error) {
    return false
  }
};

