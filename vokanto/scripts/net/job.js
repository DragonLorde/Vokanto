let url_string = window.location.href; 
let url = new URL(url_string);
let paramValue = url.searchParams.get("w");

let col = document.querySelector('.jobs__col')

if(paramValue) {
    fetch(`http://vakanto-api/v1.0/srch/${paramValue}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        for(let prop of data) {
            console.log(prop)
            col.insertAdjacentHTML('afterbegin' , `
            <div class="jobs__row">
            <div class="jobs__block  ">
                <img src="https://s3-alpha-sig.figma.com/img/bd76/c547/0a65c41a44eb395ac6d6b7cff8fbe056?Expires=1619395200&Signature=XbjK4iQ-5UT-ByBXpoux99vgvh11d16suTk6WlZ2X5aHS9e8hLV6lZgunbYw-c~O-vtrxZCrAAyblPV7-M5PcyWRo845Fh5lUxMUy8Ali-Njw-YbTZ7pPxLIp6X9jl2Hg9JFp69crim2pb4yGSSihGYMHCsQK-fCwhnGeewHiqWCxG-KfQ2ZV1G-OyhfdkbysIdwFH-VFUQWCxksKxxdK--Hdm6CBdmB0Aa5V2iNJ3g4WkACtYE0LyZW0RGsuylZpm3XQRDpgQVrDgudNefc40SJwRsc1zaABfcOsbmgaFZkPhWjvw850qsZEArw52FO-5L~uMYIIg-aA7ebH6DeaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="">
                <div>
                    <p> ${prop.vac.name} (PHP)</p>
                    <span></span>
                </div>
                <div>
                    <p> ${prop.vac.city} </p>
                    <span>Город</span>
                </div>
                <div>
                    <p> ${prop.vac.pay} руб.</p>
                    <span>Зарплата</span>
                </div>
            </div>
            <div class="jobs__hide hide__jb">
                <p class="jobs__title">
                    ${prop.vac.text}
                </p>
                <div class="jobs__info">
                    <div class="jobs__text">
                        <p>Обязанности:</p>
                        <span> ${prop.vac.resp} </span>
                    </div>
                    <div class="jobs__text">
                        <p>Условия:</p>
                        <span>${prop.vac.cond}</span>
                    </div>
                    <div class="jobs__text">
                        <p>Требования:</p>
                        <span>${prop.vac.requ}</span>
                    </div>
                </div>
                <div class="jobs__about">
                    <p>Немного о нас:</p>
                    <span>${prop.emp.about}</span>
                </div>
                <div class="jobs__raiting">
                <p>Рейтинг: ${prop.emp.raiting}</p>
                </div>
                <div class="jobs__navk">
                    <div class="jobs__nv">
                    <p>Ключевые навыки</p>
                        <div>
                            ${CrN(prop.comp)}
                        </div>
                    </div>
                    <div class="jobs__go">
                       
                        <a href="profile.html?id=${prop.vac.emp_id}">Откликнуться</a>
                        <button>Посмотреть профиль</button>
                    </div>
                </div>
                <div class="jobs__len">
                    <p>Длительность стажировки: <span>${prop.vac.len} Месяца</span></p>
                </div>
                <div class="jobs__cont">
                    <p>Контактная информация</p>
                    <p>${prop.emp.phome}</p>
                    <p>Вакансия опубликована ${prop.vac.date} в ${prop.vac.city}</p>
                </div>
            </div>
        </div>
            `)
        }
        start()
    })
} else {
    fetch(`http://vakanto-api/v1.0/getvac`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        for(let prop of data) {
            console.log(prop)
            col.insertAdjacentHTML('afterbegin' , `
            <div class="jobs__row">
            <div class="jobs__block  ">
                <img src="https://s3-alpha-sig.figma.com/img/bd76/c547/0a65c41a44eb395ac6d6b7cff8fbe056?Expires=1619395200&Signature=XbjK4iQ-5UT-ByBXpoux99vgvh11d16suTk6WlZ2X5aHS9e8hLV6lZgunbYw-c~O-vtrxZCrAAyblPV7-M5PcyWRo845Fh5lUxMUy8Ali-Njw-YbTZ7pPxLIp6X9jl2Hg9JFp69crim2pb4yGSSihGYMHCsQK-fCwhnGeewHiqWCxG-KfQ2ZV1G-OyhfdkbysIdwFH-VFUQWCxksKxxdK--Hdm6CBdmB0Aa5V2iNJ3g4WkACtYE0LyZW0RGsuylZpm3XQRDpgQVrDgudNefc40SJwRsc1zaABfcOsbmgaFZkPhWjvw850qsZEArw52FO-5L~uMYIIg-aA7ebH6DeaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="">
                <div>
                    <p> ${prop.vac.name} (PHP)</p>
                    <span></span>
                </div>
                <div>
                    <p> ${prop.vac.city} </p>
                    <span>Город</span>
                </div>
                <div>
                    <p> ${prop.vac.pay} руб.</p>
                    <span>Зарплата</span>
                </div>
            </div>
            <div class="jobs__hide hide__jb">
                <p class="jobs__title">
                    ${prop.vac.text}
                </p>
                <div class="jobs__info">
                    <div class="jobs__text">
                        <p>Обязанности:</p>
                        <span> ${prop.vac.resp} </span>
                    </div>
                    <div class="jobs__text">
                        <p>Условия:</p>
                        <span>${prop.vac.cond}</span>
                    </div>
                    <div class="jobs__text">
                        <p>Требования:</p>
                        <span>${prop.vac.requ}</span>
                    </div>
                </div>
                <div class="jobs__about">
                    <p>Немного о нас:</p>
                    <span>${prop.emp.about}</span>
                </div>
                <div class="jobs__raiting">
                <p>Рейтинг: ${prop.emp.raiting}</p>
                </div>
                <div class="jobs__navk">
                    <div class="jobs__nv">
                    <p>Ключевые навыки</p>
                        <div>
                            ${CrN(prop.comp)}
                        </div>
                    </div>
                    <div class="jobs__go">
                       
                        <a href="profile.html?id=${prop.vac.emp_id}">Откликнуться</a>
                        <button>Посмотреть профиль</button>
                    </div>
                </div>
                <div class="jobs__len">
                    <p>Длительность стажировки: <span>${prop.vac.len} Месяца</span></p>
                </div>
                <div class="jobs__cont">
                    <p>Контактная информация</p>
                    <p>${prop.emp.phome}</p>
                    <p>Вакансия опубликована ${prop.vac.date} в ${prop.vac.city}</p>
                </div>
            </div>
        </div>
            `)
        }
        start()
    })
}


function CrN(obj) {

    let newDiv = document.createElement("div");
    for(let prop of obj ) {
        newDiv.insertAdjacentHTML('afterbegin' , `
        <p>${prop.name}</p>
    `);
    }
    return newDiv.outerHTML
}

{/* <div class="jobs__nv">
<p>Ключевые навыки</p>
<div>
    <p>PHP</p>
    <p>JS</p>
    <p>c#</p>
</div>
</div> */}