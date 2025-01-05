import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { handler } from "tailwindcss-animate"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/auth-slice"
import {  useNavigate } from "react-router-dom"



function AdminHeader({setOpen}){

     const dispatch=useDispatch() 
       const navigate = useNavigate();
    function handlerLogOut(){
    
        //dispatch(logoutUser())
         dispatch(resetTokenAndCredeatials())
                 sessionStorage.clear();
                navigate("/auth/login")

    }

    return  <header  className="flex items-center justify-between px-4">
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
            <AlignJustify />
            <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 justify-end">
            <Button onClick={handlerLogOut} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
             <LogOut/>
             
                Logout</Button>

        </div>

    </header>
}

export default  AdminHeader
