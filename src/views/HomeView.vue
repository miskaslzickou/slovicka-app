<template>
<h1>Vítejte na hlavní stránce procvičování slovíček!</h1>
<p>Níže máte všechny dostupné lekce k procvičování:</p>
<div class="units">
<router-link to="/unit1">Unit 1</router-link>
<router-link to="/unit2">Unit 2</router-link>
<router-link to="/unit3">Unit 3</router-link>
<router-link to="/unit4">Unit 4</router-link>
<router-link to="/unit5">Unit 5</router-link>
<router-link to="/unit6">Unit 6</router-link>
<router-link to="/unit7">Unit 7</router-link>


</div>



</template>
<style scoped>
.units{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>