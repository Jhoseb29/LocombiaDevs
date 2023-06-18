import { generatePagination, renderProducts } from "./allproducts.js";
import { Get } from "../controller/UserApi.js";

const productsPerPage = 14; // Número de productos por página
let currentPage = 1; // Página actual

const products = await Get('products?genre=Action')

renderProducts(productsPerPage, products, currentPage)

generatePagination(productsPerPage, products, currentPage)