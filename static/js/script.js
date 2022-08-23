let scrollpos = window.scrollY; // window scroll position
let wh = window.innerHeight-50; // as soon as element touches bottom with offset event starts
let element = document.querySelector(".up"); //element
window.addEventListener('scroll', function(){ 
    if(element.getBoundingClientRect().y<=950){
        element.classList.add("animation");
    }
});


let burger = document.querySelector('.nav__burger');
let sidebar = document.querySelector('#sidebar');
burger.addEventListener('click', ()=>{
    sidebar.classList.toggle('active');
})



let checkInput = (form)=>{
    const formData = new FormData(form);
    let data = {
        name:formData.get('name'),
        phone: formData.get('phone'),
        title: formData.get('title'),
        message: formData.get('message')
    }
    number_length =0;
    for(let i=0; i<data.phone.length; i++){
        if(data.phone[i] in [0,1,2,3,4,5,6,7,8,9]){
            number_length++;
        }
    }
    if(number_length==12){
        return true
    }
    else{
        return false;
    }
}





const formElement = document.getElementById('emailform');
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    if(checkInput(formElement)){
        let cover = document.querySelector('.cover');
        let preloader = document.querySelector('.spinnerWrap')
        let success = document.querySelector('.success');
        let error = document.querySelector('.error');
        cover.style.display = 'block';
        preloader.style.display = 'block';
        e.preventDefault();
        const formData = new FormData(formElement );
        let data = {
            name:formData.get('name'),
            phone: formData.get('phone'),
            title: formData.get('title'),
            message: formData.get('message')
        }
        $.ajax({
            url: '/sendmail',         /* Куда отправить запрос */
            crossDomain: true,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: 'post',             /* Метод запроса (post или get) */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: data,     /* Данные передаваемые в массиве */
            success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
                preloader.style.display = 'none';
                if(data.status == 200){
                    success.style.display = 'block';
                    setTimeout(()=>{
                        success.style.display = 'none';
                        cover.style.display = 'none';
                    },2000)
                }
                else{
                    error.style.display = 'block';
                    setTimeout(()=>{
                        error.style.display = 'none';
                        cover.style.display = 'none';
                    },2000)
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
            }
        });
    }
    else{
        alert("please check correctness of inputs");
    }
});






$(document).ready(function() {


    $("a.navlink").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 60 + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });

    $("a#cont").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 60 + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });

    $("a.arrow-bottom").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 60 + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
    $("a.up").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 60 + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });



    let numInput = document.querySelector("#phone");
    numInput.value = '+998';
    $('#phone').on('input', function() {
        $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ''))
    })
});