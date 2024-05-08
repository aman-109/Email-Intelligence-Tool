import axios from "axios";

export const whatsAppTemplate = async(name,phoneNumber,shipmentNo)=>{
    let data = JSON.stringify({
        "channelId": "6451fcdfe958f412f36a7456",
        "channelType": "whatsapp",
        "recipient": {
          "name": name,
          "phone": `91${phoneNumber}`
        },
        "whatsapp": {
          "type": "template",
          "template": {
            "templateName": "hackthon_template",
            "bodyValues": {
              "name": name,
              "shipment_number": shipmentNo
            }
          }
        }
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.gallabox.com/devapi/messages/whatsapp',
        headers: { 
          'Content-Type': 'application/json', 
          'apiKey': process.env.WHATSAPP_TEMPLATE_API_KEY, 
          'apiSecret': process.env.WHATSAPP_SECRET_API_KEY, 
          'Cookie': 'connect.sid=s%3ArTU1BgbUChGM1WbPpmc7pPDPnXK_cd9V.zIYDJns7oVvkF%2FR1bIksiI2KLdFJL%2Fnr9CPIhY4OAi0'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}