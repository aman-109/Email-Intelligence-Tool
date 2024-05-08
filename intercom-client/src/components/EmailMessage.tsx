import { useState } from "react"
import { Email } from "../types"
import { BadgeInfo, Clock, Heading1, Heart, HeartCrack, Mail, MessageSquare, User } from "lucide-react"
import moment from "moment"
import axios from "axios"

export default function EmailMessage({ message }: { message: Email }) {

    const ToneDisplay = ({ tone }: { tone: string }) => {
        return <>
            {tone === "negative" && <div className="flex items-center gap-1 rounded px-2 text-xs py-1 capitalize relative bg-red-600 text-white">
                {tone}
            </div>}
            {tone === "positive" && <div className="flex items-center gap-1 rounded px-2 text-xs py-1 capitalize relative bg-green-600 text-white">
                {tone}
            </div>}
            {tone === "informative" && <div className="flex items-center gap-1 rounded px-2 text-xs py-1 capitalize relative bg-neutral-600 text-white">
                {tone}
            </div>}
        </>
    }
    const [isOpen, setOpen] = useState(false)

    const [exceptionMessage, setExceptionMessage] = useState(message.reply)
    const [eventKeys, setEventKeys] = useState(message.eventKeys?.split(", ")[0])

    const pushException = async() => {
        try{
            const resposne = await axios.put(
                `http://localhost:8000/v1/updateshipmentplan`, 
                {
                    "userInfo": {
                        "userId": 1,
                        "firstName": "Intoglo",
                        "lastName": "Developer",
                        "aclList": []
                    },
                    "data": {
                        "shipmentId": "INGLO-100056",
                        "shipmentPlan": [
                            {
                                "milestoneId": 1,
                                "milestoneName": "Booking",
                                "events": [
                                    {
                                        "ID": 1595,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 1,
                                        "EVENTID": 30,
                                        "EVENTORDER": 7,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-18T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-18T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.367Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.639Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 30,
                                        "eventName": "Booking Confirmation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1596,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 1,
                                        "EVENTID": 33,
                                        "EVENTORDER": 14,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-18T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-18T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.367Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.644Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 33,
                                        "eventName": "Shipment Documentation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 2,
                                "milestoneName": "Origin Pickup",
                                "events": [
                                    {
                                        "ID": 1598,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 2,
                                        "EVENTID": 34,
                                        "EVENTORDER": 21,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-19T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-19T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.367Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.650Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 34,
                                        "eventName": "Origin-Pickup Initiation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1597,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 2,
                                        "EVENTID": 35,
                                        "EVENTORDER": 28,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-19T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-19T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.367Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.657Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 35,
                                        "eventName": "Origin-Pickup Completion",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1599,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 2,
                                        "EVENTID": 32,
                                        "EVENTORDER": 35,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-19T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-19T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.662Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 32,
                                        "eventName": "Customs Checklist Filing",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 14,
                                "milestoneName": "Gate In",
                                "events": [
                                    {
                                        "ID": 1600,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 14,
                                        "EVENTID": 36,
                                        "EVENTORDER": 42,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-20T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-20T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.668Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 36,
                                        "eventName": "Gate In",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 4,
                                "milestoneName": "Customs Clearance",
                                "events": [
                                    {
                                        "ID": 1601,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 4,
                                        "EVENTID": 37,
                                        "EVENTORDER": 49,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-21T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-21T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.673Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 37,
                                        "eventName": "Cargo Clearance Initiation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1602,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 4,
                                        "EVENTID": 38,
                                        "EVENTORDER": 56,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-21T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-21T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.678Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 38,
                                        "eventName": "Cargo Customs Clearance",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 16,
                                "milestoneName": "Airline Handover",
                                "events": [
                                    {
                                        "ID": 1603,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 16,
                                        "EVENTID": 58,
                                        "EVENTORDER": 63,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-22T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-22T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.684Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 58,
                                        "eventName": "Handover",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1604,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 16,
                                        "EVENTID": 59,
                                        "EVENTORDER": 70,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-22T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-22T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.690Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 59,
                                        "eventName": "Draft AWB Generation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1605,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 16,
                                        "EVENTID": 60,
                                        "EVENTORDER": 77,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-22T00:00:00.000Z",
                                        "COMPLETEDON": "2023-10-22T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.695Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 60,
                                        "eventName": "Final AWB Generation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 17,
                                "milestoneName": "In-Flight",
                                "events": [
                                    {
                                        "ID": 1606,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 17,
                                        "EVENTID": 61,
                                        "EVENTORDER": 84,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-25T00:00:00.000Z",
                                        "COMPLETEDON": "2023-11-28T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-28T10:47:10.377Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 61,
                                        "eventName": "Flight Departure",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        },
                                        "midMileTracking": {
                                            "id": 2,
                                            "linerName": "Egypt Air",
                                            "trackByType": "AWB Number",
                                            "trackingNumber": "077-58279480"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 7,
                                "milestoneName": "Arrival at Destination Port",
                                "events": [
                                    {
                                        "ID": 1607,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 7,
                                        "EVENTID": 49,
                                        "EVENTORDER": 91,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-24T00:00:00.000Z",
                                        "COMPLETEDON": "2023-11-10T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-10T09:03:30.747Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 49,
                                        "eventName": "Pre-arrival Intimation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1608,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 7,
                                        "EVENTID": 62,
                                        "EVENTORDER": 98,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-24T00:00:00.000Z",
                                        "COMPLETEDON": "2023-11-10T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.368Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-10T09:03:30.756Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 62,
                                        "eventName": "Flight Arrival",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1609,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 7,
                                        "EVENTID": 52,
                                        "EVENTORDER": 105,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-24T00:00:00.000Z",
                                        "COMPLETEDON": "2023-11-15T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-15T08:29:58.620Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 52,
                                        "eventName": "Customs Entry Filing",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1610,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 7,
                                        "EVENTID": 53,
                                        "EVENTORDER": 112,
                                        "EVENTSTATUS": "Completed",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-24T00:00:00.000Z",
                                        "COMPLETEDON": "2023-11-15T00:00:00.000Z",
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-15T08:29:58.629Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 53,
                                        "eventName": "Customs Release",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 9,
                                "milestoneName": "Pickup for Destination Delivery ",
                                "events": [
                                    {
                                        "ID": 1611,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 9,
                                        "EVENTID": 64,
                                        "EVENTORDER": 119,
                                        "EVENTSTATUS": "Exception",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-25T00:00:00.000Z",
                                        "COMPLETEDON": null,
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-16T09:44:14.626Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 64,
                                        "eventName": "Destination-Pickup Initiation",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        },
                                        "COMMENT": {
                                            "exceptionType": 1,
                                            "commentTitle": "Delay by transporter",
                                            "commentDescription": `<p>${exceptionMessage}</p>`
                                        }
                                    },
                                    {
                                        "ID": 1612,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 9,
                                        "EVENTID": 54,
                                        "EVENTORDER": 126,
                                        "EVENTSTATUS": "In Transit",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-25T00:00:00.000Z",
                                        "COMPLETEDON": null,
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-15T08:27:15.958Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 54,
                                        "eventName": "Warehouse Appointment",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    },
                                    {
                                        "ID": 1613,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 9,
                                        "EVENTID": 65,
                                        "EVENTORDER": 133,
                                        "EVENTSTATUS": "In Transit",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-25T00:00:00.000Z",
                                        "COMPLETEDON": null,
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-11-16T09:44:14.810Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 65,
                                        "eventName": "Destination-Pickup Completion",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            },
                            {
                                "milestoneId": 10,
                                "milestoneName": "Destination Delivery",
                                "events": [
                                    {
                                        "ID": 1614,
                                        "SHIPMENTID": "INGLO-100056",
                                        "MILESTONEID": 10,
                                        "EVENTID": 55,
                                        "EVENTORDER": 140,
                                        "EVENTSTATUS": "Yet To Start",
                                        "LOCATIONID": 1,
                                        "ISCHECKPOINT": 1,
                                        "ISPUBLISHED": 1,
                                        "ESTIMATEDON": null,
                                        "EXPECTEDON": "2023-10-26T00:00:00.000Z",
                                        "COMPLETEDON": null,
                                        "PLANVERSION": null,
                                        "ISCUSTOMIZED": null,
                                        "ISACTIVE": 1,
                                        "ACTIVATEDON": "2023-10-18T06:11:36.000Z",
                                        "DEACTIVATEDON": null,
                                        "INSERTEDON": "2023-10-18T06:11:36.369Z",
                                        "INSERTEDBY": "Dinesh-OPS--TEST_GLOUSER",
                                        "UPDATEDON": "2023-10-18T06:12:46.757Z",
                                        "UPDATEDBY": "OPS",
                                        "eventId": 55,
                                        "eventName": "Cargo Delivery at Destination",
                                        "allLocationData": {
                                            "ID": 1,
                                            "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                            "LOCATIONNAME": "No Location, Delhi, India",
                                            "LOCATIONTYPEID": 1,
                                            "ADDRESSBLOB": "No Address"
                                        }
                                    }
                                ],
                                "location": {
                                    "ID": 1,
                                    "LOCATIONNAMEABBR": "No Location, Delhi, IN",
                                    "LOCATIONNAME": "No Location, Delhi, India",
                                    "LOCATIONTYPEID": 1,
                                    "ADDRESSBLOB": "No Address"
                                }
                            }
                        ]
                    }
                },
                    {
                        headers: {
                            "Authorization" :  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJJbnRvZ2xvIiwiYWNsIjp7fSwiaWF0IjoxNzAyNjE4MDQwLCJleHAiOjE3MDI3MDQ0NDB9.OS8II6YYK_3xnWG5b1WOZPlzFQcdhwUQYz1V98Qj2tM"
                        }
                    }
            )
        }catch(error){
            console.log(error)
        }
    }

    return <div key={message.id} className="bg-white border w-full px-4 py-4 rounded-md flex flex-col items-start gap-2 cursor-pointer" onClick={() => message.threadEmails.length > 0 && setOpen((prev) => !prev)}>
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                {message.tone && <ToneDisplay tone={message.tone} />}
                <h1 className="font-medium">{message.subject}</h1>
            </div>

            <p className="flex items-center gap-1 text-sm text-neutral-400"><Clock className="w-4 h-4" /> {moment(message.timestamp).fromNow()}</p>
        </div>
        <p className="text-sm">{message.body}</p>
        <div className="flex items-center flex-col justify-between w-full text-sm gap-3 text-neutral-400">
            
            <div className="flex items-center justify-between gap-2 w-full">
            <p className="flex w-full items-center gap-1"><User className="w-4 h-4" /> {message.from}</p>
                <p className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {message.threadEmails.length}</p>
            </div>
            {
                        message.eventKeys && <div className="flex items-center justify-between gap-2 text-sm w-full">
                            <input type="text" className="border w-full text-neutral-900 px-4 py-2 text-sm rounded-md" value={exceptionMessage} onChange={(e) => setExceptionMessage(e.target.value)} />
                            <select className="border text-neutral-900 w-full px-4 py-2 text-sm rounded-md" value={eventKeys} onChange={(e) => setEventKeys(e.target.value)}>
                                {message.eventKeys.split(", ").map((eventKey) => <option key={eventKey} value={eventKey} >{eventKey}</option>)}
                            </select>
                            <button onClick={pushException} className="min-w-max px-4 py-2 bg-red-600 text-sm rounded-md text-white">Update to Glotrack</button>
                        </div>
                    }
        </div>
        {isOpen && <div className="ml-4 w-full pr-4" onClick={(e) => e.stopPropagation()}>
            {message.threadEmails.map((threadEmail) => <div key={threadEmail.id} className="flex flex-col items-start mt-1.5">
                <div className="flex items-start gap-2 flex-col justify-between w-full text-sm text-neutral-400 p-4 bg-neutral-50 rounded-md pb-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-start gap-1">
                            {threadEmail.tone && <ToneDisplay tone={threadEmail.tone} />}
                            <p className="flex items-center gap-1"><User className="w-4 h-4" /> {threadEmail.from}</p>
                        </div>
                        <p className="flex items-center gap-1"><Clock className="w-4 h-4" /> {moment(threadEmail.timestamp).fromNow()}</p>
                    </div>
                    <p className="text-sm text-neutral-900">{threadEmail.body}</p>
                    {
                        threadEmail.eventKeys && <div className="flex items-center justify-between gap-2 text-sm w-full">
                            <input type="text" className="border w-full text-neutral-900 px-4 py-2 text-sm rounded-md" value={exceptionMessage} onChange={(e) => setExceptionMessage(e.target.value)} />
                            <select className="border text-neutral-900 w-full px-4 py-2 text-sm rounded-md" value={eventKeys} onChange={(e) => setEventKeys(e.target.value)}>
                                {threadEmail.eventKeys.split(", ").map((eventKey) => <option key={eventKey} value={eventKey} >{eventKey}</option>)}
                            </select>
                            <button onClick={pushException} className="min-w-max px-4 py-2 bg-red-600 text-sm rounded-md text-white">Update to Glotrack</button>
                        </div>
                    }

                </div>
            </div>)}
        </div>}
    </div>
}