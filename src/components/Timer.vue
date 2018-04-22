<template lang="pug">
progress(:value="current" :max="max")
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      current: 0,
      interval: null
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    startTimer() {
      this.clearInterval();
      this.current = this.start;

      this.interval = setInterval(() => {
        if (this.current <= 0) {
          this.clearInterval();
          this.$emit('ended');
        } else {
          this.current -= this.rate;
        }
      }, this.rate);
    }
  }
};
</script>
