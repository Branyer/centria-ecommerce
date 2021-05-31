import Product from "./product"
import ShoppingCart from "./shoppingCart"

export default interface GlobalData {
    products: Product[],
    shoppingCart: ShoppingCart[]
}