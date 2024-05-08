interface sendTemplateInput {
    templateInput: any;
    sendersData: { name: string; email: string };
}
  
interface TemplateFnReturnType {
    subject: string;
    htmlContent: string;
}

export const sendEmailTemplate = (
    data: sendTemplateInput
  ): TemplateFnReturnType => {
    let clientName = data.templateInput?.name;
    let shipmentid = data.templateInput?.shipmentid;
    return {
      subject: `Enquiry is created`,
      htmlContent: `<p>Hi ${clientName}, </p>
      <p>An enquiry has been submitted with shipment no ${shipmentid}</p>
      <p>Here are the details :</p>
      <div></div>  
      <div>
      <strong>Thanks,</strong>
      </div>
      <div>Glo View</div>
        `,
    };
  };