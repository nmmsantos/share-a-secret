<template lang="pug">
  .columns
    .column.is-one-third
      .field
        .control.has-icons-left
          input.input(type="text" placeholder="Label" v-model="entry.label")
          icon.is-left(fa="font")
    .column.is-two-fifths
      .field
        .control.has-icons-left
          input.input(:type="entry.hidden ? 'password' : 'text'" placeholder="Value" v-model="entry.value")
          icon.is-left(fa="font")
    .column
      .buttons.is-grouped.is-right
        a.button.is-outlined(tabindex="-1" @click="generate")
          icon(fa="cogs")
        a.button.is-outlined.is-info(tabindex="-1" @click="entry.hidden = !entry.hidden")
          icon(:fa="entry.hidden ? 'eye-slash' : 'eye'")
        a.button.is-outlined.is-danger(tabindex="-1" @click="$emit('remove')")
          icon(fa="minus")
        a.button.is-outlined.is-success(tabindex="-1" @click="$emit('add')")
          icon(fa="plus")
</template>

<script>
import generator from 'generate-password-browser';
import Icon from '@/components/Icon.vue';

export default {
  props: {
    entry: Object
  },
  methods: {
    generate() {
      this.entry.value = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        exclude: '^~@{}[]"`',
        strict: true
      });
    }
  },
  components: {
    Icon
  }
};
</script>
