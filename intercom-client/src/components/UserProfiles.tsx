import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils";
import axios from "axios";
import { User } from "../types";
import { AppContext } from "../AppContext";

export default function UserProfiles() {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>();
  const [activeUser,setActiveUser] = useState<User>();
  const { updateCurrentUser } = useContext(AppContext);


  const handleUserClick = (user:User) => {
    updateCurrentUser(user);
  };

  useEffect(() => {
    const getUsers = async () => {
      const endpoint = "/users";
      try {
        const response = await axios.get(`${baseUrl}${endpoint}`);
        const data: User[] = response.data;
        setAllUsers(data);
        setActiveUser(data[0]);
        updateCurrentUser(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="">
      {activeUser && (
        <div
          className="flex place-items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            id="avatarButton"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src="https://www.svgrepo.com/show/416659/user-profile-person.svg"
            alt="User dropdown"
          />
          <h1 className="text-sm text-gray-900 w-32">{activeUser.name} ({activeUser.role})</h1>

          {isOpen && (
            <div
              id="userDropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-64 mr-28 absolute"
            >
            {allUsers && allUsers.map((user, i) => (
                    <div key={i} onClick={()=>{
                      handleUserClick(user)
                      setActiveUser(user)}} className="px-4 py-3 text-sm text-gray-900 hover:bg-slate-100">
                      <div>{user.name} </div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
            ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
