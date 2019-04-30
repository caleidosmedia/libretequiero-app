<template>
  <ion-app>
    <ion-menu contentId="content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>#LibreTeQuiero</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="primary">
        <ion-list class="menu__list">
          <ion-item color="primary" @click="goTo('home')">Inicio</ion-item>
          <ion-item color="primary" @click="goTo('explora')">Explora</ion-item>
          <ion-item color="primary" @click="goTo('reconoce')">Reconoce</ion-item>
          <ion-item color="primary" @click="goTo('protege')">Protege</ion-item>
        </ion-list>
        <div class="menu__logo">
          <img alt="logo" src="./assets/logo_transparente.png">
        </div>
      </ion-content>
    </ion-menu>
    <router-view/>
  </ion-app>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goTo(page) {
      this.$router.push({name: page})
    }
  }
}
</script>

<style lang="scss">
:root {
  --ion-color-primary: #19b46b;
  --ion-color-primary-rgb: 25,180,107;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255,255,255;
  --ion-color-primary-shade: #169e5e;
  --ion-color-primary-tint: #30bc7a;

  --ion-color-secondary: #0cd1e8;
  --ion-color-secondary-rgb: 12,209,232;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255,255,255;
  --ion-color-secondary-shade: #0bb8cc;
  --ion-color-secondary-tint: #24d6ea;

  --ion-color-tertiary: #7044ff;
  --ion-color-tertiary-rgb: 112,68,255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255,255,255;
  --ion-color-tertiary-shade: #633ce0;
  --ion-color-tertiary-tint: #7e57ff;

  --ion-color-success: #10dc60;
  --ion-color-success-rgb: 16,220,96;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255,255,255;
  --ion-color-success-shade: #0ec254;
  --ion-color-success-tint: #28e070;

  --ion-color-warning: #ffce00;
  --ion-color-warning-rgb: 255,206,0;
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb: 255,255,255;
  --ion-color-warning-shade: #e0b500;
  --ion-color-warning-tint: #ffd31a;

  --ion-color-danger: #f04141;
  --ion-color-danger-rgb: 245,61,61;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255,255,255;
  --ion-color-danger-shade: #d33939;
  --ion-color-danger-tint: #f25454;

  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34,34,34;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255,255,255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  --ion-color-medium: #989aa2;
  --ion-color-medium-rgb: 152,154,162;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255,255,255;
  --ion-color-medium-shade: #86888f;
  --ion-color-medium-tint: #a2a4ab;

  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244,244,244;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0,0,0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;
}

.menu {
  &__list {
    background: var(--ion-color-primary);
  }
  &__logo {
    margin-top: 20px;
  }
  &__texto {
    color: var(--ion-color-primary-tint);
    font-size: 14px;
    padding: 20px;
  }
}
</style>
