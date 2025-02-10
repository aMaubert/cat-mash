<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed, defineProps} from "vue";

const props = defineProps({
  userScore: {
    type: Number,
    required: true,
  }
});

const router = useRouter();


const userScore = computed<number>(() => props.userScore);

const isMashPage = computed<boolean>(() => router.currentRoute.value.name === 'mash');
const nextPage = computed<string>(() => {
  return isMashPage.value ? '/scores' : '/';
});


</script>

<template>
  <router-link
      class="score__container"
      :to="nextPage">

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
  </router-link>
</template>

<style scoped>

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

  text-decoration: none;

}
.user__score {
  font-size: 0.8em;
}

</style>