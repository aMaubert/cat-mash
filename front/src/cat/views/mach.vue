<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Cat, SelectedCat} from "../definitions";
import {CatService} from "../cat.service.ts";
import {Notyf} from "notyf";

const emits = defineEmits(['increment']);

const cats = ref<Cat[]>([]);
const selectedCats = ref<SelectedCat | undefined>(undefined);
const firstCat = computed<Cat | undefined>(() => selectedCats.value?.firstCat);
const secondCat = computed<Cat | undefined>(() => selectedCats.value?.secondCat);

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

const incrementScore = async (cat: Cat) => {
  await incrementUpdate(cat._id);
  await fetchCats();
  nextMach();
  emits('increment');
};

const incrementUpdate = async (catId: string) => {
  try {
    await CatService.incrementScore(catId);
  } catch (error) {
    new Notyf().open({
      message: "Erreur incrementation de score",
      type: 'error',
      duration: 2000,
      position: {
        x: 'right',
        y: 'top',
      },
    });
  }
};

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

onMounted(async () => {
  await fetchCats();
  nextMach();
});



</script>
<template>
  <!-- todo: create a component for the left and right image in the near futur -->

  <div class="page">
    <div class="left"
         v-if="firstCat !== undefined">
      <button class="frame"
              @click="incrementScore(firstCat)">
        <b class="like">
          J'aime
        </b>
        <img
             :src="firstCat.imageUrl"
             alt="firstCat" />
      </button>
    </div>
    <div class="vl">
      <img src="../../assets/logo-removebg.png"
           class="logo"
           alt="logo">
    </div>
    <div class="right"
         v-if="secondCat !== undefined">
      <button class="frame"
              @click="incrementScore(secondCat)">
        <b class="like">
          J'aime
        </b>
        <img
            :src="secondCat.imageUrl"
            alt="secondCat" />
      </button>
    </div>
  </div>
</template>
<style scoped>

.page {
  width: 100%;
  height: 100%;
  display: flex;
}

.vl {
  width: 2%;
  height: 100vh;
}
.right, .left {
  width: 49%;
  height: 100%;
  color: #42b883;
  display: flex;
}
.logo {
  position: relative;
  left: 50%;
  width: 15vh;
  transform: translate(-50%);
}

.left .frame, .right .frame {
  background-color: #feffed;

  width: 40vw;
  height: 60vh;
  margin: 20vh 5vw;
  border-radius: 12%;
  border: 0;
  padding: 0;

  transition: .5s ease;

  cursor: pointer;
}

.left .frame img, .right .frame img {
  transition: .5s ease;
  opacity: 1;
  width: 100%;
  height: 100%;
  border-radius: 12%;
}

.frame .like {
  color: #fa6950;
  opacity: 0;
  font-size: 3em;
}

.left .like {
  position: absolute;
  top: 70%;
  left: 19%;
}

.right .like {
  position: absolute;
  top: 70%;
  right: 19%;
}

.frame:hover img {
  opacity: 0.2;
}

.frame:hover .like {
  opacity: 1;
}


</style>