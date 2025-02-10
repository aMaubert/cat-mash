<template>
  <router-view
    @increment="incrementUserScore">
  </router-view>
  <score-container :user-score="userScore"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {CatService} from "./cat";
import ScoreContainer from "./cat/components/score-container.vue";

const userScore = ref<number>(0);

const incrementUserScore = () => {
  userScore.value = CatService.incrementUserScore();
}

onMounted(async () => {
  userScore.value = CatService.fetchUserScore();
});
</script>

<style scoped>

</style>
