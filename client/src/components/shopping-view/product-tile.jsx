import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleGetProductDetails, handaleAddtoCard }) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div 
        className="relative cursor-pointer" 
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <div className="w-full h-[300px] overflow-hidden rounded-t-lg">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Badge */}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
            Only {product?.totalStock} items left
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
            Sale
          </Badge>
        ) : null}
      </div>

      {/* Product Content */}
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-1 line-clamp-1">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-primary">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-400 opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handaleAddtoCard(product?._id, product?.totalStock)}
            className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;















































































// import { Badge } from "../ui/badge";
// import { Card, CardContent, CardFooter } from "../ui/card"
// import { Button } from "../ui/button"
// import { brandOptionsMap, categoryOptionsMap } from "@/config"




//  function ShoppingProductTile({product,handleGetProductDetails,handaleAddtoCard}){

//      return(
//         <Card className="w-full max-w-sm mx-auto">
//             <div onClick={()=>handleGetProductDetails(product?._id)}>
               
//             <div className="relative">
//                     <img
//                      src={product?.image}
//                      alt={product?.title}
//                      className="w-full h-300px object-cover rounded-t-lg"
//                     />
//                     {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Sale
//             </Badge>
//           ) : null}
//                 </div>
//             </div>
//              <CardContent className="p-4">
//                 <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//                 <div className="flex justify-between items-center mb-2">
//                 <span className="text-[16px] text-muted-foreground">
//                    {categoryOptionsMap[product?.category]}
//                  </span>
//                  <span className="text-[16px] text-muted-foreground">
//                       {brandOptionsMap[product?.brand]}
//                  </span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                 <span
//                 className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//                 } text-lg font-semibold text-primary`}
//                >
//                  ${product?.price}
//                </span>
//                {product?.salePrice > 0 ? (
//                   <span className="text-lg font-semibold text-primary">
//                    ${product?.salePrice}
//                 </span>
//             ) : null}
//           </div>
//              </CardContent>
//              <CardFooter>
//          {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handaleAddtoCard(product?._id, product?.totalStock)}
//             className="w-full"
//           >
//             Add to card
//           </Button>
//         )}
//       </CardFooter>
//           </Card>
//      )
//  }

//  export default ShoppingProductTile
