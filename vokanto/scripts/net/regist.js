function req() {
    let body = new FormData(document.querySelector('form'))
    fetch('http://vakanto-api/v1.0/regist', {
        method: 'POST',
        body: body
    })
    .then(resp => resp.json())
    .then( data => {
        setCookie('uuid', data['uuid'])
        reslide('crp.html')
    } )
}

function cheksis() {
    if(getCookie('uuid') ) {
        reslide('profile.html')
    } 
}

cheksis()