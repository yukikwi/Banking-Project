<template>
  <div :class="['background-dark', 'cc' ,rotate, size, middle? 'middle':'unmiddle']">
    <h3 class="cardName">G credit</h3>
    <h3 class="name">{{ creditcardNumber }}</h3>
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
      default: 'xxxx xxxx xxxx xxxx',
      type: String
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
  position: absolute;
  top: 50%;
  left: 50%;
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
.middle.landspace{
  transform: translateY(-50%) translateX(-50%);
}
.middle.portrait{
  transform: translateY(-50%) translateX(-50%) rotate(270deg);
}
.portrait{
  transform: rotate(270deg);
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
  left: 17.5px;
  bottom: 12.5px;
}
.small .cardName{
  color: #fff;
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  left: 17.5px;
  top: 12.5px;
}
</style>
