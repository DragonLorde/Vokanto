function reqSt() {

    let uuid = getCookie('uuid')
    let body = new FormData(document.querySelector('.empl'))
    body.append('comp', JSON.stringify(arrComp))
    body.append('uuid', uuid)


    console.log(body.get('name'));
    fetch('http://vakanto-api/v1.0/creatinte', {
        method: 'POST',
        body: body
    })
    .then(resp => resp.text())
    .then( data => {
        console.log(data) 
        reslide('profile.html')
    })
    
    
}