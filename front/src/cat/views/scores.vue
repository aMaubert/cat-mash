<script setup lang="ts">
import {CatService} from "../cat.service.ts";
import {Notyf} from "notyf";
import {computed, onMounted, ref} from "vue";
import type {Cat} from "../definitions";
import CatImageScore from "../components/cat-image-score.vue";

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
  <div class="page"
       v-if="filteredCats.length > 0">
    <div class="podium">
      <cat-image-score class="podium__cat"
                       :cat="filteredCats[1]"
                       :number="2"
                       id="second" />
      <cat-image-score class="podium__cat"
                       :cat="filteredCats[0]"
                       :number="1"
                       id="first" />
      <cat-image-score class="podium__cat"
                       :cat="filteredCats[2]"
                       :number="3"
                       id="third" />
    </div>

  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}

.podium {
  height: 40vh;
  padding: 2% 4%;
  display: flex;
}

.podium__cat {
  background-color: #fc664c;
  width: 30%;
  margin: auto 0 0 0;
}

#first {
  height: 100%;
}
#second {
  height: 90%;
}
#third {
  height: 80%;
}


</style>