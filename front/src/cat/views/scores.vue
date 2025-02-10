<script setup lang="ts">
import {CatService} from "../cat.service.ts";
import {Notyf} from "notyf";
import {computed, onMounted, ref} from "vue";
import type {Cat} from "../definitions";

const cats = ref<Cat[]>([]);
const filteredCats = computed<Cat[]>(() => {
  const sortedCats =  cats.value.sort((cat1, cat2) => (cat1.score > cat2.score ? -1 : 1));
  return sortedCats.slice(0, 10);
});

const fetchCats = async () => {
  try {
    const response = await CatService.fetchAll();
    cats.value = response.data;

  } catch (error) {
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
};

onMounted( async () => {
  await fetchCats();
});

</script>

<template>
  <pre>
    {{ filteredCats }}
  </pre>
</template>

<style scoped>

</style>