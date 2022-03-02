


let url_string = window.location.href; 
let url = new URL(url_string);
let paramValue = url.searchParams.get("id");

if(paramValue) {
    function chekProf() {
        let uuid = paramValue
        console.log(uuid);
        fetch(`http://vakanto-api/v1.0/getuuid/${uuid}`)
        .then( resp => resp.json() )
        .then( data => cheksis(data))
    }

    chekProf()

    function cheksis(data) {
        if(data.type == 1) {
            document.querySelector('.stud').classList.remove('hide__prof')
            document.querySelector('.empl').classList.add('hide__prof')
            UpdateProf(data.uuid)
        } else if (data.type == 2) {
            document.querySelector('.stud').classList.add('hide__prof')
            document.querySelector('.empl').classList.remove('hide__prof')
            UpdateProf2(data.uuid)
        }
        if(!data.profile_id ) {
        reslide('crp.html')
        }
    }


    function UpdateProf(id) {
        let uuid = id

        fetch(`http://vakanto-api/v1.0/getuserdata/${uuid}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);

            document.querySelector('.stud').insertAdjacentHTML('afterbegin' , `
                
                    <div class="prof">
                        <div class="prof__col">
                            <div class="prof__avatar">
                                <p>Аккаунт подтвержден</p>
                                <img src="assets/icon/avatartDef.png" alt="">
                            </div>
                            <div class="prof__prog">
                                <p>Прогресс стажировки</p>
                                <div>
                                    <p>Собеседование</p>
                                    <img src="assets/icon/prog.svg" alt="">
                                </div>
                            </div>
                            <div class="prof__soft">
                                <p>Компетенции</p>
                                <div class="prof__soft-col">
                                    <div class="prof__soft-row">
                                        <p>Работа в команде</p>
                                    </div>
                                    <div class="prof__soft-row">
                                        <p>Общителность</p>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div class="prof__col">
                            <div class="prof__cont">
                                <p>${data.data.first_name} ${data.data.last_name}</p>
                                <p>Возраст: <span>${data.data.age}</span></p>
                                <p>Телефон: <span>${data.user.phone}</span></p>
                                <p>Телефон: <span>${data.user.phone}</span></p>
                                <p>Уч.Заведение: <span>${data.data.study}</span></p>
                                <p>Уч.Факультет: <span>${data.data.faculty}</span></p>
                                <p>Уч.Специалность: <span>${data.data.spec}</span></p>
                                <p>Уч.Год поступления: <span>${data.data.year_enter}</span></p>

                            </div>
                            <div class="prof__exp">
                                <p>
                                    Портфолио
                                </p>
                                <div class="prof__exp-col">
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Хакатон 1</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Конференция</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Научный проект</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Хакатон 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="prof__col">
                            <div class="prof__about">
                                <p>О себе</p>
                                <p>
                                    ${data.data.about}
                                </p>
                            </div>
                            <div class="prof__rait">
                                <p>Рейтинг пользователя</p>
                                <div>
                                    <div>
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            `)
            for(let prop of data.comp) {
                document.querySelector('.prof__soft-col').insertAdjacentHTML('afterbegin', `
                <div class="prof__soft-row">
                    <p>${prop.name}</p>
                </div>
            `)
            }
        })
    }


    function UpdateProf2(id) {
        let uuid = id

        fetch(`http://vakanto-api/v1.0/getuserdata/${uuid}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
           
            document.querySelector('.empl').insertAdjacentHTML('afterbegin' , `

                    <div class="prof">
                    <div class="prof__col">
                        <div class="prof__avatar">
                            <p>Аккаунт подтвержден</p>
                            <img src="assets/icon/avatartDef.png" alt="">
                        </div>
                    </div>
                    <div class="prof__col">
                        <div class="prof__cont">
                            <p>${data.data.name}</p>
                            <p>О нас</p>
                            <p>
                            ${data.data.about}
                            </p>
                        </div>
                    
                    </div>
                    <div class="prof__col">
                        <div class="prof__rait">
                            <p>Рейтинг пользователя</p>
                            <div>
                                <div>
                                    <p>1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stag">
                    <div class="stag__add">
                        <p>Добавить стажировку</p>
                        <img src="assets/icon/plus.svg" alt="">
                    </div>
                    <p>Список стажировок</p>
                    <div class="stag__col">
                    
                    </div>
                    <p>Отклики на вакансии</p>
                    <div class="otkl">
                        <div class="otkl__col">
                            <div class="otkl__row">
                                    <p>Name</p>
                                    <p>Откликнулся на стажировку</p>
                                    <a href="">Перейти в профиль</a>
                            </div>
                        </div>
                    </div>
                </div>    
                
            `)
            stag()
        })

    }


    function stag() {
        let id = paramValue
        fetch(`http://vakanto-api/v1.0/getvacid/${id}`)
        .then(resp => resp.json())
        .then(data => {
            let col = document.querySelector('.stag__col')
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

    function GetCom() {
        let id = paramValue
        fetch(`http://vakanto-api/v1.0/getcom/${id}`)
        .then( resp => resp.json() )
        .then(data => {
            document.querySelector('.comm__col').innerHTML = ' '
            console.log(data);
            for(let prop in data) {
                document.querySelector('.comm__col').insertAdjacentHTML('afterbegin', `
                <div class="comm__row">
                    <p>${data[prop].name}</p>
                    <p>${data[prop].text}</p>
                </div>
            `)
            }
        })
    }

    function SendCom() {
        let body = new FormData( document.querySelector('.addcom') )
        let nm = getCookie('name')
        let id = paramValue
        body.append('name', nm)
        body.append('user_id' , id)
        fetch(`http://vakanto-api/v1.0/addcom` , {
            method: 'POST',
            body: body
        })
        .then(GetCom())
        

    }

    GetCom()
    
    
} else {
    
    function chekProf() {
        let uuid = getCookie('uuid')
        fetch(`http://vakanto-api/v1.0/getuser/${uuid}`)
        .then( resp => resp.json() )
        .then( data => cheksis(data))
    }

    chekProf()


    function cheksis(data) {
        if(data.type == 1) {
            document.querySelector('.stud').classList.remove('hide__prof')
            document.querySelector('.empl').classList.add('hide__prof')
            UpdateProf()

        } else if (data.type == 2) {
            document.querySelector('.stud').classList.add('hide__prof')
            document.querySelector('.empl').classList.remove('hide__prof')
            UpdateProf2()

        }
        if(!data.profile_id ) {
        reslide('crp.html')
        }
    }


    function UpdateProf() {
        let uuid = getCookie('uuid')

        fetch(`http://vakanto-api/v1.0/getuserdata/${uuid}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            setCookie('id' , data.user.profile_id)
            setCookie('name' , data.data.first_name)
            document.querySelector('.stud').insertAdjacentHTML('afterbegin' , `
                
                    <div class="prof">
                        <div class="prof__col">
                            <div class="prof__avatar">
                                <p>Аккаунт подтвержден</p>
                                <img src="assets/icon/avatartDef.png" alt="">
                            </div>
                            <div class="prof__prog">
                                <p>Прогресс стажировки</p>
                                <div>
                                    <p>Собеседование</p>
                                    <img src="assets/icon/prog.svg" alt="">
                                </div>
                            </div>
                            <div class="prof__soft">
                                <p>Компетенции</p>
                                <div class="prof__soft-col">
                                    <div class="prof__soft-row">
                                        <p>Работа в команде</p>
                                    </div>
                                    <div class="prof__soft-row">
                                        <p>Общителность</p>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div class="prof__col">
                            <div class="prof__cont">
                                <p>${data.data.first_name} ${data.data.last_name}</p>
                                <p>Возраст: <span>${data.data.age}</span></p>
                                <p>Телефон: <span>${data.user.phone}</span></p>
                                <p>Телефон: <span>${data.user.phone}</span></p>
                                <p>Уч.Заведение: <span>${data.data.study}</span></p>
                                <p>Уч.Факультет: <span>${data.data.faculty}</span></p>
                                <p>Уч.Специалность: <span>${data.data.spec}</span></p>
                                <p>Уч.Год поступления: <span>${data.data.year_enter}</span></p>

                            </div>
                            <div class="prof__exp">
                                <p>
                                    Портфолио
                                </p>
                                <div class="prof__exp-col">
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Хакатон 1</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Конференция</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Научный проект</p>
                                    </div>
                                    <div class="prof__exp-row">
                                        <div>
                                            <img src="" alt="">
                                        </div>
                                        <p>Хакатон 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="prof__col">
                            <div class="prof__about">
                                <p>О себе</p>
                                <p>
                                    ${data.data.about}
                                </p>
                            </div>
                            <div class="prof__rait">
                                <p>Рейтинг пользователя</p>
                                <div>
                                    <div>
                                        <p>1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            `)
            for(let prop of data.comp) {
                document.querySelector('.prof__soft-col').insertAdjacentHTML('afterbegin', `
                <div class="prof__soft-row">
                    <p>${prop.name}</p>
                </div>
            `)
            }
        })
    }


    function UpdateProf2() {
        let uuid = getCookie('uuid')

        fetch(`http://vakanto-api/v1.0/getuserdata/${uuid}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            deleteCookie('id')
            setCookie('id' , data.user.id)
            deleteCookie('name')
            setCookie('name' , data.data.name)
            document.querySelector('.empl').insertAdjacentHTML('afterbegin' , `

                    <div class="prof">
                    <div class="prof__col">
                        <div class="prof__avatar">
                            <p>Аккаунт подтвержден</p>
                            <img src="assets/icon/avatartDef.png" alt="">
                        </div>
                    </div>
                    <div class="prof__col">
                        <div class="prof__cont">
                            <p>${data.data.name}</p>
                            <p>О нас</p>
                            <p>
                            ${data.data.about}
                            </p>
                        </div>
                    
                    </div>
                    <div class="prof__col">
                        <div class="prof__rait">
                            <p>Рейтинг пользователя</p>
                            <div>
                                <div>
                                    <p>1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stag">
                    <div class="stag__add">
                        <p>Добавить стажировку</p>
                        <img src="assets/icon/plus.svg" alt="">
                    </div>
                    <p>Список стажировок</p>
                    <div class="stag__col">
                    
                    </div>
                    <p>Отклики на вакансии</p>
                    <div class="otkl">
                        <div class="otkl__col">
                            <div class="otkl__row">
                                    <p>Name</p>
                                    <p>Откликнулся на стажировку</p>
                                    <a href="">Перейти в профиль</a>
                            </div>
                        </div>
                    </div>
                </div>    
                
            `)
            stag()
        })

    }


    function stag() {
        let id = getCookie('id')
        fetch(`http://vakanto-api/v1.0/getvacid/${id}`)
        .then(resp => resp.json())
        .then(data => {
            let col = document.querySelector('.stag__col')
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

    function GetCom() {
        let id = getCookie('id')
        fetch(`http://vakanto-api/v1.0/getcom/${id}`)
        .then( resp => resp.json() )
        .then(data => {
            document.querySelector('.comm__col').innerHTML = ' '
            console.log(data);
            for(let prop in data) {
                document.querySelector('.comm__col').insertAdjacentHTML('afterbegin', `
                <div class="comm__row">
                    <p>${data[prop].name}</p>
                    <p>${data[prop].text}</p>
                </div>
            `)
            }
        })
    }

    function SendCom() {
        let body = new FormData( document.querySelector('.addcom') )
        let nm = getCookie('name')
        let id = getCookie('id')
        body.append('name', nm)
        body.append('user_id' , id)
        fetch(`http://vakanto-api/v1.0/addcom` , {
            method: 'POST',
            body: body
        })
        .then(GetCom())
        

    }

    GetCom()

}


setTimeout(() => {
    document.querySelector('.stag__add').addEventListener('click' , (e) => {
        console.log('asfasf');
        reslide('addemp.html');
    })
}, 100);


function CrN(obj) {

    let newDiv = document.createElement("div");
    for(let prop of obj ) {
        newDiv.insertAdjacentHTML('afterbegin' , `
        <p>${prop.name}</p>
    `);
    }
    return newDiv.outerHTML
}