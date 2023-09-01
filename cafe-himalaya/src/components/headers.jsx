import { ChangeEvent, useState } from 'react';

export const Header = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    //Guardar valor del input number
    const setNewQuantity = product => {
        let value = document.getElementById('test').value;
        console.log(value);

        if (product.quantity < value) {
            if (allProducts.find(item => item.id === product.id)) {
                const products = allProducts.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: product.quantity + 1 }
                        : item
                );

                setTotal(total + product.price);
                setCountProducts(countProducts + 1);
                return setAllProducts([...products]);
            }
        } else {
            if (allProducts.find(item => item.id === product.id)) {
                const products = allProducts.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: product.quantity - 1 }
                        : item
                );
                setTotal(total - product.price);
                setCountProducts(countProducts - 1);
                return setAllProducts([...products]);
            }
        }
        console.log(value);
    };

    return (
        <header>
            <h1 className='title-header'>Café Himalaya</h1>
            <div className='container-icon'>
                <div
                    className='container-cart-icon'
                    onClick={() => setActive(!active)}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                        alt="carrito"
                        className="icon-cart" />
                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>
                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'
                        }`}
                >
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                <h3 className='title-product-carrito'>Carrito de compra</h3><br />
                                {allProducts.map(product => (
                                    <div className='cart-product'
                                        key={product.id}>
                                        <div className='info-cart-product'>
                                            <img src={product.urlImage} className='img-cart' alt={product.title} />
                                            <span
                                                className='titulo-producto-carrito'>
                                                {product.title}
                                            </span>
                                            <span
                                                className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                            <span>
                                                <input type="number" min="1" className='input-number' id="test"
                                                    value={product.quantity} onChange={() => setNewQuantity(product)}
                                                />
                                            </span>
                                        </div>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>
                            <button className='btn-clear-all'
                                onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>
    );
};