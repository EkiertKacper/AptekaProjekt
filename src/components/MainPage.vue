<script setup>
import { ref, onMounted, defineComponent } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePageChanger } from '../state/pageChanger';
import ProductList from './ProductList.vue';
import Toast from './Toast.vue';
import ProductPage from './ProductPage.vue';
import { useCartStore } from '../scripts/cart';

const pageChanger = usePageChanger()
const cart = useCartStore()
const data = ref([])

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: 0,
    limit: 10,
  };

  try {
    const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });

    const fullData = await response.json();
    data.value = (fullData.data || [])
    .filter(item => item.amount > 0)
    .map(item => ({
      ...item,
      id: item.idDrug,
    }));
  } catch (error) {
    console.log(error);
  }
};
const toast = ref(null);
function showToast (message, status) {
  toast.value.showToast(message, status);
};
const addProduct = (item) => {
  const mes = cart.addToCart(item);  
  switch(mes){
    case 'positive': 
      showToast("Dodano do koszyka!", 'positive')
      break;
    case 'error':
      showToast("Nie mamy więcej tego produktu!", 'negative')  
      break;
  }
};

const servicesSection = ref(null);
const aboutSection = ref(null);
const productsSection = ref(null);
const opinionsSection = ref(null);
const partnersSection = ref(null);

const sectionRefs = {
services: servicesSection,
about: aboutSection,
products: productsSection,
opinions: opinionsSection,
partners: partnersSection,
};

const scrollToSection = (sectionId) => {
  const section = sectionRefs[sectionId]?.value;
  section.scrollIntoView({ behavior: 'smooth' });
};
const openProductPage = (itemId) => {
  const selectedItem = data.value.find(item => item.id === itemId);
  pageChanger.changePage(defineComponent(ProductPage), {product: selectedItem})
}


onMounted(() => {
AOS.init({
 duration: 700,
 easing: 'ease-out-quad',
 once: true,
 offset: 100,
});
fetchData()
});

</script>

<template>
  <div class="container">
    <header>
      <img src="../assets/leki.jpg" alt="baner" />
      <div class="header-content">
        <h1 data-aos="fade-down">Twoje Zdrowie - Nasza Troska</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Profesjonalna opieka farmaceutyczna i szeroki wybór produktów.
        </p>
        <button @click="scrollToSection('services')" data-aos="fade-up" data-aos-delay="100">
          Zobacz Nasze Usługi
        </button>
      </div>
    </header>

    <main>
      <section id="services" ref="servicesSection">
        <h2>Nasze Usługi</h2>
        <p class="section-subtitle">Kompleksowa opieka dla Ciebie i Twojej rodziny.</p>
        <div class="grid services-grid">
          <div class="card card--service" data-aos="fade-up" :data-aos-delay="100">
            <div class="card__image-container card__image-container--icon">
              <img src="../assets/recepta.jpg" alt="ikona" class="card-icon" />
            </div>
            <h3 class="card-title">Realizacja Recept</h3>
            <p class="card-description">Szybka i sprawna realizacja recept refundowanych i pełnopłatnych.</p>
          </div>

          <div class="card card--service" data-aos="fade-up" data-aos-delay="100">
            <div class="card__image-container card__image-container--icon">
              <img src="../assets/asortyment.jpg" alt="ikona" class="card-icon" />
            </div>
            <h3 class="card-title">Szeroki Asortyment</h3>
            <p class="card-description">Leki, suplementy, dermokosmetyki, sprzęt medyczny - wszystko w jednym miejscu.
            </p>
          </div>

          <div class="card card--service" data-aos="fade-up" data-aos-delay="100">
            <div class="card__image-container card__image-container--icon">
              <img src="../assets/doradztwo.jpg" alt="ikona" class="card-icon" />
            </div>
            <h3 class="card-title">Doradztwo Farmaceutyczne</h3>
            <p class="card-description">Indywidualne konsultacje dotyczące terapii i profilaktyki zdrowotnej.</p>
          </div>

        </div>
      </section>

      <section id="about" ref="aboutSection">
        <div class="about-content">
          <div class="about__image-container" data-aos="fade-right">
            <img src="../assets/apteka.jpg" alt="apteka" class="about-image" />
          </div>
          <div class="about__text-block" data-aos="fade-left">
            <h2 class="section-title section-title--left">Poznaj Naszą Aptekę</h2>
            <p class="about-text">
              Jesteśmy zespołem doświadczonych farmaceutów z pasją do pomagania. Od lat budujemy zaufanie naszych
              pacjentów, oferując nie tylko leki, ale także fachowe doradztwo i indywidualne podejście. Stawiamy na
              wysoką jakość obsługi, szeroki asortyment sprawdzonych produktów oraz przyjazną atmosferę.
            </p>
            <p class="about-text">
              Wierzymy, że zdrowie jest najcenniejsze, dlatego stale podnosimy nasze kwalifikacje, aby zapewnić Ci
              najlepszą możliwą opiekę.
            </p>
          </div>
        </div>
      </section>

      <section id="products" ref="productsSection">
        <h2>Popularne Produkty</h2>
        <p class="section-subtitle">Sprawdzone i polecane przez naszych pacjentów.</p>
        <div class="products-carousel-wrapper">
          <div class="products-carousel" data-aos="fade-up">

            <div v-for="item in data" class="card product" @click="openProductPage(item.id)">
              <div class="card image-container card image-container product">
                <img src="../assets/paracetamol.jpg" :alt="item.name" class="card-image" />
              </div>
              <h4 class="card-title card-title--product">{{ item.name }} {{item.dose}}mg</h4>
              <p class="card-price">{{ item.price }} zł</p>
              <button @click.stop="addProduct(item)">Do Koszyka</button>
            </div>

          </div>
        </div>
        <button style="display: block; margin-left: auto; margin-right: auto;"
          @click="()=> pageChanger.changePage(defineComponent(ProductList))">Zobacz Wszystkie Produkty</button>
      </section>

      <section id="opinions" ref="opinionsSection">
        <h2 class="section-title">Co Mówią Nasi Klienci</h2>
        <div class="grid opinions-grid">
          <div class="card opinion" data-aos="fade-up" data-aos-delay="100">
            <p class="card-text">"Zawsze mogę liczyć na fachową poradę i miłą obsługę. Polecam tę aptekę!"</p>
            <small class="card-author">-Katarzyna Nowak</small>
          </div>
          <div class="card opinion" data-aos="fade-up" data-aos-delay="100">
            <p class="card-text">"Duży wybór leków, a czego nie ma, szybko sprowadzają. Profesjonalizm w każdym calu."
            </p>
            <small class="card-author">-Tomasz Kowalski</small>
          </div>
          <div class="card opinion" data-aos="fade-up" data-aos-delay="100">
            <p class="card-text">"Bardzo pomocni farmaceuci, szczególnie przy doborze dermokosmetyków. Jestem stałą
              klientką."</p>
            <small class="card-author">-Ewa Wiśniewska</small>
          </div>
        </div>
      </section>

      <section id="partners" ref="partnersSection">
        <h2 class="section-title section-title--subtle">Zaufali Nam</h2>
        <div class="partners-list" data-aos="fade-up">
          <div class="partner-logo" data-aos-delay="100" data-aos="zoom-in">
            <img src="../assets/larry.jpg" alt="`Logo Partnera" class="partner-logo-image" />
          </div>

          <div class="partner-logo" data-aos-delay="100" data-aos="zoom-in">
            <img src="../assets/ryba.png" alt="`Logo Partnera" class="partner-logo-image" />
          </div>

          <div class="partner-logo" data-aos-delay="100" data-aos="zoom-in">
            <img src="../assets/tung.png" alt="`Logo Partnera" class="partner-logo-image" />
          </div>
        </div>
      </section>

    </main>

    <footer class="site-footer">
      <div class="site-footer__container">
        <nav class="site-footer-nav">
          <a href="#services" class="site-footer__link" @click.prevent="scrollToSection('services')">Usługi</a>
          <a href="#about" class="site-footer__link" @click.prevent="scrollToSection('about')">O Nas</a>
          <a href="#products" class="site-footer__link" @click.prevent="scrollToSection('products')">Produkty</a>
          <a href="#opinions" class="site-footer__link" @click.prevent="scrollToSection('opinions')">Opinie</a>
        </nav>
      </div>
    </footer>
    <Toast ref="toast"/>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@400;500&display=swap');


$color-primary: #81b433;
$color-dark: #2E3D49;
$gray-text: #495057;

header {
 position: relative;
 height: 60vh;
 color: #fff;

 img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
 }

 .header-content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  background: rgba($color-dark, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(5px);
 }

 h1 {
  color: #f0f0f0;
  font-size: 3rem;
  margin-bottom: 1rem;
 }

 p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  font-weight: 300;
 }

 button {
  padding: 1rem 2rem;
  
 }
}

section {
 padding: 5rem 2rem;
 margin: 0 auto;
 max-width: 1200px;
 
 &:nth-of-type(odd) {
  background-color: #fafafa;
 }

 &:nth-of-type(even) {
  background-color: #fff;
 }
 img {
  width: 100%;
  height: 100%;
 }
}

.grid {
 display: grid;
 gap: 2rem;
}

h2 {
 color: $color-primary;
 font-size: 2.5rem;
 font-weight: 700;
 margin-bottom: 1rem;
 text-align: center;
}

.section-subtitle {
 display: block;
 font-size: 1.1rem;
 color: #6c757d;
 text-align: center;
 margin-bottom: 1rem;
}

button {
 display: inline-block;
 padding: 0.8rem 1.8rem;
 min-width: max-content;
 border: none;
 border-radius: 50px;
 cursor: pointer;
 transition: all 0.2s;
 text-decoration: none;
 text-align: center;
 background-color: $color-primary;
 color: #fff;
 box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

 &:hover {
  filter: brightness(80%);
 }
}

.card {
 background-color: #fff;
 border-radius: 12px;
 box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
 padding: 2rem;
 text-align: center;
 transition: all 0.2s;
 height: auto;
 display: flex;
 flex-direction: column;
 cursor: pointer;



 &:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
 }

 &.image-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
 }

 &-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: $color-dark;
  margin-bottom: 0.75rem;

  &.product {
   font-size: 1rem;
   height:300px;
  }
 }

 &-description {
  color: #6c757d;
  font-size: 0.95rem;
  flex-grow: 1;
  margin-bottom: 1.5rem;
 }

 &-price {
  color: $color-primary;
  font-weight: 700;
  margin-bottom: 1rem;
 }


 &.opinion {
  border-left: 5px solid $color-primary;
  text-align: left;
  color: $gray-text;

  .card-text {
   font-style: italic;
   margin-bottom: 1rem;
   font-size: 1rem;
   line-height: 1.6;
   flex-grow: 1;
  }
 }
}


.about__image-container {
 height: 100%;
 border-radius: 12px;
 overflow: hidden;
 box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

 img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
 }
}

.partner-logo {
 height: 120px;
 width: 130px;
 border-radius: 12px;
 overflow: hidden;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #fff;
 box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
 transition: all 0.2s;

 img{
  max-height: 100%;
 }

 &:hover {
  transform: translateY(-3px);
 }
}

.services-grid {
 grid-template-columns: 1fr 1fr 1fr;
 gap: 2rem;
}

.about-content {
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 1rem;
 align-items: center;
}

.about-text {
 font-size: 1rem;
 line-height: 1.8;
 margin-bottom: 1.5rem;
 color: #6c757d;
}

.products-carousel {
 display: flex;
 overflow-x: auto;
 gap: 1.5rem;
 padding-bottom: 1rem;
 -ms-overflow-style: none;

}


.partners-list {
 display: flex;
 justify-content: center;
 align-items: center;
 flex-wrap: wrap;
 gap: 3rem;
}

.site-footer {
 background-color: $color-dark;
 color: #fff;
 padding: 2rem;
 text-align: center;

 &-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
 }

 a {
  color: #f0f0f0;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
   color: $color-primary;
  }
 }
}

@media (max-width: 768px) {
 header {
  height: 55vh;
  min-height: 400px;

  h1 {
   font-size: 2rem;
  }

  p {
   font-size: 1rem;
   margin-bottom: 1.5rem;
  }

  .header-content {
   padding: 1.5rem;
  }
 }

 section {
  padding: 3rem 1rem;

  &-title {
   font-size: 2rem;
  }

  &-subtitle {
   font-size: 1rem;
   margin-bottom: 2rem;
  }
 }

 .services-grid,
 .opinions-grid {
  grid-template-columns: 1fr;
  gap: 1.5rem;
 }

 .about-content {
  grid-template-columns: 1fr;
  gap: 2rem;
 }

 .about__text-block {
  order: -1;
  text-align: center;
 }

 .site-footer {
  &-nav {
   flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  }
 }
}
</style>