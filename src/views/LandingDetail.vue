<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productService from '@/services/productService'
import { Button } from '@/components/ui/button'

const product = ref(null)
const isLoading = ref(true)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const productId = route.params.id // Mengambil ID dari URL
  try {
    const response = await productService.getProductById(productId)
    product.value = response.data
  } catch (error) {
    console.error('Gagal mengambil detail produk:', error)
  } finally {
    isLoading.value = false
  }
})

const isNavOpen = ref(false)
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
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

  <div class="product-detail__container">
    <Button @click="router.back()" variant="outline" class="mb-4"> &larr; Kembali </Button>
    <div v-if="isLoading">
      <p>Loading detail produk...</p>
    </div>
    <div v-else-if="!product">
      <p>Produk tidak ditemukan.</p>
    </div>
    <div v-else class="product-detail__content">
      <div class="product-detail__gallery">
        <img :src="product.images[0]" :alt="product.name" class="gallery__main-image" />
        <div class="gallery__thumbnails">
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
            :alt="product.name"
          />
        </div>
      </div>
      <div class="product-detail__info">
        <h1 class="info__title">{{ product.name }}</h1>
        <p class="info__description">{{ product.description }}</p>
        <div class="info__price">
          <span class="price__new">Rp {{ product.price.toLocaleString('id-ID') }}</span>
          <span class="price__old">Rp {{ product.oldPrice.toLocaleString('id-ID') }}</span>
        </div>
        <ul class="info__details-list">
          <li v-for="(detail, index) in product.details" :key="index">{{ detail }}</li>
        </ul>
        <button class="info__add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>

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
.section__container {
  max-width: 1440px;
  margin: auto;
  padding: 5rem 1rem;
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

.product-detail__container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
}
.product-detail__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .product-detail__content {
    grid-template-columns: 1fr 1fr;
  }
}
.gallery__main-image {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.gallery__thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
.gallery__thumbnails img {
  width: 100%;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.gallery__thumbnails img:hover {
  opacity: 1;
}
.info__title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.info__description {
  color: #4a5568;
  margin-bottom: 1.5rem;
}
.info__price {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}
.price__new {
  font-size: 2rem;
  font-weight: 700;
  color: #256eff;
}
.price__old {
  font-size: 1.25rem;
  text-decoration: line-through;
  color: #f64749;
}
.info__details-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 2rem;
}
.info__details-list li {
  margin-bottom: 0.5rem;
  color: #2d3748;
}
.info__add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  background-color: #256eff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.info__add-to-cart-btn:hover {
  background-color: #1c5bff;
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
</style>
