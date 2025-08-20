const translations={
  ru:{home:"Главная",products:"Товары",about:"О нас",productsTitle:"Наши товары",viewAll:"Смотреть все товары",
      aboutTitle:"Почему именно мы?",aboutText:"Мы продаём оригинальную, полностью легитимную одежду буквально за копейки! 🔥Секрет наших цен прост: списанная одежда со складов брендов и интернет-магазинов обычно уходит за сущие копейки — и мы даём вам шанс купить её первыми.Мы предоставляем полную гарантию на качество и долговечность наших товаров (разумеется, если носить их аккуратно 😉).Актуальные позиции вы можете просмотреть в верхней части сайта или в нашей галерее. Мы ценим каждого покупателя ❤️ Спасибо за интерес к нам! Ваш заказ будет подготовлен в лучшем виде — можете быть уверены! 🚀",
      aboutTextExtra:"Мы ценим каждого покупателя ❤️ Спасибо за интерес к нам! Ваш заказ будет подготовлен в лучшем виде — можете быть уверены! 🚀",},
  en:{home:"Home",products:"Products",about:"About Us",productsTitle:"Our Products",viewAll:"View All Products",
      aboutTitle:"Why choose us?",aboutText:"We sell original, fully legit clothing for literally pennies! 🔥The secret behind our prices is simple: overstock and written-off items from brand warehouses and online stores are sold off for almost nothing — and we give you the chance to grab them first.We provide a full guarantee of quality and durability (of course, as long as you wear them with care 😉). You can explore the available items at the top of the site or in our gallery.",
      aboutTextExtra:"We value every customer ❤️ Thank you for your interest!Rest assured — your order will be prepared in the best possible way 🚀",},
  az:{home:"Ana Səhifə",products:"Məhsullar",about:"Haqqımızda",productsTitle:"Məhsullarımız",viewAll:"Bütün Məhsulları Bax",
      aboutTitle:"Niyə bəs biz?",aboutText:"Biz tam orijinal və rəsmi geyimləri cəmi qəpik qiymətinə satırıq! 🔥Qiymətlərimizin sirri sadədir: brend anbarlarından və onlayn mağazalardan silinmiş geyimlər çox ucuz qiymətə satılır və biz sizə onları ilk əldə etmək şansı veririk.Məhsullarımızın keyfiyyətinə və uzunömürlülüyünə tam zəmanət veririk (əlbəttə, geyimi səliqəli geyinsəniz 😉).Mövcud məhsulları səhifənin yuxarısında və ya qalereyamızda görə bilərsiniz.",
      aboutTextExtra:"Biz hər bir alıcını dəyərləndiririk ❤️ Bizə maraq göstərdiyiniz üçün təşəkkür edirik! Əmin olun — sifarişiniz ən yaxşı şəkildə hazırlanacaq 🚀",}
};
function translateSite(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(translations[lang][key]) el.textContent=translations[lang][key];
  });
}
document.getElementById('language-select-mobile').addEventListener('change',e=>translateSite(e.target.value));
translateSite('ru');

// Бургер меню
const burger=document.querySelector('.burger');
const navLinks=document.querySelector('.nav-links');

burger.addEventListener('click',()=>{
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
});


// Карусель
const track=document.querySelector('.carousel-track');
const items=Array.from(track.children);
const prevBtn=document.querySelector('.prev');
const nextBtn=document.querySelector('.next');
let index=0;
function updateCarousel(){
  const itemWidth=items[0].getBoundingClientRect().width;
  track.style.transform=`translateX(-${index*itemWidth}px)`;
  items.forEach((item,i)=>{
    item.style.opacity=i===index?1:0.4;
    item.style.transform=i===index?'scale(1)':'scale(0.9)';
  });
}
nextBtn.addEventListener('click',()=>{index=(index+1)%items.length;updateCarousel();});
prevBtn.addEventListener('click',()=>{index=(index-1+items.length)%items.length;updateCarousel();});

// Свайп
let startX=0,isDown=false;
track.addEventListener('touchstart', e=>{startX=e.touches[0].clientX;isDown=true;});
track.addEventListener('touchend', e=>{
  if(!isDown) return;
  const endX=e.changedTouches[0].clientX;
  if(endX-startX>50) index=(index-1+items.length)%items.length;
  else if(startX-endX>50) index=(index+1)%items.length;
  updateCarousel(); isDown=false;
});
window.addEventListener('resize',updateCarousel);
updateCarousel();

// Птицы с синусоидальной траекторией
const birdContainer=document.querySelector('.bird-container');
const numBirds=5;
for(let i=0;i<numBirds;i++){
  const bird=document.createElement('div');
  bird.classList.add('bird');
  birdContainer.appendChild(bird);

  let x=Math.random()*100, y=Math.random()*100;
  let angle=Math.random()*Math.PI*2, speed=0.5+Math.random()*0.5;
  let amplitude=10+Math.random()*10, frequency=0.01+Math.random()*0.02;

  function animateBird(){
    x+=Math.cos(angle)*speed;
    y+=Math.sin(angle)*speed + Math.sin(Date.now()*frequency)*amplitude*0.05;
    if(x<0){x=0;angle=Math.random()*Math.PI/2;}
    if(x>100){x=100;angle=Math.random()*-Math.PI/2;}
    if(y<0){y=0;angle=Math.random()*Math.PI/2+Math.PI/2;}
    if(y>100){y=100;angle=Math.random()*-Math.PI/2-Math.PI/2;}
    bird.style.left=x+'%';
    bird.style.top=y+'%';
    requestAnimationFrame(animateBird);
  }
  animateBird();
}

/* Лайтбокс */

const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const btnClose = document.querySelector(".lightbox .close");
const btnPrev = document.querySelector(".lightbox .prev");
const btnNext = document.querySelector(".lightbox .next");

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => showLightbox(index));
});

btnClose.addEventListener("click", closeLightbox);
btnNext.addEventListener("click", nextImage);
btnPrev.addEventListener("click", prevImage);

window.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  }
});


/* Лайтбокс для галереи */

