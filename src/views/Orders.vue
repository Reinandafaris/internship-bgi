<script setup>
import { computed, ref } from 'vue'
import Swal from '@/plugins/sweetalert.js'
import orderService from '@/services/orderService'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  full_name: '',
  email: '',
  phone: '',
  quantity: 1,
  pickup_time: '',
  notes: '',
  product_name: '',
  shipping_method: '',
  notification_methods: [],
})
console.log('Initial Form State:', form.value)

// Validasi menggunakan Vuelidate
const rules = computed(() => ({
  full_name: {
    required: helpers.withMessage('Nama lengkap wajib diisi.', required),
  },
  email: {
    required: helpers.withMessage('Email wajib diisi.', required),
    email: helpers.withMessage('Format email tidak valid.', email),
  },
  phone: {
    required: helpers.withMessage('Nomor telepon wajib diisi.', required),
  },
  quantity: {
    required: helpers.withMessage('Kuantitas wajib diisi.', required),
    minValue: helpers.withMessage('Kuantitas minimal adalah 1.', (value) => value >= 1),
  },
  pickup_time: {
    required: helpers.withMessage('Waktu pengambilan wajib diisi.', required),
  },
  // paymentProof: {
  //   required: helpers.withMessage('Bukti pembayaran wajib diunggah.', required),
  // },
  product_name: {
    required: helpers.withMessage('Produk wajib dipilih.', required),
  },
  // notification: {
  //   required: helpers.withMessage('Pilih minimal satu metode notifikasi.', required),
  // },
}))

const v$ = useVuelidate(rules, form)

const handleFileChange = (event) => {
  form.value.paymentProof = event.target.files[0]
}

const handleFormSubmit = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    Swal.fire({
      icon: 'error',
      title: 'Form Tidak Valid',
      text: 'Silakan periksa kembali isian Anda.',
    })
    return // Hentikan eksekusi jika form tidak valid
  }

  try {
    const response = await orderService.createOrder(form.value)

    console.log('Server Response:', response.data)

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Data Anda telah terkirim.',
    })

    // Kosongkan form setelah berhasil
    form.value = {
      full_name: '',
      email: '',
      phone: '',
      quantity: 1,
      pickup_time: '',
      notes: '',
      product_name: '',
      shipping_method: 'delivery',
      notification_methods: [],
    }
    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi kesalahan saat mengirim data.',
    })
    console.error('Error submitting form:', error)
  }
}
</script>

<template>
  <nav>
    <div class="nav__header">
      <div class="nav__logo">
        <a href="#" class="logo">Ice<span>World</span></a>
      </div>
      <div class="nav__menu__btn" id="menu-btn">
        <i class="ri-menu-3-line"></i>
      </div>
    </div>
    <ul class="nav__links" id="nav-links">
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

  <form @submit.prevent="handleFormSubmit" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend>Informasi Pribadi</legend>
      <div class="form-group">
        <label for="full_name">Nama Lengkap (text):</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          placeholder="Masukkan nama lengkap Anda"
          v-model="form.full_name"
          @blur="v$.full_name.$touch"
          required
        />
        <span v-if="v$.full_name.$error" class="error-message">
          {{ v$.full_name.$errors[0].$message }}
        </span>
      </div>

      <!-- <div class="form-group">
        <label for="password">Password (password):</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Masukkan password Anda"
          v-model="form.password"
          @blur="v$.password.$touch"
          required
        />
        <span v-if="v$.password.$error" class="error-message">
          {{ v$.password.$errors[0].$message }}
        </span>
      </div> -->

      <div class="form-group">
        <label for="email">Email (email):</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="contoh@email.com"
          v-model="form.email"
          @blur="v$.email.$touch"
          required
        />
        <span v-if="v$.email.$error" class="error-message">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>

      <div class="form-group">
        <label for="phone">Nomor Telepon (tel):</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="081234567890"
          v-model="form.phone"
          @blur="v$.phone.$touch"
        />
        <span v-if="v$.phone.$error" class="error-message">
          {{ v$.phone.$errors[0].$message }}
        </span>
      </div>
    </fieldset>

    <fieldset>
      <legend>Detail Pesanan</legend>
      <div class="form-group">
        <label for="quantity">Jumlah (number):</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="100"
          v-model="form.quantity"
          @blur="v$.quantity.$touch"
        />
        <span v-if="v$.quantity.$error" class="error-message">
          {{ v$.quantity.$errors[0].$message }}
        </span>
      </div>

      <div class="form-group">
        <label for="pickup_time">Waktu Pengambilan (datetime-local):</label>
        <input
          type="datetime-local"
          id="pickup_time"
          name="pickup_time"
          v-model="form.pickup_time"
          @blur="v$.pickup_time.$touch"
        />
        <span v-if="v$.pickup_time.$error" class="error-message">
          {{ v$.pickup_time.$errors[0].$message }}
        </span>
      </div>

      <!-- <div class="form-group">
        <label for="payment_proof_urls">Bukti Pembayaran (file):</label>
        <input
          type="file"
          id="payment_proof_urls"
          @change="handleFileChange"
          accept="image/png, image/jpeg"
        />
        <span v-if="v$.paymentProof.$error" class="error-message">
          {{ v$.paymentProof.$errors[0].$message }}
        </span>
      </div> -->

      <div class="form-group">
        <label for="notes">Catatan Tambahan (textarea):</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Contoh: Tidak pakai bawang..."
          v-model="form.notes"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="product_name">Pilih Produk (select & option):</label>
        <select
          id="product_name"
          name="product_name"
          v-model="form.product_name"
          @blur="v$.product_name.$touch"
          required
        >
          <option value="">--Pilih salah satu--</option>
          <option value="product-a">Produk A</option>
          <option value="product-b">Produk B</option>
          <option value="product-c">Produk C</option>
        </select>
        <span v-if="v$.product_name.$error" class="error-message">
          {{ v$.product_name.$errors[0].$message }}
        </span>
      </div>
    </fieldset>
    <fieldset>
      <legend>Preferensi</legend>
      <div class="form-group">
        <label>Metode Pengiriman (radio):</label>
        <div class="choice-group">
          <input
            type="radio"
            id="delivery"
            name="shipping_method"
            value="delivery"
            v-model="form.shipping_method"
            checked
          />
          <label for="delivery">Diantar</label>
        </div>

        <div class="choice-group">
          <input
            type="radio"
            id="pickup"
            name="shipping_method"
            value="pickup"
            v-model="form.shipping_method"
          />
          <label for="pickup">Ambil Sendiri</label>
        </div>
      </div>

      <div class="form-group">
        <label>Notifikasi (checkbox):</label>
        <div class="choice-group">
          <input
            type="checkbox"
            id="notifyEmail"
            name="notification"
            value="email"
            v-model="form.notification"
          />
          <label for="notifyEmail">Kirim notifikasi ke Email</label>
        </div>

        <div class="choice-group">
          <input
            type="checkbox"
            id="notifySMS"
            name="notification_methods"
            value="sms"
            v-model="form.notification_methods"
          />
          <label for="notifySMS">Kirim notifikasi ke SMS</label>
        </div>
        <!-- <span v-if="v$.notification_methods.$error" class="error-message">
          {{ v$.notification_methods.$errors[0].$message }}
        </span> -->
      </div>
    </fieldset>

    <div class="button-group">
      <router-link to="/" class="secondary">Kembali</router-link>
      <button type="submit">Submit</button>
    </div>
  </form>

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
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f7f6;
  color: #333;
  line-height: 1.6;
  padding: 2rem;
}
form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 1rem auto 2rem auto;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

fieldset {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}
legend {
  padding: 0 0.5rem;
  font-weight: 600;
  color: #0056b3;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}
input[type='text'],
input[type='password'],
input[type='email'],
input[type='tel'],
input[type='number'],
input[type='datetime-local'],
input[type='file'],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.choice-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.choice-group input {
  width: auto;
}
.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
button[type='submit'] {
  background-color: #007bff;
  color: white;
}
button[type='submit']:hover {
  background-color: #0056b3;
}
button[type='button'],
button[type='reset'] {
  background-color: #6c757d;
  color: white;
}
button[type='button']:hover,
button[type='reset']:hover {
  background-color: #5a6268;
}
.button-group .secondary {
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.button-group .secondary:hover {
  background-color: #5a6268;
}

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
</style>
