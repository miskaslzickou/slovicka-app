<script setup>
import { ref ,watch} from 'vue'

const props =defineProps({
  english: String,
  czech: String,
  phonetics: String,
  language: String
})

const isFlipped= ref(props.language == 'Čeština' ? true : false) ;
watch(() => props.language, (novaHodnota) => {
  isFlipped.value = novaHodnota === 'Čeština';
})
// Proměnná si pamatuje, jestli je karta otočená

</script>

<template>
  <div class="flip-container" @click="isFlipped = !isFlipped">
    
    <div class="flipper" :class="{ 'flipped': isFlipped }">
      
      <div class="front">
          <p class="phonetics">{{ phonetics }}</p>
        <p class="english-word">{{ english }}</p>

      </div>
      
      <div class="back">
      
        <p class="czech-word">{{ czech }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 1. Hlavní obal - dodává scéně 3D hloubku (perspektivu) */
.flip-container {
  perspective: 1000px;
  width: 740px;
  height: 500px;
  margin: 20px auto;
  cursor: pointer;
}

/* 2. Samotný mechanismus, který se točí */
.flipper {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s ease; 
  transform-style: preserve-3d;    
}


.flipper.flipped {
  transform: rotateY(180deg);
}

/* 3. Společné vlastnosti pro přední i zadní stranu */
.front, .back {
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 0;
  left: 0;
  
  backface-visibility: hidden; 
  
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: sans-serif;
}

.front {
  background-color: #181818;
  border: 2px solid #00bd7e;
}

.back {
  background-color: #181818;
  border: 2px solid #00bd7e;
 
  transform: rotateY(180deg); 
}

.phonetics {
  color: #666;
  font-style: italic;
  margin-bottom: 5px;
}

.czech-word,.english-word {
  font-weight: bold;
  font-size: 2.2em;
}
</style>