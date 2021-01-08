<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import "views/zc.css";


#app {
  font-family: PingFangSC-Ultralight, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background: #b50201;
  color: #FFF1A1;
  /* box-sizing: border-box; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
