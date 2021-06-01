import Product from "./product"
import ShoppingCart from "./shoppingCart"
import ShoppingRecord from "./shoppingRecord"

export default interface GlobalData {
    products: Product[],
    shoppingCart: ShoppingCart[],
    shoppingRecord: ShoppingRecord[]
}