// تعريف المتغيرات
let tiinp = document.getElementById('tiinp');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let cate = document.getElementById('cate');
let total = document.getElementById('total');
let btncreat = document.getElementById('btncreat');
let inpsearch = document.getElementById('search');
let setit = document.getElementById('setit');
let secate = document.getElementById('secate');
let tbody = document.getElementById('tbody');
let deletee = document.querySelector('.deletee');
let products = [];

// دالة لحساب الإجمالي
function calculateTotal() {
    if (price.value !== '' && !isNaN(parseFloat(price.value))) {
        let result = (parseFloat(price.value) + parseFloat(taxes.value) + parseFloat(ads.value)) - parseFloat(discount.value);
        total.innerHTML = `${result}`;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#582f2f';
    }
}

// استماع لتغيير قيم الحقول لحساب الإجمالي بشكل فوري
[tiinp, price, taxes, ads, discount, count].forEach(input => {
    input.addEventListener('input', calculateTotal);
});

// دالة لمسح الحقول
function clearInputs() {
    [tiinp, price, taxes, ads, discount, count, cate].forEach(input => {
        input.value = '';
    });
    total.innerHTML = '';
    total.style.background = '#582f2f';
}

// دالة لإضافة المنتج
btncreat.onclick = () => {
    let countValue = parseInt(count.value);
    if (!isNaN(countValue) && countValue > 0 && tiinp.value.trim() !== '' && price.value.trim() !== '') {
        for (let i = 0; i < countValue; i++) {
            let newProduct = {
                title: tiinp.value.trim(),
                price: parseFloat(price.value),
                taxes: parseFloat(taxes.value),
                ads: parseFloat(ads.value),
                discount: parseFloat(discount.value),
                count: 1,
                cate: cate.value.trim(),
                total: parseFloat(total.innerHTML),
            };
            products.push(newProduct);
        }
        localStorage.setItem('products', JSON.stringify(products));
        clearInputs();
        displayProducts();
    } else {
        alert('Please enter valid values for Title, Price, and Count.');
    }
};

// دالة لعرض المنتجات
function displayProducts() {
    let table = '';
    products.forEach((product, index) => {
        table += `<tr>
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.cate}</td>
        <td><button onclick="updateProduct(${index})">Update</button></td>
        <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
    });
    tbody.innerHTML = table;
    deletee.innerHTML = products.length > 0 ? `<button id='btn' onclick='deleteAll()'>Delete All (${products.length})</button>` : '';
}

// دالة لحذف كل المنتجات
function deleteAll() {
    if (confirm('Are you sure you want to delete all products?')) {
        localStorage.removeItem('products');
        products = [];
        displayProducts();
    }
}

// دالة لحذف منتج معين
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// دالة لتحديث منتج معين
function updateProduct(index) {
    let product = products[index];
    tiinp.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    count.value = product.count;
    cate.value = product.cate;
    total.innerHTML = product.total;
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
}

// دالة للبحث بواسطة التصنيف
setit.onclick = () => {
    let searchValue = cate.value.trim();
    let filteredProducts = products.filter(product => product.cate === searchValue);
    displayFilteredProducts(filteredProducts);
};

// دالة للبحث بواسطة العنوان
secate.onclick = () => {
    let searchValue = inpsearch.value.trim().toLowerCase();
    let filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));
    displayFilteredProducts(filteredProducts);
};

// دالة لعرض المنتجات المُصفاة
function displayFilteredProducts(filteredProducts) {
    let table = '';
    filteredProducts.forEach((product, index) => {
        table += `<tr>
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.cate}</td>
        <td><button onclick="updateProduct(${index})">Update</button></td>
        <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
    });
    tbody.innerHTML = table;
}

// عرض المنتجات عند التحميل
window.onload = function() {
    let storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        displayProducts();
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////
