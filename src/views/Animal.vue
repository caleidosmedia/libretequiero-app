<template>
  <div id="content" class="ion-page menu-content menu-content-reveal" main="">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button autoHide="false"></ion-menu-button>
        </ion-buttons>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <h1>{{animal.scientific_name}}</h1>
        <img :src="animal.image_url" alt="">
        <h3>FAMILIA</h3>
        <p>{{animal.family}}</p>
        <h3>CLASIFICACIÓN SUPERIOR</h3>
        <p>{{animal.class}}</p>
        <h3>ORDEN</h3>
        <p>{{animal.genus}}</p>
    </ion-content>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'animal',
  props: ['id'],
  data() {
    return { 
        animal: [],
    }
  },
  mounted() {
    axios.get('https://libretequiero.caleidosmedia.com/animales/'+this.id)
    .then(response => {
        this.animal = response.data;
    });
  }
}
</script>

<style  lang="scss">
</style>