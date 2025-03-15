import { createContext,useState } from "react";

export const PostContext = createContext(null)

export default function Post({children}){

    const[productDetails,setProductDetails] = useState({name:"jhon"})
    return (
        <PostContext.Provider value={{productDetails,setProductDetails}}>
            {children}
        </PostContext.Provider>
    )
}