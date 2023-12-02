const containerEl = document.querySelector('.container');

function handleEditBtn() {
    const editBtnEl = document.querySelectorAll('.edit');
    
    for (let btn of editBtnEl) {
        // console.log(btn);
        btn.addEventListener('click' , async(e) => {
            const id = e.target.id;
            window.location.href = 'edit.html?id='+id;
       
           console.log("Product updated succesfully");
            
        });
    }
}

function handleDeleteBtn() {
    
    const deleteBtnEl = document.querySelectorAll('.delete');
   
    for (let btn of deleteBtnEl) {
        // console.log(btn);
        btn.addEventListener('click',  async(e) => {
             const id = e.target.id;
             const data = await fetch(`http://localhost:3000/products/${id}`,{
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        
            await data.json();
        
            console.log("Product deleted succesfully");
        });
    }
}

function createCard(product) {
    const divEl = document.createElement('div');

    divEl.className = "card";
    divEl.id = `cardId-${product._id}`;
    
    const imgEl = document.createElement('img');
    imgEl.src = product.image;

    const h1El = document.createElement('h1');
    h1El.textContent = product.name;

    const paraEl = document.createElement('p');
    paraEl.textContent = `${product.quantity} - ${product.price}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.id = product._id; 
    editBtn.className = 'edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.id = product._id;
    deleteBtn.className = "delete";

    divEl.appendChild(imgEl);
    divEl.appendChild(h1El);
    divEl.appendChild(paraEl);
    divEl.appendChild(editBtn);
    divEl.appendChild(deleteBtn);

    containerEl.appendChild(divEl);
}

async function fetchProductData() {
    const data = await fetch("http://localhost:3000/products");
    const products = await data.json();

    for (let i = 0; i < products.length; i++) {
        createCard(products[i]);
    }

    handleEditBtn();
    handleDeleteBtn();
}

fetchProductData();