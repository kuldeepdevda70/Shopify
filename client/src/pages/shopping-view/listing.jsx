import ProductFilter from "@/components/shopping-view/filter"
import ProductDetailsDialog from "@/components/shopping-view/product-details"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { Button } from "@/components/ui/button"
import { sortOptions } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addToCard, fetchCardItems } from "@/store/shop/card-slice"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice"

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, Item } from "@radix-ui/react-dropdown-menu"
import { data } from "autoprefixer"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, useSearchParams } from "react-router-dom"

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}



function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(
      (state) => state.shopProducts
    );

    const{user}=useSelector(state=>state.auth)
     const {cardItems} = useSelector(state=>state.shopCard)

    const[filters,setFilters]=useState({})
    const[sort,setSort]=useState(null)
    const [searchParams,setSearchParams]=useSearchParams()
    const[openDetailsDiolog,setOpenDetailsDiolog]=useState(false)
     const {toast}=useToast()

     const categorySearchParams=searchParams.get('category')


      function handleSort(value){

         setSort(value)
          
      }

      function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    
        if (indexOfCurrentSection === -1) {
          cpyFilters = {
            ...cpyFilters,
            [getSectionId]: [getCurrentOption],
          };
        } else {
          const indexOfCurrentOption =
            cpyFilters[getSectionId].indexOf(getCurrentOption);
    
          if (indexOfCurrentOption === -1)
            cpyFilters[getSectionId].push(getCurrentOption);
          else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
    
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
      }


       function handleGetProductDetails(getCurrentProductId){
              console.log(getCurrentProductId, "getCurrentProductId")
              dispatch(fetchProductDetails(getCurrentProductId))

         }

      function handaleAddtoCard(getCurrentProductId,getTotalStock){
        console.log(cardItems,"cardItem")
        let getCardItems=cardItems.items || []
        if(getCardItems.length){
           const indexOfCurrentItem=getCardItems.findIndex(Item=>Item.productId=== getCurrentProductId)
           
                if(indexOfCurrentItem>-1){
                  const getQuantity=getCardItems[indexOfCurrentItem].quantity
                  if(getQuantity +1 > getTotalStock){
                        toast({
                           title:`${getQuantity} quantity can be added for this item`,
                           variant: 'destructive'
                        })
                        return
                  }
                }
    
           

        }
        dispatch(addToCard({userId : user ?.id, productId: getCurrentProductId, quantity:1})).then((data)=>
        {
           if(data?.payload?.success){
                dispatch(fetchCardItems(user?.id));
                toast({
                   title:'Product is added to card'
                })
           }
        }
        )
        
      }
         

      useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
      }, [categorySearchParams]);

      useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
          const createQueryString = createSearchParamsHelper(filters);
          setSearchParams(new URLSearchParams(createQueryString));
        }
      }, [filters]);

    // fetch list of product
      
    useEffect(()=>{
        if(filters!==null && sort!==null)
         dispatch(fetchAllFilteredProducts({filterParams :filters,sortParams:sort}))
    },[dispatch,sort,filters])

    useEffect(()=>{
       if(productDetails !==null) setOpenDetailsDiolog(true)
    },[productDetails])

          console.log(productList,'productList');
          

    return    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">

        <ProductFilter  filters={filters} handleFilter={handleFilter}/>
        <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b   flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
                {productList?.length}</span>
                <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 relative"
        >
            <ArrowUpDownIcon className="h-4 w-4" />
            <span>Sort by</span>
        </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={4}
        className="w-[200px] z-[9999] bg-white shadow-md rounded-md border"
    >
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
            {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem
                    value={sortItem.id}
                    key={sortItem.id}
                    className="hover:bg-gray-100 focus:bg-gray-100"
                >
                    {sortItem.label}
                </DropdownMenuRadioItem>
            ))}
               </DropdownMenuRadioGroup>
               </DropdownMenuContent>
              </DropdownMenu>

          </div>
         
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
       {
          productList && productList.length > 0 ?
           productList.map(productItem=> <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={productItem}
            handaleAddtoCard={handaleAddtoCard}
           />):null
           
       }
       

         </div>
        </div>
         <ProductDetailsDialog
          open={openDetailsDiolog}
           setOpen={setOpenDetailsDiolog} 
           productDetails={productDetails}
           />
    </div>
}

export default ShoppingListing