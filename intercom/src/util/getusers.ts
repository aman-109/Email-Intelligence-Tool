import prisma from "../prisma.js"

export const getusers = async(shipmentno:string)=>{
     try{
        const data = await prisma.shipment.findUnique({
            where: {
                id: shipmentno
            },
            include: {
                users: true
            }
        })
       return data.users;
     }catch(e){
     }
}