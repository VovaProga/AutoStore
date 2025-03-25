



// Массив товаров
const products = [
    { id: 1, name: 'Тормозные колодки', price: 1500, image: 'img/product1.jpg' },
    { id: 2, name: 'Фильтр масляный', price: 800, image: 'img/product2.jpg' },
    { id: 3, name: 'Свечи зажигания', price: 1200, image: 'img/product3.jpg' },
    { id: 4, name: 'Ремень генератора', price: 2000, image: 'img/product4.jpg' }
];

// Хранилище данных корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartView();
        localStorage.setItem('cart', JSON.stringify(cart));  // Сохраняем корзину в localStorage
        alert(`${product.name} добавлен в корзину`);
    }
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartView();
    localStorage.setItem('cart', JSON.stringify(cart));  // Обновляем корзину в localStorage
}

// Обновление отображения корзины
function updateCartView() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <div>
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} руб.</p>
                    <button onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            `;
            cartList.appendChild(li);
        });
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Итого: ${total} руб.`;
    }
}

// Генерация каталога товаров
function generateCatalog() {
    const catalogList = document.getElementById('catalog-list');
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div>
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} руб.</p>
                <button onclick="addToCart(${product.id})">Купить</button>
            </div>
        `;
        catalogList.appendChild(li);
    });
}

// Страница корзины
if (document.getElementById('cart-list')) {
    updateCartView();
}

// Страница каталога
if (document.getElementById('catalog-list')) {
    generateCatalog();
}

// Обработка оформления заказа (переход к форме оплаты)
document.getElementById('checkout-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    window.location.href = 'payment.html';  // Переход на страницу оплаты
});

// Страница оформления платежа
if (document.getElementById('payment-form')) {
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvc = document.getElementById('cvc').value;
        const cardholderName = document.getElementById('cardholder-name').value;

        // Имитируем процесс оплаты
        if (cardNumber && expirationDate && cvc && cardholderName) {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'Оплата успешна! Ваш заказ принят.';
            resultDiv.style.color = 'green';

            // Очистка корзины после оформления
            cart = [];
            localStorage.removeItem('cart');
            updateCartView();
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    });
}

