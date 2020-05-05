<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
       <!-- <transition  > -->
        <router-view ></router-view>
         <!-- </transition> -->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style>
#app{
  width: 100%;
  height: 100%;
  background-color: #222222
}
</style>
