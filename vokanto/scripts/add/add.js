let data = document.querySelector(".form__data")
let arrComp = []

function addArr(e) {
    console.log(data);
    if(!arrComp.includes(parseInt(e.value))) {
        arrComp.push(parseInt(e.value))
    }
    rower(e)
}

function rower(e) {
    console.log('asfs');
    data.insertAdjacentHTML('beforeend' , `
            <p>
            ${e.text}
            </p>
    `)
}

function rower2(e) {
    data2.insertAdjacentHTML('beforeend' , `
            <p>
            ${e.text}
            </p>
    `)
}


let data2 = document.querySelector(".form__data2")

function addArr2(e) {
    if(!arrComp.includes(parseInt(e.value))) {
        arrComp.push(parseInt(e.value))
    }
    rower2(e)
}

