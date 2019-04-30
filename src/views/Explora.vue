<template>
  <div id="content" class="ion-page menu-content menu-content-reveal" main="">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button autoHide="false"></ion-menu-button>
        </ion-buttons>
        <ion-title>Explorando</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="explora">
      <ion-card v-for="animal in animals" :key="animal.id" @click="goToAnimal(animal.id)">
        <ion-item>
          <ion-thumbnail slot="start">
            <img :src="animal.image_url" alt="">
          </ion-thumbnail>
          <ion-label text-wrap>
            <ion-text color="primary">
              <h3>{{animal.scientific_name}}</h3>
            </ion-text>
            <ion-text color="dark">
              <p>{{animal.common_name}}</p>
            </ion-text>
          </ion-label>
          <ion-button fill="outline" slot="end">Ver detalle</ion-button>
        </ion-item>
      </ion-card>

    </ion-content>
  </div>  
</template>

<script>
import axios from 'axios';

export default {
  name: 'explora',
  data() {
    return {
      animals: [],
    }
  },
  mounted() {
    axios.get('https://libretequiero.caleidosmedia.com/animales?category=CR,NT,VU,EN,DD&class=MAMMALIA,AMPHIBIA,AVES,REPTILIA&page=1')
      .then(response => {
        this.animals = response.data.data;
      });
  },
  methods: {
    goToAnimal(id) {
      this.$router.push({'name': 'animal', params: {id}});
    }
  }
}
</script>

<style>
ion-content.explora {
  --background:#cbede0;
}
</style>