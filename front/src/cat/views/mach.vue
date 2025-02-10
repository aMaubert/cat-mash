<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Cat} from "../definitions";
import {CatService} from "../cat.service.ts";

const props = defineProps({
  firstCat: Object,
  secondCat: Object,
});

const emits = defineEmits(['increment']);

const userScore = ref<number>(0);
const firstCat =  computed<Cat>(() => props.firstCat as Cat);
const secondCat =  computed<Cat>(() => props.secondCat as Cat);

const incrementScore = (cat: Cat) => {
  emits('increment', cat._id);
  userScore.value = CatService.incrementUserScore();

};

onMounted(() => {
  userScore.value = CatService.fetchUserScore();
});



</script>
<template>
  <div class="page">
    <div class="left">
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
    <div class="score__container">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24">
          <path fill="#fa6950" d="m11 8.8l-2.9 2.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275L13 8.8V17q0 .425-.288.713T12 18t-.712-.288T11 17z"/>
        </svg>
      </div>
      <div>
        Classement des chats
      </div>
      <div class="user__score">
        {{ userScore }} match joué
      </div>
    </div>
    <div class="right">
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
.score__container {
  background-color: #feffed;
  color: #fa6950;

  position: absolute;
  bottom: 0;
  left: 35%;

  width: 30%;
  height: 10%;

  text-align: center;

  border-top-left-radius: 1em;
  border-top-right-radius: 1em;

}
.user__score {
  font-size: 0.8em;
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