
const accountButton = document.getElementById ('accountButton');
const formContainer = document.getElementById('formContainer');
const closeButton = document.getElementById('closeButton');
const closeButton2 = document.getElementById('closeButton2');
const backButton = document.getElementById('backButton');
const loginForm = document.getElementById('loginForm');
const registerButton = document.getElementById('registerButton');
const registerForm = document.getElementById('registerForm');

accountButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
});

backButton.addEventListener('click', () => {
    toggleForms();
})

function signInWithGoogle() {
    alert("Google ile giriş yap buttonuna tıkladınız");
}

function signInWithApp() {
    alert("App hesabı ile giriş yap buttonuna tıklayınız.");
}

function toggleForms() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');

    if (registerForm.classList.contains('hidden')) {
        registerButton.style.display = 'block';
    } else {
        registerButton.style.display = 'none';
    }
}
// list start
const arrows = document.querySelectorAll('.arrow');
const listselects = document.querySelectorAll('.list-select');

arrows.forEach((arrow, i) => {
    const widthRatio = Math.floor(window.innerWidth / 330);
    let clickCounter = 0;
    const images = listselects[i].querySelectorAll('img');
    const imagesCount = images.length;

    arrow.addEventListener('click', () => {
        clickCounter++;
        const currentTransform = parseFloat(getComputedStyle(listselects[i]).transform.split(',')[4]) || 0;

        if (imagesCount - (7 + clickCounter) + (7 - widthRatio) >= 0) {
            listselects[i].style.transform = `translateX(${currentTransform - 330}px)`;
        } else {
            listselects[i].style.transform = 'translateX(0)';
            clickCounter = 0;
        }
    });
});
// list end
// Ürün Ekleme Fonksiyonu
function addToCart(urunAdi) {
    // Bildirim göstermek için bir div oluştur
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${urunAdi} sepetinize eklendi!`;
    document.body.appendChild(notification);

    // Bildirimi belirli bir süre sonra kaldır
    setTimeout(() => {
        notification.remove();
    }, 3000); // 3 saniye sonra bildirimi kaldır

    // Sepete ürün ekleme işlemi
    const urunListesi = document.querySelector("#urun-listesi .items");

    let urun = urunListesi.querySelector(`[data-urun-adi="${urunAdi}"]`);
    if (urun) {
        // Ürün zaten sepetteyse adedini artır
        let adetElementi = urun.querySelector(".urun-adet");
        let adet = parseInt(adetElementi.textContent);
        adetElementi.textContent = adet + 1;
    } else {
        // Ürün sepette yoksa yeni ürün oluştur ve sepete ekle
        urun = document.createElement("div");
        urun.className = "cart-item";
        urun.setAttribute("data-urun-adi", urunAdi);
        urun.innerHTML = `
        ${urunAdi}
        <div class="urun-kapsamı">
        <button class="urun-artir" onclick="changeQuantity('${urunAdi}', 1)">+</button>
        <span class="urun-adet">1</span> 
        <button class="urun-azalt" onclick="changeQuantity('${urunAdi}', -1)">-</button>
        <button class="urun-sil" onclick="removeFromCart('${urunAdi}')">Sil</button></div>
    `;
        urun.style.display = 'flex';
        urun.style.alignItems = 'center';
        urunListesi.appendChild(urun);
    }

    updateTotalPrice(20); // Her ürün 20₺ olarak varsayıldı
}

// Ürün Adeti Değiştirme Fonksiyonu
function changeQuantity(urunAdi, degisim) {
    const urun = document.querySelector(`[data-urun-adi="${urunAdi}"]`);
    let adetElementi = urun.querySelector(".urun-adet");
    let adet = parseInt(adetElementi.textContent);

    // Adeti değiştir ve 0'dan küçük olmasını önle
    adet = Math.max(1, adet + degisim);
    adetElementi.textContent = adet;

    updateTotalPrice(degisim * 20); // Her ürün 20₺ olarak varsayıldı
}

// Ürün Silme Fonksiyonu
function removeFromCart(urunAdi) {
    const urun = document.querySelector(`[data-urun-adi="${urunAdi}"]`);
    let adetElementi = urun.querySelector(".urun-adet");
    let adet = parseInt(adetElementi.textContent);

    urun.remove();
    updateTotalPrice(-adet * 20); // Her ürün 20₺ olarak varsayıldı
}

// Toplam Fiyat Güncelleme Fonksiyonu
function updateTotalPrice(degisim) {
    const toplamFiyat = document.querySelector(".total");
    let toplam = parseFloat(toplamFiyat.textContent.replace("Toplam: ", "").replace("₺", ""));
    toplam += degisim;
    toplamFiyat.textContent = "Toplam: " + toplam + "₺";
}

// Sepet Gösterme Fonksiyonu
function sepetiGoster() {
    const sepetIcerik = document.getElementById("sepet-icerik");
    sepetIcerik.style.display = "block"; // Sepet içeriğini görünür yap

    // Sepeti kapatmak için close butonuna event listener ekleyin
    document.getElementById("closeButton2").addEventListener("click", function () {
        sepetIcerik.style.display = "none";
    });
}

// Sayfa yüklendiğinde çalıştırılacak fonksiyon
window.onload = function () {
    // Sepeti kapatmak için close butonuna event listener ekle
    document.getElementById("closeButton2").addEventListener("click", function () {
        document.getElementById("sepet-icerik").style.display = "none";
    });
};


const navMenu = document.getElementById ('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

    // const searchBox = document.getElementById('searchBox');
    // const searchIcon = document.getElementById('searchIcon');

    // searchIcon.addEventListener('click', () => {
    //     searchBox.classList.toggle('active');
    // });


    const searchBox = document.getElementById('searchBox');
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');

    // İkona tıklayınca kutuyu aç/kapat
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Tıklamanın dışarıya yayılmasını engelle
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Sayfanın herhangi bir yerine tıklanınca kutuyu kapat
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });


    


  window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  });

  // Sayfa yüklendiğinde başlangıçta şeffaf yap
  window.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    header.classList.add('transparent');
  });



  const slider = document.getElementById('slider');
  const buttons = document.querySelectorAll('.pagination button');
  let currentIndex = 0;
  const totalSlides = buttons.length;

  function goToSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');
    currentIndex = index;
  }

  // Otomatik geçiş fonksiyonu
  function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  // Her 5 saniyede bir geçiş yap
  setInterval(autoSlide, 5000);
