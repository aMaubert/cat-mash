<template>
  <mach v-if="cats.length > 0 && currentSelectedCats !== undefined"
        :firstCat="currentSelectedCats.firstCat"
        :secondCat="currentSelectedCats.secondCat">
  </mach>
</template>

<script setup lang="ts">
import Mach from "./cat/views/mach.vue";
import {computed, onMounted, ref} from "vue";
import {Notyf} from "notyf";
import {type Cat, CatService, type SelectedCat} from "./cat";


const cats = ref<Cat[]>([]);
const selectedCats = ref<SelectedCat | undefined>(undefined);
const currentSelectedCats = computed<SelectedCat | undefined>(() => selectedCats.value);

const randomCat = (): Cat => {
  const randomIndex = Math.floor( Math.random() * (cats.value.length - 1) )  ;
  return cats.value[randomIndex];
};
const nextMach = () => {
  /*
    here we should have an algo with some behaviour rules but here I choose to select the cat randomly
   */
  const firstCat = randomCat();
  let secondCat = randomCat();
  while (firstCat._id === secondCat._id) {
    secondCat = randomCat();
  }
  selectedCats.value = {
    firstCat,
    secondCat,
  };
};

onMounted(async () => {
  try {
    const response = await CatService.fetchAll();
    cats.value = response.data;
    nextMach();
  } catch (error) {
    console.error(error);
    new Notyf().open({
      message: "Erreur récupération des données",
      type: 'error',
      duration: 2000,
      position: {
        x: 'right',
        y: 'top',
      },
    });
  }
});



</script>

<style scoped>

</style>
