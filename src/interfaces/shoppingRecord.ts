import ShoppingCart from "./shoppingCart"

export default interface ShoppingRecord {
    name: string;
    lastname: string;
    email: string;
    paymentMethod: string;
    shoppingCart: ShoppingCart[]
}