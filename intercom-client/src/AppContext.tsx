import { createContext, useState } from "react";
import { Shipment, User } from "./types";

type AppContextType = {
    currentShipment: Shipment | undefined
    updateCurrentShipment: (shipment: Shipment) => void
    currentUser: User | undefined
    updateCurrentUser: (user: User) => void
}

export const AppContext = createContext<AppContextType | null>(null);

type Props = {
    children: string | JSX.Element | JSX.Element[];
};

const AppContextProvider = ({ children }: Props) => {

    const [currentShipment, setCurrentShipment] = useState<Shipment>()
    const updateCurrentShipment = (shipment: Shipment) => { setCurrentShipment(shipment) }

    const [currentUser, setCurrrentUser] = useState<User>()
    const updateCurrentUser = (user: User) => { setCurrrentUser(user) }

    const value = {
        currentShipment,
        updateCurrentShipment,
        currentUser,
        updateCurrentUser
    }


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;