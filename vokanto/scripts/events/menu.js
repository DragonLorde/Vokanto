let swipe = document.querySelector('.swit')

swipe.addEventListener('click' , (e) => {
    swipe.querySelectorAll('div').forEach((elm) => {
        elm.classList.toggle('orng')
      
    })
})

swipe.addEventListener('click' , (e) => {
    document.querySelector(".m__vac").classList.toggle('m__switch-hide')
    document.querySelector(".m__chat").classList.toggle('m__switch-hide')
})


//m__switch-hide
let chat = document.querySelectorAll(".chat")
let chatblock = document.querySelector('.m__chat')
let msg = document.querySelector(".m__msg")
document.querySelector('.back-arr').addEventListener('click' , (e) => {
    msg.classList.toggle('m__switch-hide')
    chatblock.classList.toggle('m__switch-hide')
})

chat.forEach((elm) => {
    elm.addEventListener('click' , (e) => {
        msg.classList.toggle('m__switch-hide')
        chatblock.classList.toggle('m__switch-hide')
       
    })
})


function exit () {
    deleteCookie('uuid')
    deleteCookie('id')
    deleteCookie('name')
    reslide('index.html')
}