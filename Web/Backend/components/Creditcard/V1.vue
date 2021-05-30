<template>
  <div :class="[($store.state.animate.cc_animate === true)? 'animated': '', middle? 'middle':'unmiddle', rotate]">
    <div :class="['background-dark', 'cc', size, shadow? 'shadow':'']">
      <h3 class="cardName">
        Bara Credit
      </h3>
      <h3 :class="['name']">
        {{ (cNo == '')? 'xxx-x-xxxxx-x': cNo }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rotate: {
      default: 'portrait',
      type: String
    },
    size: {
      default: 'normal',
      type: String
    },
    middle: {
      default: true,
      type: Boolean
    },
    cNo: {
      default: 'xxxx-xxxx-xxxx-xxxx',
      type: String
    },
    shadow: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return ({
      creditcardNumber: this.cNo,
      expire: 'xx/xx'
    })
  }
}
</script>

<style scoped>
.background-dark{
  background: #333;
}
.cc{
  padding: 20px 20px;
}
.middle{
  position: relative;
}
.middle > div{
  display: block;
  margin: auto;
}
.unmiddle{
  position: relative;
}
.normal {
  height: 275px;
  width: 500px;
  border-radius: 20px;
}
.small{
  height: calc( 275px / 1.5 );
  width: calc( 500px / 1.5 );
  border-radius: 10px;
}
.auto{
  padding-top: 55%;
  width: calc(90vw - 40px);
  border-radius: 10px;
}
.portrait{
  transform: rotate(270deg) translateX(-50%);
  transform-origin: left;
  position: absolute;
  left: 50%;
  top: 25%;
}
.normal .name{
  color: #fff;
  position: absolute;
  left: 35px;
  bottom: 25px;
}
.normal .cardName{
  color: #fff;
  position: absolute;
  font-size: 35px;
  font-weight: 700;
  left: 35px;
  top: 25px;
}
.small .name{
  color: #fff;
  position: absolute;
  font-size: calc(1.17em / 1.5);
  left: calc(35px / 1.5 );
  bottom: calc(25px / 1.5 );
}
.small .cardName{
  color: #fff;
  position: absolute;
  font-size: calc(35px / 1.5);
  font-weight: 700;
  left: calc(35px / 1.5 );
  top: calc(25px / 1.5 );
}
.auto .name{
  color: #fff;
  position: absolute;
  font-size: calc(1.17em / 1.5);
  left: calc(35px / 1.5 );
  bottom: calc(25px / 1.5 );
}
.auto .cardName{
  color: #fff;
  position: absolute;
  font-size: calc(35px / 1.5);
  font-weight: 700;
  left: calc(35px / 1.5 );
  top: calc(25px / 1.5 );
}
.animated{
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-name:spin;
  animation-fill-mode: forwards;
}

@keyframes spin {
  100% {
    transform:rotate(0deg) scale(0.67,0.67) translateY(-100%) translateX(-50%);
  }
}
</style>
