function reqSt() {

    let uuid = getCookie('uuid')
    let body = new FormData(document.querySelector('.st'))
    body.append('comp', JSON.stringify(arrComp))
    body.append('uuid', uuid)
    body.append('avatar', 'https://image.flaticon.com/icons/png/512/147/147144.png')

    console.log(body.get('comp'));
    fetch('http://vakanto-api/v1.0/addprofile', {
        method: 'POST',
        body: body
    })
    .then(resp => resp.text())
    .then( data => {
        console.log(data) 
        reslide('profile.html')
    })
    
    
}

//https://image.flaticon.com/icons/png/512/147/147144.png

function reqEmp() {
    console.log('asfasfs');
    let uuid = getCookie('uuid')
    let body = new FormData(document.querySelector('.emp'))
    body.append('comp', JSON.stringify(arrComp))
    body.append('uuid', uuid)
    body.append('avatar', 'https://image.flaticon.com/icons/png/512/147/147144.png')
    fetch('http://vakanto-api/v1.0/addprofile', {
        method: 'POST',
        body: body
    })
    .then(resp => resp.text())
    .then( data => {
       console.log(data)
       reslide('profile.html');
    })
}

function chekProf() {
    let uuid = getCookie('uuid')
    fetch(`http://vakanto-api/v1.0/getuser/${uuid}`)
    .then( resp => resp.json() )
    .then( data => cheksis(data))
}

chekProf()


function cheksis(data) {
    if(data.type == 1) {
        document.querySelector('.stud').classList.remove('hide__cr')
        document.querySelector('.empl').classList.add('hide__cr')
    } else if (data.type == 2) {
        document.querySelector('.stud').classList.add('hide__cr')
        document.querySelector('.empl').classList.remove('hide__cr')
    }
    if(getCookie('uuid')) {
        if(data.profile_id) {
            reslide('profile.html')
        } 
    } else {
        reslide('regist.html')
    }
}

