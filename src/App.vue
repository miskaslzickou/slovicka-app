<script setup>
import router from './router';
import { Analytics } from '@vercel/analytics/vue';

</script>

<template>
   <Analytics />
  <header>
  

    <div class="wrapper">
    

      <h1>Word List</h1>
      
      <router-link class="nav-link" to="/">Home</router-link>

    
    
    </div>
  </header>

  <main>
    <router-view/>

  </main>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 100%;

  z-index: 10;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  line-height: 1.5;
  padding: 1rem 1.25rem;
}

main {
  display: flex;
  flex-direction: column;
 
  align-items: center;
  min-height: calc(100vh - 4rem);
  padding-top: 4rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex;
    flex-wrap: wrap;
    
  }
  .nav-link {
   margin-left: 2rem;
   padding-bottom: 0;
   padding-top: 0;
   font-size: 2em;
  }
}

</style>
