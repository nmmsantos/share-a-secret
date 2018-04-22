<template lang="pug">
tr
  th {{ entry.label }}
  td
    a(v-if="isHttp" :href="entry.value" target="_blank") {{ representation }}
    span(v-else) {{ representation }}
  td
    a.button.is-outlined.is-small.copyable(:data-clipboard-text="entry.value")
      icon(fa="copy")
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    representation() {
      if (this.entry.hidden) {
        return '••••••••';
      }

      return this.entry.value;
    },
    isHttp() {
      return /^(https?):\/\//.test(this.entry.value);
    }
  }
};
</script>
