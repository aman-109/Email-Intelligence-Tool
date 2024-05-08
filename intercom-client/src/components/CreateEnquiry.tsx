import { useContext, useEffect, useState } from "react";
import { Enqiry, User } from "../types";
import { AppContext } from "../AppContext";
import { baseUrl } from "../utils";
import { TESelect } from "tw-elements-react";
import { SuccessMessage } from "./SuccessMessage";
import axios from "axios";
import Loader from "./Loader";

export default function CreateEnquiry() {
  const [openForm, setOpenForm] = useState(false);
  const { currentUser } = useContext(AppContext);
  const [allUsers, setAllUsers] = useState<User[]>();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEnquirySaved, setEnquirySaved] = useState<Boolean | null>(null);
  const [enqiryData, setEnqueryData] = useState<Enqiry>({
    alias:"",
    leadType: "",
    client: "",
    organizationName: "",
    POC: "",
    phoneNumber: "",
    email: "",
    mode: "",
    movementType: "",
    freightClass: "",
    incoterms: "",
    goGreen: false,
    productDescription: "",
    hsCode: "",
    freightPayment: "",
    additionalServices: "",
  });
  //Open Form modal
  const openFormModal = () => {
    setOpenForm(true);
  };

  //Close Form modal
  const closeFormModal = () => {
    setOpenForm(false);
  };

  //handle function for form
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setEnqueryData({
        ...enqiryData,
        [name]: checked,
      });
    } else {
      setEnqueryData({
        ...enqiryData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const endpoint = "/users";
      try {
        const response = await axios.get(`${baseUrl}${endpoint}`);
        const data: User[] = response.data;
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const toggleOption = (option: string) => {
    setSelectedUsers((prevSelectedOptions: any) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (prevOption: any) => prevOption !== option
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  function formatData(object1: any) {
    let object2: any = {
      alias: '',
      cargowiseId: '',
      mode: "",
      freightClass: "",
      originAddress: "",
      destinationAddress: "",
      goGreen: '',
      users: selectedUsers,
    };
    let metaData: any = {};
    for (let key in object1) {
      if (object2.hasOwnProperty(key)) {
        object2[key] = object1[key];
      } else {
        metaData[key] = object1[key];
      }
    }
    if (Object.keys(metaData).length > 0) {
      object2["metaData"] = metaData;
    }
    return object2;
  }

  //Submit the form for enquiry
  const enquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnquirySaved(false);
    const formattedData = formatData(enqiryData);
    try {
      const response = await fetch(`${baseUrl}/shipments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      console.log("response", response);
      if (response.ok) {
        // Handle success
        setEnquirySaved(true);
        setTimeout(() => {
          closeFormModal();
        }, 2000);
        console.log("Form data submitted successfully");
      } else {
        // Handle error
        console.error("Error submitting form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  return (
    <>
      <div>
        <button
          onClick={openFormModal}
          className="px-4 py-2 text-xs bg-neutral-800 text-white rounded-md"
        >
          Create Enquiry
        </button>
      </div>

      {openForm && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-5xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-lg border border-gray-300">
              {isEnquirySaved == true ? (
                <>
                  <SuccessMessage />
                </>
              ) : isEnquirySaved == false ? <><Loader/></> : (
                <>
                  <div className="flex items-center justify-between p-4 md:p-5 h-12 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Create Enquiry
                    </h3>
                    <button
                      type="button"
                      onClick={closeFormModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      data-modal-hide="default-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form onSubmit={enquirySubmit}>
                    <div className="p-4 md:p-5 space-y-1 flex justify-evenly">

                       <div>
                       <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="alias"
                            id="alias"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Shipment Name
                          </label>
                        </div>
                      </div>
                       <div className="grid md:grid-cols-2 md:gap-6 h-14">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            required
                            onChange={(e) => handleChange(e)}
                            id="leadType"
                            name="leadType"
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="New Client">New Client</option>
                            <option value="Existing Lead">Existing Lead</option>
                            <option value="Existing Client">
                              Existing Client
                            </option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            required
                            onChange={(e) => handleChange(e)}
                            id="client"
                            name="client"
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Select Client">Select Client</option>
                            <option value="Nyka">Nyka</option>
                            <option value="Incnut">Incnut</option>
                            <option value="Hindhcha">Hindhcha</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="organizationName"
                            id="organizationName"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Organization Name
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="POC"
                            id="POC"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            POC
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone number
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                          </label>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="mode"
                            name="mode"
                            onChange={(e) => handleChange(e)}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Mode">Mode</option>
                            <option value="Air">Air</option>
                            <option value="Sea">Sea</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="movementType"
                            name="movementType"
                            onChange={(e) => handleChange(e)}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Movement Type">Movement Type</option>
                            <option value="Door To Door">Door To Door</option>
                            <option value="Port To Port">Port To Port</option>
                            <option value="Door To Port">Door To Port</option>
                            <option value="Port To Door">Port To Door</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="freightClass"
                            name="freightClass"
                            onChange={(e) => handleChange(e)}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Freight Class">Freight Class</option>
                            <option value="FCL">FCL</option>
                            <option value="LCL">LCL</option>
                            <option value="AirCargo">Air Cargo</option>
                            <option value="AirCourier">Air Courier</option>
                          </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <select
                            id="incoterms"
                            name="incoterms"
                            onChange={(e) => handleChange(e)}
                            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Incoterms">Incoterms</option>
                            <option value="DDP">DDP</option>
                            <option value="EXW">EXW</option>
                            <option value="DAP">DAP</option>
                            <option value="FOB">FOB</option>
                          </select>
                        </div>
                      </div>
                       </div>

                       <div>
                       <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          name="goGreen"
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">
                          Go Green
                        </span>
                      </label>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="productDescription"
                            id="productDescription"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Product Discription
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="hsCode"
                            id="hsCode"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            HS Code
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="number"
                            name="freightPayment"
                            id="freightPayment"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Frieght Payment
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                          <div className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                            {allUsers &&
                              allUsers.map((user, i) => (
                                <div key={i}>
                                  <label>
                                    <input
                                      type="checkbox"
                                      onChange={() => toggleOption(user.id)}
                                    />
                                    &nbsp;{user.name}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                       </div>

                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                      <button
                        data-modal-hide="static-modal"
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Submit
                      </button>
                      <button
                        onClick={closeFormModal}
                        data-modal-hide="static-modal"
                        type="button"
                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
