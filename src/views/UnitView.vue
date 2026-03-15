<script setup>
import { useRoute,useRouter } from 'vue-router';
import Word from '../components/Word.vue';
import { ref, watch ,computed} from 'vue';
import CustomSelect from '@/components/CustomSelect.vue';
import 'primeicons/primeicons.css'

import allWords from '../assets/words.json'
import isFlipped from '../components/Word.vue'

const route = useRoute();
const unitNumber = route.params.unitNumber;


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const settingsDisplay = ref(false);
const savedVal = localStorage.getItem('mujUlozenyJazyk')
const savedIndex = localStorage.getItem(`unit${unitNumber}`)

const currWordIndex =ref(savedIndex || 1);

function restartCards(){
    currWordIndex.value = 1;
    settingsDisplay.value = false;
  
}

const choosenLang =  ref(savedVal || 'Angličtina')
watch(choosenLang, (novyJazyk) => {

  localStorage.setItem('mujUlozenyJazyk', novyJazyk)
  
})

watch(currWordIndex, (novyIndex) => {
    localStorage.setItem(`unit${unitNumber}`, novyIndex)
})

const wordsForUnit = computed(() => {

 
  
 
  return allWords.filter(slovo => slovo.unit === Number(unitNumber));
})
const wordsCount = computed(() => wordsForUnit.value.length);
const currWord = computed(() => wordsForUnit.value[currWordIndex.value-1])

function next(){
    
    if(currWordIndex.value < wordsCount.value){
        
        currWordIndex.value++;
    }
    else{
        currWordIndex.value = 1;
    }
   

}
function previous(){
    if(currWordIndex.value > 1){
        currWordIndex.value--;
    }

}

</script>

<template>
  <h1>Slovíčka pro Unit {{ unitNumber }}</h1>
    <main>
        <p class="counter">{{ currWordIndex }}/{{ wordsCount }}</p>
        <Word :key="currWordIndex" :english="currWord.english" :czech="currWord.czech" :phonetics="currWord.phonetics" :language= "choosenLang" />

        <div class="controls">
            
        <div v-if="settingsDisplay" class="settings">
              <button class="close" @click="settingsDisplay = false"><i  class="pi pi-times"></i></button>

            <h2>Nastavení</h2>
           
            <div class="side-opt"> <label for="front">Přední strana</label>
                <CustomSelect 
      v-model="choosenLang" 
      :options="['Čeština', 'Angličtina']" 
      
    />
           
            </div>
           <p class="restart" @click="restartCards" >Restartovat Kartičky</p>

          

        </div>
        <button @click="previous" ><i class="pi pi-arrow-left"></i></button>
        <button @click ="next"><i class="pi pi-arrow-right"></i></button>
        <button @click="settingsDisplay = true"> <i class="pi pi-cog"></i></button>
        
    </div>
       

    </main>





</template>
<style scoped>
.controls button {
    padding: 0.5rem 1rem;
    font-size: 2.2em;
    
    margin: 0.5rem;
    
    background-color: transparent;
    border:none;
    color: gray;
}
.settings{
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -50%);
    background-color: #161616;
    border: 1px solid gray;
    border-radius: 0.65rem;
    padding: 1rem;
    z-index: 100;
}
.side-opt{
    display: flex;
    align-items: center;
    gap: 10.5rem;
    margin-bottom: 1rem;
}
.close{
    position: absolute;
    top: 0;
    right: 0.5rem;
   
}
.restart{
    margin-top: 1rem;
    
    cursor: pointer;
}
.restart:hover{
    color: red;
}

select{
    background-color: transparent;
    border: 1px solid gray;
    color: gray;
    border: none;
    border-radius: 0.65rem;
    outline: none;

}


.controls{
    display: flex;
    align-items: center;
    justify-content: center;
}


@media (max-width: 768px) {
    .counter{
       
        text-align: center;
    }
    .settings{
        width: 90%;
       
    }
.side-opt{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}
.close{
    top: 0;
    right: 0;
}
  
}

</style>