let allLikeButton = document.querySelectorAll('.like-btn');

async function likeButon(productId, btn){
   try{
    let response = await axios({
        method : 'post',
        url : `/products/${productId}/like`,
        headers: {'X-Requested-With' : 'XMLHttpRequest'}
    })
    if(btn.children[0].classList.contains('fa-regular')){
        
        btn.children[0].classList.remove('fa-regular')
        btn.children[0].classList.add('fa-solid')
    }else {
        
        btn.children[0].classList.remove('fa-solid')
        btn.children[0].classList.add('fa-regular')
    }

   }
   catch(e){
    window.location.replace('/login')
    console.log(e.message, "error hai ye window login page ka");
   }
}


for(let btn of allLikeButton){
    btn.addEventListener('click', ()=>{
        let productId = btn.getAttribute('product-id')
        likeButon(productId, btn);
    })
}