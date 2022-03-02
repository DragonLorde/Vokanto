//http://vakanto-api/v1.0/srch/j


function srW() {
    let word = document.querySelector('.sr').value
    reslide(`job.html?w=${word}`)
}

document.querySelector('.srS').addEventListener('click' , (e) => {
    srW()
})