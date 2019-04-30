<template>
  <div id="content" class="ion-page" main="">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button autoHide="false"></ion-menu-button>
        </ion-buttons>
        <ion-title>Explora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="home">
        <ul class="home__buttons">
          <li class="home__buttons__item">
            <a href="#/explora" class="home__buttons__link">
              <img src="../assets/home_btn1.png" class="home__buttons__img">
              <h3 class="home__buttons__title">EXPLORA</h3>
              <h4 class="home__buttons__subtitle">Descubre nuestra fauna</h4>
            </a>
          </li>
          <li class="home__buttons__item">
            <a href="#/reconoce" class="home__buttons__link">
              <img src="../assets/home_btn2.png" class="home__buttons__img">
              <h3 class="home__buttons__title">RECONOCE</h3>
              <h4 class="home__buttons__subtitle">Detector de especies</h4>
            </a>
          </li>
          <li class="home__buttons__item">
            <a href="#/protege" class="home__buttons__link">
              <img src="../assets/home_btn3.png" class="home__buttons__img">
              <h3 class="home__buttons__title">PROTEGE</h3>
              <h4 class="home__buttons__subtitle">Denuncia el tráfico ilegal</h4>
            </a>
          </li>
        </ul>
      </div>
    </ion-content>
  </div>  
</template>

<script>
export default {
  name: 'home'
}
</script>

<style  lang="scss">
.home {
  min-height: 100%;

  &__buttons
  {
    margin: 0;
    padding: 0;
    height: 100vh;

    &__item {
        height: 33.33%;
    }

    &__link {
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-decoration: none;
    }

    &__img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }

    &__title,&_subtitle {
      position: relative;
      color: #fff;
      margin: 0;
      padding: 0;
      z-index: 1;
    }

    &__title {
      font-size: 30px;
    }

    &__subtitle {
      font-size: 14px;
    }

  }
}
</style>