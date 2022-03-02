if(getCookie('uuid')) {
    document.querySelector('.menurgrelogin').classList.add('m__switch-hide')
    document.querySelector('.menur').classList.remove('m__switch-hide')
} else {
    document.querySelector('.menurgrelogin').classList.remove('m__switch-hide')
    document.querySelector('.menur').classList.add('m__switch-hide')
}


                        // <div class="vac__day-row">
                        //     <a href="">
                        //         <p>WhieBox</p>
                        //         <p>PHP</p>
                        //         <p>500000</p>
                        //     </a>
                        // </div>

fetch(`http://vakanto-api/v1.0/getvac`)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    for(let prop in data) {
        console.log(data[prop]);
        document.querySelector('.vac__day-col').insertAdjacentHTML('afterbegin' , `
            <div class="vac__day-row">
                <a href="profile.html?id=${data[prop].vac.emp_id}">
                    <p>${data[prop].vac.name}</p>
                    <p>${data[prop].vac.city}</p>
                    <p>ЗП: ${data[prop].vac.pay}</p>
                </a>
            </div>
        `)
    }
})