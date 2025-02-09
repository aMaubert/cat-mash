<script setup lang="ts">
import {computed} from "vue";
import type {Cat} from "../definitions";

const props = defineProps({
  firstCat: Object,
  secondCat: Object,
});

const firstCat =  computed<Cat>(() => props.firstCat as Cat);
const secondCat =  computed<Cat>(() => props.secondCat as Cat);

</script>
<template>
  <div class="page">
    <div class="left">
      <img :src="firstCat.imageUrl"
           class="logo"
           alt="logo">
    </div>
    <div class="vl">
      <img src="../../assets/logo-removebg.png"
           class="logo"
           alt="logo">
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
          0 match joué
        </div>
      </div>
    </div>
    <div class="right">
      <img :src="secondCat.imageUrl"
           class="logo"
           alt="logo">
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
  color: #42b883;
  align-items: center;
}
.logo {
  position: relative;
  left: 50%;
  width: 10em;
  transform: translate(-50%);
}
.score__container {
  background-color: #feffed;
  color: #fa6950;
  position: relative;
  text-align: center;
  top: 69.5%;
  transform: translate(-47%);
  width: 30vw;
  height: 10vh;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;

}
.user__score {
  font-size: 0.8em;
}

.left img, .right img {
  width: 10em;
}


</style>