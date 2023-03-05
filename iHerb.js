document.addEventListener('DOMContentLoaded',()=>{
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
    //searchBar functionality
    const form=document.forms['search'];
    const containers=document.querySelectorAll('.All.container');
    searchBar=form.querySelector('input');
    searchBar.addEventListener('keyup',(e)=>{
        e.preventDefault();
        const value=e.target.value.toLowerCase();
        containers.forEach(container=>{
            const productName=container.querySelector('h3').textContent;
            if((productName.toLowerCase().indexOf(value))!=-1){
                container.style.display='block'; 
            }else{
                container.style.display='none';
            }

        })
    })
    //Filtering functionality
    const All=document.querySelector('div.buttons .All');
    const Congnition=document.querySelector('div.buttons .Cognition');
    const Sleep=document.querySelector('div.buttons .Sleep');
    const Immunity=document.querySelector('div.buttons .Immunity');
    const filterButtons=[];
    filterButtons[0]=All;
    filterButtons[1]=Congnition;
    filterButtons[2]=Sleep;
    filterButtons[3]=Immunity;
    filterButtons.forEach((filterButton)=>{
        filterButton.addEventListener('click',e=>{
            e.preventDefault();
            containers.forEach((container)=>{
                if(container.className.includes(filterButton.className)){
                    container.style.display='block';
                }else{
                    container.style.display='none';
                }
            })
        })
    })
    //Remove cart rows
    const buttonsClicked=document.querySelectorAll('.btn-danger');
    buttonsClicked.forEach((buttonClicked)=>{
        buttonClicked.addEventListener('click',(e)=>{
            buttonClicked.parentElement.parentElement.remove();
            updateCartTotal();
        })
    })
     //making the add to car buttons work
    const addToCartButtons=document.getElementsByClassName('shop-item-button');
    for(let i=0;i<addToCartButtons.length;i++){
        let button=addToCartButtons[i];
        button.addEventListener('click',addToCartClicked);
        //remove cart rows and update the total
        const buttonsClicked=document.querySelectorAll('.btn-danger');
        buttonsClicked.forEach((buttonClicked)=>{
        buttonClicked.addEventListener('click',(e)=>{
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();})})

    }
    function addToCartClicked(e){
        let button=e.target;
        let shopItem=button.parentElement;
        let title=shopItem.getElementsByClassName('shop-item-title')[0].innerText;
        let price=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        let imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src;
        console.log(title,price,imageSrc);
        let cartRow=document.createElement('div');
        cartRow.textContent=title;
        let cartItems=document.getElementsByClassName('cart-items')[0];
        cartRow.classList.add('cart-row');
        //making sure an item does not appear in the shopping cart more than once
        let cartItemNames=cartItems.getElementsByClassName('cart-item-title');
        for(let i=0;i<cartItemNames.length;i++){
            if(cartItemNames[i].innerText==title){
                alert('This item is already in the cart');
                return;
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
        //remove cart rows and update the total
        const buttonsClicked=document.querySelectorAll('.btn-danger');
        buttonsClicked.forEach((buttonClicked)=>{
        buttonClicked.addEventListener('click',(e)=>{
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
        })})

        
         //update total when quantity changes
         const quantityInputs=document.querySelectorAll('.cart-quantity-input');
         quantityInputs.forEach((quantityInput)=>{
         quantityInput.addEventListener(('change'),e=>{
         if(isNaN(quantityInput.value) || quantityInput.value<=0){
            quantityInput.value=1;
         }
        updateCartTotal();
          //remove cart rows and update the total
          const buttonsClicked=document.querySelectorAll('.btn-danger');
          buttonsClicked.forEach((buttonClicked)=>{
          buttonClicked.addEventListener('click',(e)=>{
          buttonClicked.parentElement.parentElement.remove();
          updateCartTotal();



    }
                
         
            
        )

    })
           
        })
    })
             updateCartTotal();

       
       
   }
    //making sure the quanity input is a number that is bigger than 0
    const quantityInputs=document.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach((quantityInput)=>{
        quantityInput.addEventListener(('change'),e=>{
            if(isNaN(quantityInput.value) || quantityInput.value<=0){
                quantityInput.value=1;
            }
            updateCartTotal();
        })

    })
    //purchase button
    purchaseButton=document.querySelector('.btn-purchase');
    console.log(purchaseButton);
    purchaseButton.addEventListener('click',e=>{
         let newTotal=document.getElementsByClassName('cart-total-price')[0].innerText.replace("SAR"," "); 
         if(newTotal > 0){
            alert('Thank you for your purchase');
            let cartItems=document.querySelector('.cart-items');
            while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild);
            updateCartTotal();
            //remove cart rows and update the total
          const buttonsClicked=document.querySelectorAll('.btn-danger');
          buttonsClicked.forEach((buttonClicked)=>{
          buttonClicked.addEventListener('click',(e)=>{
          buttonClicked.parentElement.parentElement.remove();
          updateCartTotal();

            })})}
         }else{
            alert('Sorry! you cart is empty');
         }  

        

        
    })
    // update cart total(the total price)
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
})    
    

    
  
 



        


       


