import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SheetTrigger ,Sheet, SheetContent} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { handler } from "tailwindcss-animate";
import { logoutUser,resetTokenAndCredeatials } from "@/store/auth-slice";
import UserCardWrapper from "./card-wrapper";
import { useEffect, useState } from "react";
import { fetchCardItems } from "@/store/shop/card-slice";
import { Label } from "@radix-ui/react-label";


 function MenuItems(){

     const navigate=useNavigate()
      
     const location=useLocation()
     const [searchParams,setSearchParams]=useSearchParams()
       
          function handleNavigate( getCurrentMenuItem){
                    sessionStorage.removeItem('filters')
                    const currentFilter=getCurrentMenuItem.id !=='home'  && getCurrentMenuItem.id !== 'products' 
                    && getCurrentMenuItem.id !== 'search' 
                    ?
                    {
                      category:[getCurrentMenuItem.id]
                    }  : null

                      sessionStorage.setItem('filters',JSON.stringify(currentFilter))
                         location.pathname.includes('listing')   && currentFilter !==null 
                        ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)):
                        navigate(getCurrentMenuItem.path)

          }
      return(
        <nav  className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
                shoppingViewHeaderMenuItems.map(menuItem=><Label   onClick={()=> handleNavigate(menuItem)}
                   className="text-sm font-medium" 
                    key={menuItem.id }
                     >
                      {menuItem.label}</Label>)
            }
        </nav>
      )
 }
          function HeaderRightContent(){

            const{user}=useSelector(state=>state.auth)
            const {cardItems}=useSelector(state=>state.shopCard)
            const [openCardSheet,setOpenCardSheet]=useState(false)
           
            const navigate= useNavigate()
            const dispatch= useDispatch()
            
           

            function handlerLogout (){
              // dispatch(logoutUser())
                dispatch(resetTokenAndCredeatials())
                 sessionStorage.clear();
                navigate("/auth/login")
            }

            useEffect(()=>{
               dispatch(fetchCardItems(user?.id))
            },[dispatch])

            

            return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
              <Sheet open={openCardSheet} onOpenChange={setOpenCardSheet}>
              <Button
               onClick={()=> setOpenCardSheet(true)} variant="outline" size="icon"     className="relative">
              <ShoppingCart className="w-6 h-6"   />  
              <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                {cardItems?.items?.length || 0}</span>
              <span className="sr-only "> User Card</span>
              </Button>
              <UserCardWrapper 
               setOpenCardSheet={ setOpenCardSheet}
              cardItems={ cardItems && cardItems.items && cardItems.items.length > 0
              ? cardItems.items
              
              : []}/>
             
              
              </Sheet>
             
            

               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  
                  <Avatar className="bg-black">
                    <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>

                             <DropdownMenuContent side="right" className="w-56">
                     <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                        <UserCog className="mr-2 h-4 w-4" />
                       Account
                       </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handlerLogout}>
                       <LogOut className="mr-2 h-4 w-4" />
                                  Logout
                   </DropdownMenuItem>
                   </DropdownMenuContent>
                   </DropdownMenu>  
            </div>
          }

function ShoppingHeader(){

     const{ isAuthenticated}=useSelector(state=>state.auth)

     

    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background">

            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link  to="/shop/home" className="flex items-center gap-2">
                <HousePlug className="h-6 w-6" />
                <span className="font-bold">Ecommerce</span>
                </Link >

                <Sheet>
                    <SheetTrigger asChild>
                     <Button  variant="outline" size="icon" className="lg:hidden">
                     <Menu className="h-6 w-6" />
                     <span className="sr-only">Toggle header menu</span>
                     </Button>
                    </SheetTrigger>
                    <SheetContent  side="left" className="w-full max-w-xs">
                          <MenuItems/>
                          <HeaderRightContent/>

                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                         <MenuItems/>
                </div>
                {
                       <div className="hidden lg:block">
                        <HeaderRightContent/>
                     </div>
                }
            </div>

        </header>
    )
}

export  default ShoppingHeader;
