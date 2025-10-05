<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import productService from '@/services/productService'
import EmptyState from '@/components/EmptyState.vue'
import { initScrollReveal } from '@/plugins/navbarmobile'

onMounted(() => {
  initScrollReveal()
})

const products = ref([])
const isLoading = ref(true)
const router = useRouter()

const isNavOpen = ref(false)

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}

const showAllProducts = ref(false)

// Computed property untuk produk yang akan ditampilkan
const displayedProducts = computed(() => {
  if (showAllProducts.value) {
    return products.value // Tampilkan semua jika showAllProducts adalah true
  }
  return products.value.slice(0, 3) // Tampilkan hanya 3 item pertama
})

onMounted(async () => {
  isLoading.value = true // Set isLoading ke true di awal
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1500))
    const response = await productService.getProducts()
    products.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data produk:', error)
  } finally {
    isLoading.value = false
  }
})

// Fungsi untuk memilih gambar secara acak dari array 'images'
const getRandomImage = (images) => {
  if (!images || images.length === 0) {
    return 'https://placehold.co/600x400' // Gambar default jika tidak ada
  }
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

// Fungsi untuk navigasi ke halaman detail
const goToDetail = (productId) => {
  router.push(`/product-detail/${productId}`)
}
</script>

<template>
  <nav>
    <div class="nav__header">
      <div class="nav__logo">
        <a href="#" class="logo">Ice<span>World</span></a>
      </div>
      <div class="nav__menu__btn" id="menu-btn" @click="toggleNav">
        <i :class="isNavOpen ? 'ri-close-line' : 'ri-menu-3-line'"></i>
      </div>
    </div>
    <ul class="nav__links" id="nav-links" :class="{ open: isNavOpen }" @click="closeNav">
      <li><a href="#home">Home</a></li>
      <li><a href="#menu">Menu</a></li>
      <li><a href="#categories">Categories</a></li>
      <li><a href="#contact">Contact Us</a></li>
    </ul>
    <div class="nav__btns">
      <button class="btn"><i class="ri-shopping-cart-line"></i></button>
      <button class="btn"><i class="ri-notification-3-fill"></i></button>
    </div>
  </nav>

  <header id="home">
    <div class="header__image">
      <img src="/images/header.png" alt="header" />
    </div>
    <div class="header__content">
      <h1>WELCOME TO OUR <span>ICE CREAM</span> WORLD</h1>
      <p class="section__description">
        Indulge in a delightful journey of flavors! Discover creamy, delicious ice creams crafted to
        bring joy to every scoop. Welcome to your sweet escape!
      </p>
      <div class="header__btn">
        <router-link to="/orders" class="btn">Order Now</router-link>
      </div>
      <ul class="socials">
        <li>
          <a href="#"><i class="ri-facebook-fill"></i></a>
        </li>
        <li>
          <a href="#"><i class="ri-twitter-fill"></i></a>
        </li>
        <li>
          <a href="#"><i class="ri-pinterest-line"></i></a>
        </li>
        <li>
          <a href="#"><i class="ri-phone-fill"></i></a>
        </li>
      </ul>
    </div>
  </header>

  <section class="section__container products__container">
    <h2 class="section__header">Products</h2>

    <div v-if="isLoading" class="products__grid">
      <div v-for="n in 3" :key="n" class="flex flex-col space-y-3">
        <Skeleton class="h-[170px] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div class="space-y-2 p-2">
          <Skeleton class="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton class="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
          <Skeleton class="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>

    <div v-else>
      <EmptyState
        v-if="products.length === 0"
        title="Belum Ada Produk"
        description="Saat ini belum ada produk untuk ditampilkan."
      />

      <div v-else>
        <div class="products__grid">
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            class="product__card"
            @click="goToDetail(product.id)"
          >
            <img
              :src="getRandomImage(product.images)"
              :alt="product.name"
              class="product__card__image"
            />
            <div class="product__card__content">
              <h3 class="product__card__title">{{ product.name }}</h3>
              <p class="product__card__description">{{ product.description }}</p>
            </div>
          </div>
        </div>

        <div class="more__button__container">
          <button
            v-if="!showAllProducts && products.length > 3"
            @click="showAllProducts = true"
            class="more__button"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="section__container popular__container" id="menu">
    <h2 class="section__header">Popular Ice-Cream</h2>
    <div class="popular__grid">
      <div class="popular__card">
        <img src="/images/popular-1.png" alt="popular" />
        <div class="popular__card__content">
          <h4>Mango Tango Sorbet</h4>
          <h3>$5.49</h3>
        </div>
      </div>
      <div class="popular__card">
        <img src="/images/popular-2.png" alt="popular" />
        <div class="popular__card__content">
          <h4>Chocolate Fudge Delight</h4>
          <h3>$5.99</h3>
        </div>
      </div>
      <div class="popular__card">
        <img src="/images/popular-3.png" alt="popular" />
        <div class="popular__card__content">
          <h4>Strawberry Swirl Bliss</h4>
          <h3>$4.99</h3>
        </div>
      </div>
    </div>
  </section>

  <section class="section__container discover__container" id="categories">
    <h2 class="section__header">Most Selling Ice-Cream</h2>
    <p class="section__description">
      Discover our crowd favorites! These ice creams are loved by everyone and have become the top
      picks for their irresistible flavors and creamy textures.
    </p>
    <div class="discover__grid">
      <div class="discover__card">
        <img src="/images/discover-1.jpg" alt="discover" />
        <div class="discover__card__content">
          <h4>Double Chocolate Crunch</h4>
          <p class="section__description">
            Dive into a chocolate lover's paradise with our Double Chocolate Crunch. This rich and
            creamy ice cream is made with premium cocoa and blended with crunchy chocolate chunks to
            deliver a perfect balance of smoothness and texture.
          </p>
          <h3>
            $6.99 <span><s>$9.99</s></span>
          </h3>
          <div class="discover__card__btn">
            <button class="btn">Buy Now</button>
          </div>
        </div>
      </div>
      <div class="discover__card">
        <img src="/images/discover-2.jpg" alt="discover" />
        <div class="discover__card__content">
          <h4>Strawberry Cheesecake Bliss</h4>
          <p class="section__description">
            Experience the perfect harmony of fruity and creamy with our Strawberry Cheesecake
            Bliss. Every spoonful feels like enjoying a slice of fresh strawberry cheesecake, making
            it an irresistible dessert.
          </p>
          <h3>
            $5.99 <span><s> $8.99</s></span>
          </h3>
          <div class="discover__card__btn">
            <button class="btn">Buy Now</button>
          </div>
        </div>
      </div>
      <div class="discover__card">
        <img src="/images/discover-3.jpg" alt="discover" />
        <div class="discover__card__content">
          <h4>Classic Cookies and Cream</h4>
          <p class="section__description">
            Savor the timeless charm of our Classic Cookies and Cream ice cream. Made with velvety
            smooth vanilla ice cream, it is generously packed with chunks of chocolate cookies to
            create a delightful crunch in every bite.
          </p>
          <h3>
            $5.49 <span><s> $10.49</s></span>
          </h3>
          <div class="discover__card__btn">
            <button class="btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="banner">
    <div class="banner__image"></div>
    <div class="banner__content">
      <h2 class="section__header">Get Yummy Ice-Cream at a Reasonable Price</h2>
      <p class="section__description">
        Treat yourself to delightful ice creams without breaking the bank! Enjoy premium quality and
        mouthwatering flavors at prices that make every scoop worth it.
      </p>
      <div class="banner__flex">
        <div class="banner__card">
          <img src="/images/banner-1.png" alt="banner" />
          <h4>Fresh & Natural</h4>
        </div>
        <div class="banner__card">
          <img src="/images/banner-2.png" alt="banner" />
          <h4>Quick Packaging</h4>
        </div>
        <div class="banner__card">
          <img src="/images/banner-3.png" alt="banner" />
          <h4>Fast Delivery</h4>
        </div>
      </div>
    </div>
  </section>

  <section class="section__container subscribe__container" id="contact">
    <div class="subscribe__content">
      <h2 class="section__header">Subscribe For Discounts</h2>
      <p class="section__description">
        Don't miss out on sweet deals! Subscribe now to receive exclusive discounts and updates on
        our latest ice cream flavors and special offers.
      </p>
      <form action="/">
        <input type="text" placeholder="Type Your Email" />
        <button class="btn">Subscribe</button>
      </form>
    </div>
  </section>

  <footer>
    <div class="section__container footer__container">
      <div class="footer__col">
        <a href="#" class="logo">Ice<span>World</span></a>
      </div>
      <div class="footer__col">
        <ul class="footer__links">
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <ul class="socials">
          <li>
            <a href="#"><i class="ri-facebook-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-twitter-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-pinterest-line"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-phone-fill"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__bar">Copyright © 2025. All rights reserved.</div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
  --primary-color: #ed8613;
  --primary-color-dark: #d47911;
  --text-dark: #333333;
  --text-light: #767268;
  --extra-light: #f1f1f1;
  --white: #ffffff;
  --max-width: 1200px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.section__container {
  max-width: 1440px;
  margin: auto;
  padding: 5rem 1rem;
}

.section__header {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  line-height: 3rem;
}

.section__description {
  font-size: 1rem;
  font-weight: 500;
  color: #767268;
  line-height: 1.75rem;
  text-align: center;
}

.btn {
  padding: 1rem 2rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #ffffff;
  background-color: #ed8613;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
}

.btn:hover {
  background-color: #d47911;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

img {
  display: flex;
  width: 100%;
}

a {
  text-decoration: none;
  transition: 0.3s;
}

ul {
  list-style: none;
}

html,
body {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
}

nav {
  position: fixed;
  isolation: isolate;
  width: 100%;
  z-index: 9;
}

.nav__header {
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ed8613;
}

.nav__logo .logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
}

.nav__menu__btn {
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
}

.nav__links {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #ed8613;
  transition: transform 0.5s;
  z-index: -1;
}

.nav__links.open {
  transform: translateY(100%);
}

.nav__links a {
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
}

.nav__links a:hover {
  color: #333333;
}

.nav__btns {
  display: none;
}

header {
  padding-top: 5rem;
  display: grid;
}

.header__image {
  position: relative;
  isolation: isolate;
}

.header__image::before {
  position: absolute;
  content: '';
  height: 100%;
  aspect-ratio: 1;
  background-color: #ed8613;
  border-radius: 100%;
  z-index: -1;
}

.header__image img {
  max-width: 675px;
}

.header__content {
  padding-block: 2rem 5rem;
  padding-inline: 1rem;
}

.header__content h1 {
  margin-bottom: 2rem;
  font-size: 4.5rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  line-height: 5.5rem;
}

.header__content h1 span {
  color: #ed8613;
}

.header__btn {
  margin-block: 2rem;
  text-align: center;
}

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.socials a {
  display: inline-block;
  padding: 5px 9px;
  font-size: 1.125rem;
  color: #ffffff;
  background-color: #333333;
  border-radius: 100%;
}

.socials a:hover {
  background-color: #ed8613;
}

.popular__grid {
  margin-top: 4rem;
  display: grid;
  gap: 4rem 1rem;
}

.popular__card {
  position: relative;
  isolation: isolate;
}

.popular__card::before {
  position: absolute;
  content: '';
  bottom: 5rem;
  left: 0;
  height: 60%;
  width: 100%;
  z-index: -1;
  transition: 0.5s;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
}

.popular__card:hover::before {
  height: 90%;
}

.popular__card:nth-child(1)::before {
  background-color: #fde6f2;
}

.popular__card:nth-child(2)::before {
  background-color: #eedfd9;
}

.popular__card:nth-child(3)::before {
  background-color: #faeaed;
}

.popular__card img {
  max-width: 250px;
  margin-inline: auto;
}

.popular__card__content {
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
}

.popular__card__content h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
}

.popular__card__content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ed8613;
  text-align: center;
}

.discover__container .section__description {
  margin-block: 1rem;
}

.discover__grid {
  margin-top: 4rem;
  display: grid;
  gap: 4rem;
}

.discover__card {
  display: grid;
  gap: 2rem;
  overflow: hidden;
}

.discover__card img {
  height: 200px;
  object-fit: cover;
}

.discover__card h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
}

.discover__card h3 {
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
}

.discover__card h3 span {
  font-size: 1.25rem;
  font-weight: 600;
  color: #767268;
}

.discover__card__btn {
  text-align: center;
}

.banner {
  display: grid;
  padding-block: 5rem;
}

.banner__image {
  min-height: 200px;
  background-image: url('/images/banner.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.banner__content {
  padding-block: 2rem 5rem;
  padding-inline: 1rem;
  border-top: 2px solid rgba(0, 0, 0, 0.05);
}

.banner__content .section__description {
  margin-block: 1rem 4rem;
}

.banner__flex {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.banner__card {
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.banner__card img {
  max-width: 50px;
  margin-inline: auto;
  margin-bottom: 1rem;
}

.banner__card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.subscribe__content {
  padding: 5rem 1rem;
  background-color: #fde6f2;
}

.subscribe__content .section__description {
  margin-block: 1rem 2rem;
  max-width: 600px;
  margin-inline: auto;
}

.subscribe__content form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem 2rem;
  flex-direction: column;
}

.subscribe__content input {
  width: 100%;
  max-width: 400px;
  padding: calc(1rem - 2px);
  font-size: 1rem;
  color: #333333;
  background-color: transparent;
  outline: none;
  border: 1px solid #333333;
  border-radius: 5px;
}

footer {
  background-color: #f1f1f1;
}

.footer__container {
  display: flex;
  flex-direction: column;
  gap: 4rem 2rem;
}

.footer__col {
  text-align: center;
}

.footer__col .logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
}

.footer__col .logo span {
  color: #ed8613;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__links a {
  font-weight: 500;
  color: #333333;
  white-space: nowrap;
}

.footer__links a:hover {
  color: #ed8613;
}

.footer__bar {
  padding: 1rem;
  font-size: 1rem;
  color: #333333;
  text-align: center;
}

@media (width > 540px) {
  .popular__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .discover__card img {
    height: 300px;
  }

  .banner__image {
    min-height: 300px;
  }

  .subscribe__content form {
    flex-direction: row;
  }
}

@media (width > 768px) {
  nav {
    position: static;
    padding: 2rem 1rem;
    max-width: 1440px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .nav__header {
    flex: 1;
    padding: 0;
    background-color: transparent;
  }

  .nav__logo .logo {
    font-size: 1.5rem;
    color: #333333;
  }

  .nav__logo .logo span {
    color: #ed8613;
  }

  .nav__menu__btn {
    display: none;
  }

  .nav__links {
    position: static;
    width: fit-content;
    padding: 0;
    flex-direction: row;
    background-color: transparent;
    transform: none !important;
  }

  .nav__links a {
    color: #333333;
  }

  .nav__links a:hover {
    color: #ed8613;
  }

  .nav__btns {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  .nav__btns .btn {
    padding: 0.5rem;
    font-size: 1.5rem;
    color: #333333;
    background-color: transparent;
  }

  .nav__btns .btn:hover {
    color: #ed8613;
  }

  header {
    padding-top: 0;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, calc(1440px / 2))
      minmax(0, calc(1440px / 2))
      minmax(0, 1fr);
    align-items: center;
  }

  .header__image {
    grid-column: 3/5;
  }

  .header__content {
    grid-area: 1/2/2/3;
    padding-block: 5rem;
  }

  .header__content :is(h1, .section__description, .header__btn) {
    text-align: left;
  }

  .header__content .socials {
    justify-content: flex-start;
  }

  /* card mulai */

  .products__container .section__header {
    text-align: left;
  }

  .products__grid {
    display: grid;
    gap: 1.5rem; /* Jarak antar kartu */
    /* Default: 1 kolom untuk mobile */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 2rem;
  }

  .product__card {
    background-color: #ffffff;
    border-radius: 0.75rem; /* Sudut membulat */
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1); /* Efek bayangan */
    overflow: hidden; /* Penting agar gambar mengikuti sudut membulat */
    display: flex;
    flex-direction: column;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    cursor: pointer;
  }

  .product__card:hover {
    transform: translateY(-5px); /* Efek mengangkat saat di-hover */
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .product__card__image {
    width: 100%;
    aspect-ratio: 16 / 9; /* Menjaga rasio gambar */
    object-fit: cover; /* Memastikan gambar memenuhi area tanpa terdistorsi */
  }

  .product__card__content {
    padding: 1.5rem;
    flex-grow: 1; /* Memastikan konten mengisi sisa ruang */
    display: flex;
    flex-direction: column;
  }

  .product__card__title {
    font-size: 1.25rem; /* Ukuran judul */
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .product__card__description {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #4a5568;
    flex-grow: 1; /* Mendorong deskripsi untuk mengisi ruang */
    /* Batasi deskripsi hanya 3 baris */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .more__button__container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .more__button {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #256eff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .more__button:hover {
    background-color: #1c5bff;
  }

  @media (min-width: 640px) {
    .products__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Tampilan Desktop: 3 kolom */
  @media (min-width: 1024px) {
    .products__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* card akhir */

  .popular__container .section__header {
    text-align: left;
  }

  .popular__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .discover__container :is(.section__header, .section__description) {
    text-align: left;
    max-width: 600px;
  }

  .discover__card {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }

  .discover__card img {
    height: 350px;
  }

  .discover__card:nth-child(2) .discover__card__content {
    order: -1;
  }

  .discover__card__content :is(h4, .section__description, h3, .discover__card__btn) {
    text-align: left;
  }

  .banner {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, calc(1440px / 2))
      minmax(0, calc(1440px / 2))
      minmax(0, 1fr);
    align-items: center;
  }

  .banner__image {
    grid-column: 3/5;
    min-height: 100%;
  }

  .banner__content {
    grid-area: 1/2/2/3;
    padding-block: 2rem;
    padding-inline: 1rem 2rem;
  }

  .banner__content :is(.section__header, .section__description) {
    text-align: left;
  }

  .footer__container {
    flex-direction: row;
    align-items: center;
  }

  .footer__col:nth-child(1),
  .footer__col:nth-child(3) {
    flex: 1;
    text-align: left;
  }

  .footer__links {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer__col .socials {
    justify-content: flex-end;
  }
}

@media (width > 1024px) {
  .popular__grid {
    gap: 2rem;
  }

  .discover__card {
    gap: 4rem;
  }
}
</style>
