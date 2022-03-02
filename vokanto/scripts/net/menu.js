function UpdateMenu() {
    let uuid = getCookie('uuid')
    let av = document.querySelector('.m__avatar')
    fetch(`http://vakanto-api/v1.0/getuserdata/${uuid}`)
    .then( resp => resp.json() )
    .then( data => {
        console.log(data)
        if(data.data.first_name) {
            av.insertAdjacentHTML('afterbegin' , `
                <img src="assets/icon/avatartDef.png" alt="" >
                <p>
                    ${data.data.first_name}
                </p>
                <p>
                    ${data.data.last_name}
                </p>
            `)
        } else {
            av.insertAdjacentHTML('afterbegin' , `
                <img src="assets/icon/avatartDef.png" alt="" >
                <p>
                    ${data.data.name}
                </p>
                <p>
                    ${data.data.name_dir}
                </p>
            `)
        }
        
    })

}

UpdateMenu()