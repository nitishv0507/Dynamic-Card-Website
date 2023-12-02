function getQueryParams() {
    const ans = {};
    const queryParams = location.search.substring(1);
    const queryArr = queryParams.split('&');

    for (let i = 0; i < queryArr.length; i++) {
        const arr = queryArr[i].split('=');
        ans[arr[0]] = arr[1];
    }

    return ans;
}

const queryParams = getQueryParams();

console.log(queryParams);

async function getProduct() {
    const data = await fetch("http://localhost:3000/products/"+ queryParams.id);
    

    const product = await data.json();
    document.querySelector('#name').value = product.name;
    document.querySelector('#price').value = product.price;
    document.querySelector('#qty').value = product.quantity;
    document.querySelector('#imgUrl').value = product.image;
    console.log(product);
}

getProduct();

async function updateProduct(e) {
    e.preventDefault();

    const data = {
        name: document.querySelector('#name').value,
        price: document.querySelector('#price').value,
        qty: document.querySelector('#qty').value,
        image: document.querySelector('#imgUrl').value
    };

    const res = await fetch("http://localhost:3000/products/"+ queryParams.id, {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    await res.json();

    window.location.href = 'index.html';

    console.log("product is updated.");

}

document.querySelector("#submit").addEventListener('click', updateProduct);