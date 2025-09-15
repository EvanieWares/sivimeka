<template>
  <div class="logo">
    <img :src="logo" />
  </div>
</template>

<script>
import logo from "../assets/SiviMeka.png"

export default {
  name: 'ThankYou',
  data() {
    return {
      logo: logo
    }
  }
}
</script>

<style scoped>

img {
  width: 280px;
}

</style>

