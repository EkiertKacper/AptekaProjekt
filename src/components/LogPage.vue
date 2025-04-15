<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits()
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
 <div class="auth-box">
    <h2>{{ isLogin ? 'Zaloguj się' : 'Zarejestruj się' }}</h2>

    <div class="error" v-if="error">{{ error }}</div>
    <div class="success" v-if="success">{{ success }}</div>

    <!-- Pola rejestracji -->
    <input v-if="!isLogin" v-model="name" type="text" placeholder="Imię" />
    <input v-if="!isLogin" v-model="surname" type="text" placeholder="Nazwisko" />

    <!-- Pola wspólne -->
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Hasło" />

    <button @click="isLogin ? login() : register()">
      {{ isLogin ? 'Zaloguj' : 'Zarejestruj' }}
    </button>
    <button class="switch-btn" @click="toggleForm">
      {{ isLogin ? 'Przełącz na rejestrację' : 'Przełącz na logowanie' }}
    </button>
  </div>
</template>
