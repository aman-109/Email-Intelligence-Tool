import { whatsAppTemplate } from "./whatsAppTemplate.js";

export const sendWhatsappAlert = async(users:any,shipmentNo)=>{
   console.log("users - for wa ",users);
   for (const user of users)
   {
      const data = await whatsAppTemplate(user.name,user.phone,shipmentNo);
      console.log("wa alert",data);
   }
}