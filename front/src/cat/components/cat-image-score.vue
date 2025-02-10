<script setup lang="ts">
import {computed} from "vue";
import type {Cat} from "../definitions";

const props = defineProps({
  cat: {
    type: Object,
    required: true
  },
  number: {
    type: Number,
    required: true,
  }
});

const cat = computed<Cat>(() => props.cat as Cat);
const number = computed<number>(() => props.number);

</script>

<template>
  <div class="container">
    <div class="number">
      <div class="number-circle">
        {{ number }}
      </div>
    </div>
    <div class="sub-container">
      <div class="score">
        {{cat.score}} vote(s)
      </div>
      <img :src="cat.imageUrl"
           :alt="cat._id">
    </div>


  </div>

</template>

<style scoped>

.container {
  width: 100%;
  height: 100%;

  color: white;

  display: flex;
  flex-direction: column;

  border-radius: 12%;
}

.sub-container {
  margin-top: auto;

}

.number {
  display: flex;
  height: 20%;
  width: 100%;
}

.number-circle {
  margin: auto;
  width: 12%;

  border-radius: 50%;
  border: 3px solid white;

  text-align: center;
}

.score {
  height: 10%;
  display: flex;
  justify-content: center;
}

img {
  transition: .5s ease;

  width: 100%;
  height: 25vh;

  border-radius: 12%;
}



</style>