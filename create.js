async function createProduct(e) {
    try {
        e.preventDefault();

        const name = document.querySelector('#name');
        const price = document.querySelector('#price');
        const qty = document.querySelector('#qty');
        const imgUrl = document.querySelector('#imgUrl');
        
        if (!qty || !qty.value || qty.value === 0) {
            qty.classList.add('error');
            qty.nextElementSibling.classList.remove('hide');
            return;
        }

        await fetch("http://localhost:3000/products", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value, 
                quantity: qty.value,
                image: imgUrl.value
            })
        });

        console.log("Product added succesfully");
    } catch (e) {
        console.log("Error ", error);
    }
} 

const submitBtn = document.querySelector('#submit');
submitBtn?.addEventListener('click', createProduct);