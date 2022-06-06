/*
* lazy loads elements with default selector as '.lozad'
*/
$(function(){
  lozad().observe();
})
/*
* Fancybox default
*/
$.extend($.fancybox.defaults, {
  closeBtn: true,
  helpers:  {
    overlay: {
      css: { 'background': 'rgba(76, 76, 76, 0.8)' },
      locked: false
     }
  }
});   
$.extend($.fancybox.defaults.tpl, {
  closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
  next     : '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span class="fal fa-angle-right"></span></a>',
  prev     : '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="fal fa-angle-left"></span></a>'
});
/*
* Noty default
*/ 
Noty.overrideDefaults({
  layout: "bottomRight",
  theme: 'sunset',
  timeout: "3000",
  killer: true,
  progressBar: true,
  animation: {
    open: 'animated bounceInRight', 
    close: 'animated bounceOutRight'
  }
});  
    
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);  
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}
// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000 
function addSpaces(nStr){
  return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}   
// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция определения браузера
$(function() {
  var user = detect.parse(navigator.userAgent);
  if (user.browser.family === 'Safari') {
    $('body').addClass('Safari');
  }
  if (user.browser.family === 'IE') {
    $('body').addClass('IE');
  }
  if (user.browser.family === 'Firefox') {
    $('body').addClass('Firefox');
  }
  if (user.browser.family === 'Opera') {
    $('body').addClass('Opera');
  }
  if (user.browser.family === 'Chrome') {
    $('body').addClass('Chrome');
  }
});

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.html(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) { return false; }
  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}



// Показать пароль 
$(function(){
  $('.showPass').click(function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    return false;
  });
});

  
// Основные функции
function MainFunctions() {
  $(function(){
    // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
    $("#myform, .feedbackForm, .clientForm, #quickform, .goodsDataOpinionAddForm, .callback-info .callbackForm").validate({
      rules: {
      reg_name: "required"
     }
    });
  
    // Отправка формы по Ctrl+Enter
    $('form').bind('keypress', function(e){
      if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
    }).find('input').bind('keypress', function(e){
      if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
    });
  });
}


// Запуск блока Вы смотрели
function viewed(){
  $(".viewed .owl-carousel").owlCarousel({
    items: 5,
    margin: 30,
    loop: false,
    rewind: true,
    lazyLoad: true,
    lazyContent: true,
    nav: true,
    dots: false,
    autoplay: false,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true,
    navContainer: '.viewed .navigation',
    navText: [ , ],      
    navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],  
    responsive: {
      0:{items:1},
      600:{items:2},
      1050:{items:3},
      1200:{items:4}
    },
  });

}

// Выносим функции из шаблонов
function outFunctions() {
$(function(){
  // Вызов функции быстрого заказа в корзине
  $('#startOrder, #startOrderTab').on('click', function() {
    startOrder();
    return false;
  });
  // Вызов функции редиректа при обратном звонке
  $('#footer .callbackForm').submit(validCallBack);
  $('#fancybox-callback .callbackForm').submit(validCallBackC);
  $('#fancybox-feedback .feedbackForm-header').submit(validCallBackF);
  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);
    
  // Добавление товара в корзину
  $('.wrapper').on('click', '.add-cart', function() {
    var form = $(this).closest('form');
    if ($(this).hasClass('quick')) {
      form.attr('rel', 'quick');
    } else {
      var rel = form.attr('rel');
      if (rel) {
        form.attr('rel', rel.replace('quick', ''));
      }
    }
    form.trigger('submit');
    return (false);
  })
  // Слайдер в подвале
  $('#footer .block.collapse .title').on('click', function(){
    if(getClientWidth() <= 991){
      $(this).toggleClass('active').next('.block-content').slideToggle();
    }
  })
});
}





// Получение центральной разметки страницы (для быстрого просмотра)
$(function(){
  $.fn.getColumnContent = function() {
    var block = ($(this).length && $(this).hasClass('product-view') ? $(this).filter('.product-view') : $('div.product-view:eq(0)'));

    // Размер заголовка
    block.find('.product-name').addClass('quick-view')
    block.find('.product-order').addClass('quick-view')
    // Удаляем блоки, которые не отображаются в быстром просмотре.
    block.find('.custom-block').remove()
    // Отключаем увеличение
    block.find('.general-img').find('a').attr('href', 'javascript:void(0)');
    // Меняем ссылки со скролом 
    var $scrollLinks = block.find('.scroll-link');
    $scrollLinks.each(function(i, link){
      var tabId = $(link).attr('href').slice(-1);
      
      $(link).attr('href', $(link).data('href') + '#show_tab_'  + tabId )
    })

    var productShopSize = block.find('.product-shop').children().length;

    if(!productShopSize) {
      // Удаляем пустой блок без характеристик и кр. описания
      block.find('.product-shop').remove();
      // Меняем разметку оставшихся блоков
    } 
    
    return block;
  }
});

// Функция + - для товаров
function quantity() {
//Regulator Up копки + в карточке товара при добавлении в корзину
$('.qty-plus').off('click').click(function(){
  var 
    quantity = $(this).parent().find('.quantity, .cartqty'),
    currentVal = parseInt(quantity.val());
  if (!isNaN(currentVal)){
    quantity.val(currentVal + 1);
    quantity.trigger('change');
  }
  return false;
});
//Regulator Down копки - в карточке товара при добавлении в корзину
$('.qty-minus').off('click').click(function(){
  var 
    quantity = $(this).parent().find('.quantity, .cartqty'),
    currentVal = parseInt(quantity.val());
  if (!isNaN(currentVal) && !(currentVal <= 1) ){
    quantity.val(currentVal - 1);
    quantity.trigger('change');
  }
  return false;
});
// Если вводят 0 то заменяем на 1
$('.qty-wrap .quantity').off('change').change(function(){
  if($(this).val() < 1){
    $(this).val(1); 
  }
});
}
// Функция + - для товаров
function quantity() {
//Regulator Up копки + в карточке товара при добавлении в корзину
$('.qty-plus').off('click').click(function(){
  var 
    quantity = $(this).parent().find('.quantity, .cartqty'),
    currentVal = parseInt(quantity.val());
  if (!isNaN(currentVal)){
    quantity.val(currentVal + 1);
    quantity.trigger('change');
  }
  return false;
});
//Regulator Down копки - в карточке товара при добавлении в корзину
$('.qty-minus').off('click').click(function(){
  var 
    quantity = $(this).parent().find('.quantity, .cartqty'),
    currentVal = parseInt(quantity.val());
  if (!isNaN(currentVal) && !(currentVal <= 1) ){
    quantity.val(currentVal - 1);
    quantity.trigger('change');
  }
  return false;
});
// Если вводят 0 то заменяем на 1
$('.qty-wrap .quantity').off('change').change(function(){
  if($(this).val() < 1){
    $(this).val(1); 
  }
});
}


// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
  var del = e;
  var num = $('.compare .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache : false,
    url		: url,
    success: function(d){
      var oldCount = num;
      var newCount = oldCount - 1;
      $('.compare .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#compare-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.compare').removeClass('have-items');
          $('.compare #compare-items .empty').show();
          $('.compare .actions').hide();
        }
      var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;
  url = del.data('href');

  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки сравнения на товарах
      $('.compare #compare-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
         
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }         
      })
      
      $('.compare').removeClass('have-items');
      $('.compare .count').text("0");
      $('.compare .actions').hide();
      $('.compare #compare-items .item').remove();
      $('.compare #compare-items .empty').show();
      $('.add-compare').removeAttr("title").removeClass("added");
		}
  })
  }
}

// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из избранного?')){
  var del = e;
  var num = $('.favorites .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache    : false,
    url		  : url,
    success: function(d){
      var oldCount = $('.favorites .count').text();
      var newCount = oldCount - 1;
      $('.favorites .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#favorites-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.favorites').removeClass('have-items');
          $('.favorites #favorites-items .empty').show();
          $('.favorites .actions').hide();          
        }
      var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Избранное без обновлении страницы
function removeFromFavoritesAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить избранное?')){
  var del = e;
  url = del.data('href');
  
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки избранное на товарах
      $('.favorites #favorites-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
        
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }        
      })    
      
      $('.favorites').removeClass('have-items');
      $('.favorites .count').text("0");
      $('.favorites .actions').hide();
      $('.favorites #favorites-items .item').remove();
      $('.favorites #favorites-items .empty').show();
      $('.add-wishlist').removeAttr("title").removeClass("added");
		}
  })
  }
}


// Наверх
$(function(){
  // hide #back-top first
  $("#back-top").hide();
	// fade in #back-top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});


// Валидаторы для Имени и телефона
function validName(){
  var $input = $('#footer #callback_person');
  var name = $input.val();
  
  if(name != ''){
    $input.next('.name-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }else{
    $input.next('.name-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="name-error">Вы не указали ваше Имя</div>');
    
    return false;
  } 
}
function validPhone(){
  var $input = $('#footer #callback_phone')
  var tel = $input.val();
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel);
  
  if(check == true && check != ''){
    $input.next('.phone-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }
  else{
    $input.next('.phone-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="phone-error">Вы ввели неверный номер телефона</div>');
    
    return false;
  }
}
//Проверка телефона в обратном звонке.
function validCallBack(){
  var name = validName();
  var phone = validPhone();
  
  return name && phone;
}

// Валидаторы для Имени и телефона
function validNameC(){
  var $input = $('#fancybox-callback #callback_person_header');
  var name = $input.val();
  
  if(name != ''){
    $input.next('.name-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }else{
    $input.next('.name-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="name-error">Вы не указали ваше Имя</div>');
    
    return false;
  } 
}
function validPhoneC(){
  var $input = $('#fancybox-callback #callback_phone_header')
  var tel = $input.val();
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(tel);
  
  if(check == true && check != ''){
    $input.next('.phone-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }
  else{
    $input.next('.phone-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="phone-error">Вы ввели неверный номер телефона</div>');
    
    return false;
  }
}
//Проверка телефона в обратном звонке.
function validCallBackC(){
  var name = validNameC();
  var phone = validPhoneC();
  
  return name && phone;
}

// Валидаторы для Имени, Почты, Комментария
function validNameF(){
  var $input = $('#fancybox-feedback #feedback_name');
  var name = $input.val();
  
  if(name != ''){
    $input.next('.name-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }else{
    $input.next('.name-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="name-error">Вы не указали ваше Имя</div>');
    
    return false;
  } 
}
function validEmailF(){
  var $input = $('#fancybox-feedback #feedback_email')
  var email = $input.val();
  var check = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i.test(email);
  
  if(check == true && check != ''){
    $input.next('.phone-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }
  else{
    $input.next('.phone-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="phone-error">Вы ввели неверную почту</div>');
    
    return false;
  }
}
function validCommentF(){
  var $input = $('#fancybox-feedback #feedback_message');
  var name = $input.val();
  
  if(name != ''){
    $input.next('.name-error').remove();
    $input.removeClass('input--error');
    
    return true;
  }else{
    $input.next('.name-error').remove();
    $input.addClass('input--error');
    $input.after('<div class="name-error">Вы не указали комментарий</div>');
    
    return false;
  } 
}
//Проверка телефона в обратном звонке.
function validCallBackF(){
  var name = validNameF();
  var email = validEmailF();
  var comment = validCommentF();
  
  return name && email && comment;
}

// Предзагрузчик
function preloadHide(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.fadeOut();
  $preloader.delay(500).fadeOut('slow');
}

function preloadShow(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.show();
  $preloader.show();
}

// Адаптивное меню и каталог
function OpenMenu() {
  // Открытие элементов
  $('.dropdown__open').on('click', function(event){
    event.preventDefault();
    $('div').removeClass('opened');
    var value = $(this).data('open');
    if ($('.dropdown__content[data-content="'+ value +'"]').hasClass('opened')){
      $(this).removeClass('opened');
      $(this).parent().removeClass('opened');
      $('.sidebar__links').removeClass('opened');
      $('.overlay').removeClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').removeClass('opened');
    }else{
      $(this).addClass('opened');
      $(this).parent().addClass('opened');
      $('.sidebar__links').addClass('opened');
      $('.overlay').addClass('opened');
      $('.dropdown__content[data-content="'+ value +'"]').addClass('opened');
    }
  });
  // Иконки в мобильной версии
  function headerIcons() {
    $('.header-icons').on('click', '.header-iconsItem', function(evt){
      var $icon = $(this);
      var id = $icon.attr('data-target');
      var $icons = $icon.siblings();
      
      $icons.each(function(index, icon){
        var id = $(icon).attr('data-target');
        
        $(icon).removeClass('active');
        $(id).slideUp()
      })
      
      $icon.toggleClass('active')
      $(id).slideToggle()
    })
    
   
  }
  headerIcons();
  
  //Кнопка выбора меню/каталога
  var  button = $('.dropdown__label [data-open]');
  
  
  //Кнопка выбора меню/каталога
  var  button = $('.dropdown__label [data-open]');
  //Скрываем меню
  $('[data-content="menu"]').hide();
  button.on('click', function(){
    var name = $(this).attr('data-open');
    var content = $(this).parents().find('[data-content="'+ name +'"]');
    button.removeClass('active');
    $(this).addClass('active');
    $('.dropdown__content [data-content]').hide();
    content.show();
  });

  //Открытие каталога
  $('.catalog__icon_header').on('click', function (event){
    $('.overlay').addClass('opened');
    $('#catalogMenu').addClass('opened');
    event.preventDefault();
    $('#addtoMenu').removeClass('opened');
    $('#addtoCatalog').addClass('opened');
    button.removeClass('active');
    $('.dropdown__label [data-open="catalog"]').addClass('active');
  });
  
  
  
  
  function removeActiveLinks(){
    if (getClientWidth() > 992) {
      var $headerCatalog = $('.header-catalogMenu');
      
      $headerCatalog.find('.header-catalogLink, .header-subcatalogTitle, .header-catalogMenu').removeClass('active');
      $headerCatalog.find('.header-subcatalog-third, .sub').show();
    }
  }
  $(window).on('resize', $.debounce(300, removeActiveLinks))

}


// Закрытие элементов
function closeMenu() {
  // Закрытие всего при нажатии на темную часть
  $('.overlay').on('click', function(e){
    event.preventDefault();
    if($(this).hasClass('opened')){
      $('div, a, form, span').removeClass('opened');
      $('.overflowMenu').removeClass('active');
      setTimeout(function () {
        $('.overlay').removeClass('transparent')
      },600)
    }
  });

  // Закрытие элементов
  $('.dropdown__close, .addto__close').on('click', function(event){
    event.preventDefault();
    $('div, a, form').removeClass('opened');
    $('.dropdown__open').removeClass('opened');
    $('.dropdown__content').removeClass('opened');
    $('.overlay').removeClass('opened');
  });
}


// Загрузка основных функций шаблона
$(function(){
  MainFunctions();
  outFunctions();
  closeMenu();
  quantity();
  OpenMenu();
  openMenu2();
});




// Форма поиска ( Сразу же помечаем объект поиска, как инициализированный, чтобы случайно не инициализировать его дважды.)
function SearchFieldInit(obj) {
    // Блок в котором лежит поле поиска
    obj.f_search = obj.find('.search-form');
    // Если поля поиска не нашлось, завершаем работу, ничего страшного.
    if(0 == obj.f_search.length) {
      return false;
    }
    // Поле поиска товара
    obj.s_search = obj.f_search.find('.search-input');
    // Обнуление данных в форме поиска
    obj.s_reset  = obj.f_search.find('.search-reset');
    // Проверка на существование функции проверки поля и действий с ним
    if(typeof(obj.SearchFieldCheck) != 'function') {
      console.log('function SearchFieldCheck is not found in object for SearchFieldInit', {status: 'error'});
      return false;
    // Проверка, сколько полей поиска нам подсунули за раз на инициализацию
    } else if(1 < obj.f_search.length) {
      console.log('function SearchFieldInit must have only one search object', {status: 'error'});
      return false;
    }
    // Создаём функцию которая будет отвечать за основные действия с полем поиска
    obj.__SearchFieldCheck = function (isAfter) {
      // Если в поле текста есть вбитые данные
      if(obj.s_search.val().length) {
        obj.f_search.addClass('search__filled');
      } else {
        obj.f_search.removeClass('search__filled');
      }
      // При нажатии клавиши данных внутри поля ещё нет, так что проверки вернут информацию что менять поле не нужно, хотя как только операция будет завершена данные в поле появятся. Поэтому произведём вторую проверку спустя 2 сотых секунды.
      if(typeof( isAfter ) == "undefined" || !isAfter) {
        setTimeout(function() { obj.__SearchFieldCheck(1); },20);
      }else{
        return obj.SearchFieldCheck();
      }
    }
    // Действия с инпут полем поиска
    obj.s_search.click(function(){
      obj.__SearchFieldCheck();
    }).focus(function(){
      obj.f_search.addClass('search__focused');
      obj.__SearchFieldCheck();
    }).blur(function(){
      obj.f_search.removeClass('search__focused');
      obj.__SearchFieldCheck();
    }).keyup(function(I){
  		switch(I.keyCode) {
  			// игнорируем нажатия на эти клавишы
  			case 13:  // enter
  			case 27:  // escape
  			case 38:  // стрелка вверх
  			case 40:  // стрелка вниз
  			break;
  
  			default:
          obj.f_search.removeClass('search__focused');
          obj.__SearchFieldCheck();
  		  break;
		  }			
    }).bind('paste', function(e){
      obj.__SearchFieldCheck();
      setTimeout(function() { obj.__SearchFieldCheck(); },20);
    }).bind('cut', function(e){
      $('#search-result').hide();
      $('#search-result .inner .result-item').remove();
      obj.__SearchFieldCheck();
    });
  	//Считываем нажатие клавиш, уже после вывода подсказки
	  var suggestCount;
	  var suggestSelected = 0;
	  
    function keyActivate(n){
      var $links = $('#search-result .result-item a');
    	$links.eq(suggestSelected-1).removeClass('_active');
    
    	if(n == 1 && suggestSelected < suggestCount){
    		suggestSelected++;
    	}else if(n == -1 && suggestSelected > 0){
    		suggestSelected--;
    	}
    	if( suggestSelected > 0){
    		$links.eq(suggestSelected-1).addClass('_active');
    	}
    }
  	obj.s_search.keydown(function(I){
  		switch(I.keyCode) {
  			// По нажатию клавиш прячем подсказку
  			case 27: // escape
  				$('#search-result').hide();
  				return false;
  			break;
  			// Нажатие enter при выделенном пункте из поиска
  			case 13: // enter
  			  if(suggestSelected){
    			  var $link = $('#search-result .result-item').eq(suggestSelected - 1).find('a');
    			  var href = $link.attr('href');
    			  if(href){
    			    document.location = href
    			  } else {
    			    $link.trigger('click')
    			  }
    			  return false;
  			  }
  			break;
  			// делаем переход по подсказке стрелочками клавиатуры
  			case 38: // стрелка вверх
  			case 40: // стрелка вниз
  				I.preventDefault();
  				suggestCount = $('#search-result .result-item').length
  				if(suggestCount){
  					//делаем выделение пунктов в слое, переход по стрелочкам
  					keyActivate(I.keyCode-39);
  				}
  			break;
  			default:
  			suggestSelected = 0;
  			break;
  		}
  	});
  	
    // Кнопка обнуления данных в форме поиска
    obj.s_reset.click(function(){
      obj.s_search.val('').focus();
      $('#search-result').hide();
      $('#search-result .inner .result-item').remove();
    })
    // Проверка данных в форме после инициализации функционала. Возможно браузер вставил туда какой-либо текст, нужно обработать и такой вариант
    obj.__SearchFieldCheck();
  }
// Аналог php функции.
function htmlspecialchars(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function substr(str,start,len){str+='';var end=str.length;if(start<0){start+=end;}end=typeof len==='undefined'?end:(len<0?len+end:len+start);return start>=str.length||start<0||start>end?!1:str.slice(start,end);}
function md5(str){var xl;var rotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));};var addUnsigned=function(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}
if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}};var _F=function(x,y,z){return(x&y)|((~x)&z);};var _G=function(x,y,z){return(x&z)|(y&(~z));};var _H=function(x,y,z){return(x^y^z);};var _I=function(x,y,z){return(y^(x|(~z)));};var _FF=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(_F(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var _GG=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(_G(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var _HH=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(_H(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var _II=function(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(_I(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};var convertToWordArray=function(str){var lWordCount;var lMessageLength=str.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=new Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(str.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}
lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;};var wordToHex=function(lValue){var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;wordToHexValue_temp="0"+lByte.toString(16);wordToHexValue=wordToHexValue+wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);}
return wordToHexValue;};var x=[],k,AA,BB,CC,DD,a,b,c,d,S11=7,S12=12,S13=17,S14=22,S21=5,S22=9,S23=14,S24=20,S31=4,S32=11,S33=16,S34=23,S41=6,S42=10,S43=15,S44=21;str=this.utf8_encode(str);x=convertToWordArray(str);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;xl=x.length;for(k=0;k<xl;k+=16){AA=a;BB=b;CC=c;DD=d;a=_FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=_FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=_FF(c,d,a,b,x[k+2],S13,0x242070DB);b=_FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=_FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=_FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=_FF(c,d,a,b,x[k+6],S13,0xA8304613);b=_FF(b,c,d,a,x[k+7],S14,0xFD469501);a=_FF(a,b,c,d,x[k+8],S11,0x698098D8);d=_FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);a=_GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=_GG(d,a,b,c,x[k+6],S22,0xC040B340);c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=_GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=_GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=_GG(d,a,b,c,x[k+10],S22,0x2441453);c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=_GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=_GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=_GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=_GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=_GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=_GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=_HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=_HH(d,a,b,c,x[k+8],S32,0x8771F681);c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=_HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=_HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=_HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=_HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=_HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=_HH(b,c,d,a,x[k+6],S34,0x4881D05);a=_HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=_HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=_II(a,b,c,d,x[k+0],S41,0xF4292244);d=_II(d,a,b,c,x[k+7],S42,0x432AFF97);c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=_II(b,c,d,a,x[k+5],S44,0xFC93A039);a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);d=_II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=_II(b,c,d,a,x[k+1],S44,0x85845DD1);a=_II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=_II(c,d,a,b,x[k+6],S43,0xA3014314);b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=_II(a,b,c,d,x[k+4],S41,0xF7537E82);d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=_II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=_II(b,c,d,a,x[k+9],S44,0xEB86D391);a=addUnsigned(a,AA);b=addUnsigned(b,BB);c=addUnsigned(c,CC);d=addUnsigned(d,DD);}
var temp=wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);return temp.toLowerCase();}
function utf8_encode(argString){var string=(argString+'');var utftext="";var start,end;var stringl=0;start=end=0;stringl=string.length;for(var n=0;n<stringl;n++){var c1=string.charCodeAt(n);var enc=null;if(c1<128){end++;}else if(c1>127&&c1<2048){enc=String.fromCharCode((c1>>6)|192)+String.fromCharCode((c1&63)|128);}else{enc=String.fromCharCode((c1>>12)|224)+String.fromCharCode(((c1>>6)&63)|128)+String.fromCharCode((c1&63)|128);}
if(enc!==null){if(end>start){utftext+=string.substring(start,end);}
utftext+=enc;start=end=n+1;}}
if(end>start){utftext+=string.substring(start,string.length);}
return utftext;}
function rand(min,max){var argc=arguments.length;if(argc===0){min=0;max=2147483647;}else if(argc===1){throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');}return Math.floor(Math.random()*(max-min+1))+min;}
// Получить md5 хэш
function GenMd5Hash () {
  return substr(md5(parseInt(new Date().getTime() / 1000, 10)),rand(0,24),8);
}
// Живой поиск
$(function() {
  // Навигационная таблица над таблицей с данными
  var searchBlock = $('.search');
  var options = {
    target:                 'form.store_ajax_catalog',
    url:                    '/admin/store_catalog',
    items_target:           '#goods',
    last_search_query:      '',
  };
  // По этому хэшу будем обращаться к объекту извне
  var randHash = GenMd5Hash();
  // Если объекта со списком ajax функций не существует, создаём её
  if(typeof(document.SearchInCatalogAjaxQuerySender) == 'undefined') {
    document.SearchInCatalogAjaxQuerySender = {};
  }
  // Поле поиска обновилось, внутри него можно выполнять любые действия
  searchBlock.SearchFieldCheck = function () {
    // Отменяем выполнение последнего запущенного через таймаут скрипта, если таковой был.
    if(typeof(document.lastTimeoutId) != 'undefined') {
      clearTimeout(document.lastTimeoutId);
    }
    document.lastTimeoutId = setTimeout("document.SearchInCatalogAjaxQuerySender['" + randHash + "']('" + htmlspecialchars(searchBlock.s_search.val()) + "');", 300);
  }
  // Отправляет запрос к серверу с задачей поиска товаров
  document.SearchInCatalogAjaxQuerySender[randHash] = function (old_val) {
    var last_search_query_array = [];
    
    // sessionStorage is available
    if (typeof sessionStorage !== 'undefined') {
        try {
          if(sessionStorage.getItem('lastSearchQueryArray')){
            last_search_query_array = JSON.parse(sessionStorage.getItem('lastSearchQueryArray'));
            
            // Находим соответствие текущего запроса с sessionStorage
            var currentSearch = $.grep(last_search_query_array, function (item){
              return item.search_query == old_val
            })[0]
            
            if(currentSearch){
              showDropdownSearch(JSON.parse(currentSearch.content));
              
              return;
            }
          } else {
            sessionStorage.setItem('lastSearchQueryArray', '[]')
          }
        } catch(e) {
            // sessionStorage is disabled
        }
    }
    
    // Если текущее значение не изменилось спустя 300 сотых секунды и это значение не то по которому мы искали товары при последнем запросе
    if(htmlspecialchars(searchBlock.s_search.val()) == old_val && searchBlock.s_search.val().length > 1) {
      // Запоминаем этот запрос, который мы ищем, чтобы не произвводить повторного поиска
      options['last_search_query'] = old_val;
      // Добавляем нашей форме поиска поле загрузки
      searchBlock.f_search.addClass('search__loading');
      // Собираем параметры для Ajax запроса
      var
        params = {
          'ajax_q'                : 1,
          'goods_search_field_id' : 0,
          'q'                     : options['last_search_query'],
        },
        // Объект со значением которого будем в последствии проверять полученные от сервера данные
        search_field_obj = searchBlock.s_search;
      // Аяксом отправляем запрос на поиск нужных товаров и категорий
      $.ajax({
        type: "POST",
        cache: false,
        url: searchBlock.f_search.attr('action'),
        data: params,
        dataType: 'json',
        beforeSend: function(){
          searchBlock.find('.search-submit .header-searchIcon').html('<i class="fal fa-circle-notch fa-spin"></i>')
        },
        success: function(data) {
          // Если набранный запрос не соответствует полученным данным, видимо запрос пришёл не вовремя, отменяем его.
          if(search_field_obj.val() != old_val) {
            return false;
          }
          
          // Записываем в sessionStorage
          if (typeof sessionStorage !== 'undefined') {
              try {
                sessionStorage.setItem('lastSearchQueryArray', JSON.stringify(last_search_query_array))
                
                // Находим соответствие текущего запроса с sessionStorage
                var currentSearch = $.grep(last_search_query_array, function (item){
                  return item.search_query == old_val
                })[0]
                //Если такого запроса ещё не было запишем его в sessionStorage
                if(typeof currentSearch == 'undefined'){
                  // Добавляем в массив последних запросов данные по текущему запросу
                  last_search_query_array.push({
                    search_query: old_val,
                    content: JSON.stringify(data)
                  })
                  sessionStorage.setItem('lastSearchQueryArray', JSON.stringify(last_search_query_array))
                }        
              } catch(e) {
                  // sessionStorage is disabled
              }
          }         
          // Показываем результаты на основе пришедших данных
          showDropdownSearch(data);
          
          // Убираем информацию о том что запрос грузится.
          searchBlock.f_search.removeClass("search__loading");
          searchBlock.find('.search-submit .header-searchIcon').html('<i class="fal fa-search"></i>')
          console.log('andAJAX')
        }
      });
    }else{
      $("#search-result").removeClass('_active').hide();
    }
    
    function showDropdownSearch(data){
      // Отображение категорий в поиске
      if(data.category.length!=undefined && data.category.length>0){
        $(".result-category .result-item").remove();
        $("#search-result").removeClass('_active').hide();
        for(с=0; с < data.category.length; с++){
          // Проверка наличия изображения
          if (data.category[с].image_icon == null) {
            data.category[с].image_icon = '/design/no-photo-icon.png'
          } else {
            data.category[с].image_icon = data.category[с].image_icon;
          }
          // Отображаем результат поиска
         $("#search-result").addClass('_active').show();
          $("#search-result .inner .result-category").append('<div class="result-item" data-id="'+ data.category[с].goods_cat_id +'"><a href="'+ data.category[с].url +'"><img src="'+ data.category[с].image_icon +'" class="goods-image-icon" /><span>'+ data.category[с].goods_cat_name +'</span></a></div>');
        }
      }else{
        $(".result-category .result-item").remove();
        $("#search-result").removeClass('_active').hide();
      }
      // Отображение товаров в поиске
      if(data.goods.length!=undefined && data.goods.length>0){
        $(".result-goods .result-item").remove();
        $("#search-result").removeClass('_active').hide();
        for(i=0; i < data.goods.length; i++){
          // Проверка наличия изображения
          if (data.goods[i].image_icon == null) {
            data.goods[i].image_icon = '/design/no-photo-icon.png'
          } else {
            data.goods[i].image_icon = data.goods[i].image_icon;
          }
          // Отображаем результат поиска
         $("#search-result").addClass('_active').show();
         if(i <= 4 ){
          $("#search-result .inner .result-goods").append('<div class="result-item" data-id="'+ data.goods[i].goods_id +'"><a href="'+ data.goods[i].url +'"><img src="'+ data.goods[i].image_icon +'" class="goods-image-icon" /><span>'+ data.goods[i].goods_name +'</span></a></div>');
         }
         
        // Если последняя итерация цикла вставим кнопку "показать все"
         if(i == data.goods.length - 1){
          $("#search-result .inner #show-wrap").remove();
          
          var $showAllBtn = $('<a>').text('Все результаты').addClass('show-all').click(function(){$('.search-form').submit();})
          var $showAllWrap = $('<div>').attr('id', 'show-wrap').addClass('result-item').append($showAllBtn)
          
          $("#search-result .inner .result-goods").append($showAllWrap)
         }
        }
      }else{
        $(".result-goods .result-item").remove();
        $("#search-result").removeClass('_active').hide();
      }
      // Скрываем результаты поиска если ничего не найдено
      if((data.category.length + data.goods.length) > 0){
       $("#search-result").addClass('_active').show();
      //   console.log("show");
      }else{
        $("#search-result").removeClass('_active').hide();
      //   console.log("hide");
      }
      
      if((data.category.length) > 0){
        $(".result-category").show().addClass('_visible');
      }else{
        $(".result-category").hide().removeClass('_visible');
      }
      
      if((data.goods.length) > 0){
        $(".result-goods").show();
      }else{
        $(".result-goods").hide();
      }         
    }
  }
  SearchFieldInit(searchBlock);
 
});

// Открытие Контактов, Меню, Сравнения, Избранного
function openMenu2() {
  $('.search-submit_button').on('click', function(){
    $('#headerSearch').addClass('active');
  })
  $('.search_close_button').on('click', function(){
    $('#headerSearch').removeClass('active');
  })
 
  //Открытие каталога
  $('.catalog--icon').on('click', function (event){
    event.preventDefault();
    $('#addtoMenu').hide();
    $('#addtoCatalog').show();
    button.removeClass('active');
    $('.dropdown__label [data-open="catalog"]').addClass('active');
  });

  //Открытие поиска
  $('.search__icon.button').on('click', function (event) {
    event.preventDefault();
    $(this).parent().toggleClass('opened');
    $('header .mainnav').animate({opacity: '0'}, 1)
    $('.overlay').addClass('opened');
  });
	
  // Имитация клика по каталогу в меню
  $('.mainnav__catalog').on('click', function (event){
    if ($(this).hasClass('active'))
    {
      $(this).removeClass('active');
      event.preventDefault();
      $('#fancybox__catalog').slideUp("hide");
    }
    else
    {
      $(this).addClass('active');
      event.preventDefault();
      $('#fancybox__catalog').slideDown("slow");
    }
    
  });
  
  // Дополнительные пункты меню в шапке
  function headerMenu(){
    var overMenuExist = $('.overflowMenu li').length;
    if(overMenuExist){
     $('.overflowMenu li').removeClass('mainnav__replaced');
     $('.mainnav .mainnav__more').remove();
     $('.overflowMenu li').each(function(){
       $('.mainnav .mainnav__list').append($(this));
     })
    }
    menuWidth = $('.mainnav').width();
    menuCount = $('.header-menu .header-menu__item').length + 1;
    var nextCheck = 0;
    var CurrentWidthCounter = 0;
    for(var i=1; i < menuCount;  i++){
      currentWidth = parseInt(Math.ceil($('.header-menu .header-menu__item:nth-child('+i+')').width())) + 46;
      nextCheck += currentWidth;
      if(nextCheck > menuWidth){
            var a = i;
            for(a;a < menuCount;a++){
              $('.header-menu .header-menu__item:nth-child('+ a +')').addClass('mainnav__replaced');
            }
            $('.mainnav .mainnav__list').append('<li class="header-menu__item mainnav__more dropdown _more-menu"><a class="mainnav__link">Еще...</a></li>');
            $('.mainnav__more').append($('<ul>').addClass('overflowMenu dropdown__body'))
            $('.mainnav .mainnav__replaced').each(function(){
              $('.overflowMenu').append($(this));
            });
            menuMorePosition = parseInt($('.mainnav__more').position().left);
            $('.mainnav .mainnav__more').on('click',function(){
              $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
              $('.overflowMenu').hasClass('active') ? $('.overflowMenu').removeClass('active') : $('.overflowMenu').addClass('active');
              $('.mainnav .mainnav__list').hasClass('active') ? $('.mainnav .mainnav__list').removeClass('active') : $('.mainnav .mainnav__list').addClass('active');
            });
            $(function($){
              $(document).on('mouseup', function (e){
                    var div = $(".overflowMenu.active");
                    var btn = $(".mainnav .mainnav__more");
                    if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
                      div.removeClass('active');
                      btn.removeClass('active');
                      $('.mainnav .mainnav__list').removeClass('active');
                    }
              });
            });
            return false;
      }
    }
  }   
  if($(window).width() >= 700){
    headerMenu();
  }  

  // Открытие каталога в шапке с сохранением вложенности
  $('.catalog__item .open').on('click', function(event){
    event.preventDefault();
    if ($(this).closest('.parent').hasClass('opened')) {
      $(this).parent().next('.sub').slideUp(600);
      $(this).closest('.parent').removeClass('opened');
      $(this).closest('.open').removeClass('opened');
    } else {
      $(this).parent().next('.sub').slideDown(600);
      $(this).closest('.parent').addClass('opened');
      $(this).closest('.open').addClass('opened');
    }
  });
}

      
// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnavHeader(){
  var mainnav = $('header .mainnav');
  var overMenuExist = mainnav.find('.overflowMenu li').length;
  if(overMenuExist){
    mainnav.find('.overflowMenu li').removeClass('mainnav__replaced');
    mainnav.find('.mainnav__more').remove();
    mainnav.find('.overflowMenu li').each(function(){
      mainnav.find('.mainnav__list').append($(this));
    });
  }
  var menuHeight = 2;
  var menuWidth = mainnav.width() * menuHeight;
  var menuCount = mainnav.find('.mainnav__list li').length + 1;
  var nextCheck = 0;
  for(var i=1; i < menuCount;  i++){
    var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width())) + 16;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      mainnav.find('.mainnav__replaced').each(function(){
        mainnav.find('.overflowMenu').append($(this));
      });
      mainnav.find('.mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__link"><span>Ещё</span><i class="icon-arrow_drop_down"></i></a></li>');
      mainnav.find('.mainnav__more').on('click',function(){
        mainnav.find('.overflowMenu').hasClass('opened') ? mainnav.find('.overflowMenu').removeClass('opened') : mainnav.find('.overflowMenu').addClass('opened');
        mainnav.hasClass('opened') ? mainnav.removeClass('opened') : mainnav.addClass('opened');
      });
      $(function($){
        $(document).mouseup(function (e){
          var div =  mainnav.find('.overflowMenu.opened');
          var btn =  mainnav.find('.mainnav__more');
          if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
            div.removeClass('opened');
            mainnav.removeClass('opened');
          }
        });
      });
      return false;
    }
  }
}

// Отсчет даты до окончания акции
function counterDate() {
  // Устанавливаем дату обратного отсчета ММ-ДД-ГГ
  $('.sale-counter').each(function(i, el){
    var end = $(el).attr('end');
    var countDownDate = new Date(end).getTime();
    // Обновление счетчика каждую секунду
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Вывод
      $(el).find('.days span').text(days);
      $(el).find('.hours span').text(hours);
      $(el).find('.minutes span').text(minutes);
      $(el).find('.seconds span').text(seconds);
      // Счетчик завершен
      if (distance < 0) {
        clearInterval(x);
        $(el).find('span').text("0");
      }
    }, 1000);
  })
}
