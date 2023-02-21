//creating the hamburgur menu button
const hamburgerButton = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
const navImage=document.getElementById('nav-image');
function toggleButton() {
    navList.classList.toggle('show');
    navImage.style.display='none';
    hamburgerButton.classList.toggle('hamburger-button');
}

hamburgerButton.addEventListener('click', toggleButton);
//creating the search functionality
const searchBar=document.querySelector('.search');
const input=searchBar.querySelector('input');
input.addEventListener('keyup',e=>{
    e.preventDefault();
    const term=e.target.value.toLowerCase();
    console.log(term);
    const products=document.querySelectorAll('h3');
    console.log(products);
    Array.from(products).forEach(product => {
        const title=product.textContent;
        const container=product.parentElement;
        if((title.toLowerCase()).indexOf(term)!=-1){
            container.style.display='block';
        }else{
            container.style.display='none';
        }
    });
})
//creating the filtering functionality
let All=document.querySelector('body > div.filter-by-category > div > button.All');
let Cognition=document.querySelector('body > div.filter-by-category > div > button.Cognition');
let Sleep=document.querySelector('body > div.filter-by-category > div > button.Sleep');
let Immunity=document.querySelector('body > div.filter-by-category > div > button.Immunity');
console.log(Immunity);
let list=[];
list[0]=All;
list[1]=Cognition;
list[2]=Sleep;
list[3]=Immunity;
let containers=document.querySelectorAll('.container');
console.log(containers[9].className);
list.forEach(b=>{
    b.addEventListener('click',e=>{
        document.getElementById("Shopping Cart").style.visibility = 'visible';
        containers.forEach(con=>{
            if((con.className).includes(b.className)){
                con.style.display='block';
            }else{
                con.style.display='none';
            }
        })
    })
})
let removeCartItemButtons=document.getElementsByClassName('btn-danger');
for(let i=0;i<removeCartItemButtons.length;i++){
    let button=removeCartItemButtons[i];
    button.addEventListener('click',(event)=>{
        buttonClicked=event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    })
}
let quantityInputs=document.getElementsByClassName('cart-quantity-input');
for(let i=0;i<quantityInputs.length;i++){
    let input=quantityInputs[i];
    input.addEventListener('change',(event)=>{
        let input=event.target;
        if(isNaN(input.value)||input.value<=0){
            input.value=1;
        }
        updateCartTotal();

})}
let addToCartButtons=document.getElementsByClassName('shop-item-button');
for(let i=0;i<addToCartButtons.length;i++){
    let button=addToCartButtons[i];
    button.addEventListener('click',(event)=>{
        let button=event.target;
        let shopItem=button.parentElement;
        console.log(shopItem);
        let title=shopItem.getElementsByClassName("shop-item-title")[0].textContent;
        let price=shopItem.getElementsByClassName('shop-item-price')[0].textContent;
        let imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src;
        console.log(title,price,imageSrc);
        addItemToCart(title,price,imageSrc);
        updateCartTotal();
    })}
   
let addItemToCart=(title,price,imageSrc)=>{
    let cartRow=document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems=document.getElementsByClassName('cart-items')[0];
    console.log(cartItems);
    let cartItemNames=cartItems.getElementsByClassName('cart-item-title');
    for(let i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('This item is already added to the cart');
            return
        }

    }
    let cartRowContents=`<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`
    cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',(event)=>{
        buttonClicked=event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',(event)=>{
        let input=event.target;
        if(isNaN(input.value)||input.value<=0){
            input.value=1;
        }
        updateCartTotal();
    })


}    

const updateCartTotal=()=>{
    let cartItemContainer=document.getElementsByClassName('cart-items')[0];
    let cartRows=cartItemContainer.getElementsByClassName('cart-row');
    let total=0;
    for(let i=0;i<cartRows.length;i++){
        let cartRow=cartRows[i];
        let priceElement=cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0];
        console.log(priceElement,quantityElement);
        let price=parseFloat(priceElement.textContent.replace('SAR',''));
        let quantity=quantityElement.value;
        console.log(quantity*price);
        total=total+(price*quantity);
        window.total1=total;
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText=total+"SAR";   



}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',()=>{
    if(total1==0){
        alert('Your shopping cart is empty');
    }
    else{
        alert('Thank you for shopping with us');
    }
    let cartItems=document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}) 



        


       
