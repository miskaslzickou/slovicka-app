<script setup>
import { ref, onMounted, onUnmounted } from 'vue'


const props = defineProps({
  modelValue: String, 
  options: Array,
  
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
// Vytvoříme si referenci, abychom v HTML poznali náš hlavní obal komponenty
const selectRef = ref(null) 

const selectOption = (option) => {
  emit('update:modelValue', option) 
  isOpen.value = false 
}

// Funkce, která se spustí při JAKÉMKOLIV kliknutí na webu
const handleClickOutside = (event) => {
  // Pokud menu existuje a kliknutí NEBYLO uvnitř naší komponenty -> zavři menu
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Když se komponenta načte, začneme sledovat klikání na celém dokumentu
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Když komponentu opustíme/smažeme, musíme to sledování zase vypnout, ať nezatěžujeme prohlížeč
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="custom-select" ref="selectRef">
    
    <div class="select-trigger" @click="isOpen = !isOpen">
      {{ modelValue }} 
      <span class="arrow" :class="{ open: isOpen }">▼ </span>
    </div>
    
    <div class="select-dropdown" v-if="isOpen">
      <div 
        v-for="option in options" 
        :key="option" 
        class="select-option"
        :class="{ selected: option === modelValue }"
        @click.stop="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>

  </div>
</template>

<style scoped>

/* Vaše aktuální CSS zůstává úplně beze změny! Zde je pro jistotu zkrácená verze z minula: */
.custom-select { position: relative; width: 200px; font-family: sans-serif; user-select: none; margin:10px }
.select-trigger { background-color: #2c2c2c; color: #ffffff; padding: 10px 15px; border: 1px solid #555; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.select-trigger:hover { border-color: #888; }
.select-dropdown { position: absolute; top: 100%; left: 0; right: 0; background-color: #2c2c2c; border: 1px solid #555; border-radius: 8px; margin-top: 5px; overflow: hidden; z-index: 100; }
.select-option { padding: 10px 15px; color: #ffffff; cursor: pointer; }
.select-option:hover { background-color: #444; }
.select-option.selected { background-color: #555; font-weight: bold; }
.arrow { font-size: 0.8em; transition: transform 0.3s; }
.arrow.open { transform: rotate(180deg); }
</style>