interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const productsList: Product[] = [
    { id: 1, name: 'Sản phẩm 1', price: 89, quantity: 50 },
    { id: 2, name: 'Sản phẩm 2', price: 99, quantity: 30 },
    { id: 3, name: 'Sản phẩm 3', price: 109, quantity: 20 },
    { id: 4, name: 'Sản phẩm 4', price: 119, quantity: 15 },
    { id: 5, name: 'Sản phẩm 5', price: 129, quantity: 40 },
];

//reduce
const totalPrice: number = productsList.reduce((sum, product) => sum + (product.price * product.quantity), 0);
console.log('Tổng giá trị của tất cả sản phẩm:', totalPrice);

//filter
const expensiveProducts: Product[] = productsList.filter(product => product.price > 100);
console.log('Các sản phẩm có giá lớn hơn 100:', expensiveProducts);

//map
const productDescriptions: string[] = productsList.map(product => {
    return `Sản phẩm ${product.name} có giá ${product.price} đồng và còn ${product.quantity} sản phẩm.`;
});
console.log('Mô tả sản phẩm:', productDescriptions);

//reduce <100
const totalQuantity: number = productsList.filter(product => product.price < 100).reduce((sum, product) => sum + product.quantity, 0);
console.log('Tổng số lượng của tất cả các sản phẩm có giá dưới 100:', totalQuantity);

//Discount
function getDiscountedProducts(products: Product[], discountRate: number): Product[] {
    const discountedProducts: Product[] = products.map(product => {
        return { ...product, price: product.price * (1 - discountRate) };
    });

    return discountedProducts;
}
const discountedProductsList: Product[] = getDiscountedProducts(productsList, 0.2);

console.log('Danh sách sản phẩm đã giảm giá:', discountedProductsList);