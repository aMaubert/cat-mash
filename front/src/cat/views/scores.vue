<script setup lang="ts">
import {CatService} from "../cat.service.ts";
import {Notyf} from "notyf";
import {computed, onMounted, ref} from "vue";
import type {Cat} from "../definitions";
import CatImageScore from "../components/cat-image-score.vue";

const cats = ref<Cat[]>([]);
const offset = ref<number>(3);
const limit = ref<number>(4);


const sortedCat = computed<Cat[]>(() => {
  return cats.value.sort((cat1, cat2) => (cat1.score > cat2.score ? -1 : 1));
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


const catList = computed<Cat[]>(() => sortedCat.value.slice(offset.value, offset.value + limit.value));

</script>

<template>
  <div class="page"
       v-if="sortedCat.length > 0">
    <div class="podium">
      <cat-image-score class="podium-cat"
                       :cat="sortedCat[1]"
                       :number="2"
                       id="second" />
      <cat-image-score class="podium-cat"
                       :cat="sortedCat[0]"
                       :number="1"
                       id="first" />
      <cat-image-score class="podium-cat"
                       :cat="sortedCat[2]"
                       :number="3"
                       id="third" />
    </div>
    <div class="list">
      <a class="previous"
         v-if="(offset - limit) > 0"
         @click="offset -= limit">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="64"
             height="64"
             viewBox="0 0 24 24">
          <path fill="#888888"
                d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/>
        </svg>
      </a>
      <cat-image-score class="list-cat"
                       v-for="(cat, index) in catList"
                       :cat="cat"
                       :number="index + offset + 1" />
      <a class="next"
         v-if="(offset + limit) < sortedCat.length"
         @click="offset += limit">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="64"
             height="64"
             viewBox="0 0 24 24">
          <path fill="#888888"
                d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"/>
        </svg>
      </a>

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

.podium-cat {
  background-color: #fc8462;
  width: 30%;
  margin: auto 2% 0 2%;
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

.list {
  background-color: #ffbc8c;
  height: 40vh;
  display: flex;
}


.list-cat {
  background-color: #ff9a73;
  width: 22%;
  margin: auto 1.5% 0 1.5%;

}

.list a {
  height: 40vh;

  position: absolute;

  transition: .5s ease;

  background-color: black;
  opacity: 0.3;

  display: flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
}

.next {
  right: 0;
}

.list a:hover {
  opacity: 0.8;
}


</style>