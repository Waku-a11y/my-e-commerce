import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import useFirestore from "../hooks/useFirestore";

let CheckContext = createContext()


let CheckContextProvider = ({children}) => {


let { user } = useContext(AuthContext)
let { getCollection } = useFirestore()
let { data } =user?.uid ? getCollection('roles', ['userID', '==', user.uid]) : ''
let role = (data?.[0]?.role);
let isSeller = role == 'seller'


    return (
        <CheckContext.Provider value={ { isSeller : isSeller}}>
            {children}
        </CheckContext.Provider>
    )
}

export { CheckContext, CheckContextProvider}