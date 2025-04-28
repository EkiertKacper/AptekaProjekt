<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const emit = defineEmits();
const isLogin = ref(true);
const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');


function toggleForm() {
  isLogin.value = !isLogin.value;
  clearMessages();
}

function clearMessages() {
  error.value = '';
  success.value = '';
}

async function login() {
  clearMessages();

  if (email.value.length < 3 || password.value.length < 8) {
    error.value = 'Nieprawidłowy email lub hasło.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3030/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("sessionToken", data.data);
      emit("logged", true)
    } else {
      error.value = data.data || 'Błąd logowania.';
    }

  } catch (err) {
    error.value = 'Błąd połączenia.';
    console.error(err);
  }
}

async function register() {
  clearMessages();

  if (name.value.length < 1 || surname.value.length < 1 || email.value.length < 3 || password.value.length < 8) {
    error.value = 'Uzupełnij poprawnie wszystkie pola.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3030/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      success.value = 'Rejestracja udana! Możesz się teraz zalogować.';
      toggleForm();
    } else {
      error.value = data.data || 'Błąd rejestracji.';
    }

  } catch (err) {
    error.value = 'Błąd połączenia.';
    console.error(err);
  }
}
</script>

<template>
  <main>
  <div class="auth-box">
     <h2>{{ isLogin ? 'Zaloguj się' : 'Zarejestruj się' }}</h2>

     <div class="error" v-if="error">{{ error }}</div>
     <div class="success" v-if="success">{{ success }}</div>
  
     
     <input v-if="!isLogin" v-model="name" type="text" placeholder="Imię" />
     <input v-if="!isLogin" v-model="surname" type="text" placeholder="Nazwisko" />

     <input v-model="email" type="email" placeholder="Email" />
     <input v-model="password" type="password" placeholder="Hasło"/>

     <button @click="isLogin ? login() : register()">
       {{ isLogin ? 'Zaloguj' : 'Zarejestruj' }}
     </button>
     <button class="switch-btn" @click="toggleForm">
       {{ isLogin ? 'Przełącz na rejestrację' : 'Przełącz na logowanie' }}
     </button>
   </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8; 
  padding: 20px;
}

.auth-box {
  background-color: #fff; 
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
  text-align: center;
}

h2 {
  color: #386641; 
  margin-bottom: 20px;
}

.error {
  background-color: #ffe0e0;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.success {
  background-color: #d7fada; 
  color: #81b433;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  display: block;
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #386641; 
  box-shadow: 0 0 5px #3866417e
}

button {
  background-color: #81b433; 
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

button:hover {
  background-color: #386641;
}

.switch-btn {
  background-color: transparent;
  color: #386641;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.switch-btn:hover {
  color: #fff; 
  text-decoration: underline;
}
</style>