

const socket = io();
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const thumbnailInput = document.getElementById('thumbnail');
const codeInput = document.getElementById('code');
const stockInput = document.getElementById('stock');


productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const price = priceInput.value;
    const thumbnail = thumbnailInput.value;
    const code = codeInput.value;
    const stock = stockInput.value;
    socket.emit('addProduct', { title, price ,thumbnail,code,stock});
    titleInput.value = '';
    priceInput.value = '';
    thumbnailInput.value = '';
    codeInput.value = '';
    stockInput.value = '';
});

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const id = event.target.getAttribute('data-id');
        socket.emit('deleteProduct', id);
    }
});

socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.innerText = `${product.title} - $${product.price} - ${product.thumbnail} - ${product.code} - Stock: ${product.stock} `;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.setAttribute('data-id', product.id);
        deleteBtn.innerText = 'Delete';
        li.appendChild(deleteBtn);
        productList.appendChild(li);
    });
});




