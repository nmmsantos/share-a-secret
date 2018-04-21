<template lang="pug">
  span.icon(v-html="icon")
</template>

<script>
import fontawesome from '@fortawesome/fontawesome';
import {
  faKey, faPlus, faMinus, faEyeSlash,
  faEye, faCogs, faFont, faLock, faCopy
} from '@fortawesome/fontawesome-free-solid';

fontawesome.config.keepOriginalSource = false;
fontawesome.library.add(
  faKey, faPlus, faMinus, faEyeSlash,
  faEye, faCogs, faFont, faLock, faCopy
);

export default {
  props: {
    family: {
      type: String,
      default: 'fas'
    },
    fa: String
  },
  computed: {
    icon() {
      return `<i class="${this.family} fa-${this.fa}"></i>`;
    }
  }
};
</script>
