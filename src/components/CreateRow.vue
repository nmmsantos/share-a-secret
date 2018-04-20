<template lang="pug">
  .columns
    .column.is-one-third
      .field
        .control.has-icons-left
          input.input(type="text" placeholder="Label" v-model="entry.label")
          span.icon.is-left
            i.fas.fa-font
    .column.is-two-fifths
      .field
        .control
          input.input(:type="entry.hidden ? 'password' : 'text'" placeholder="Value" v-model="entry.value")
    .column
      .buttons.is-grouped.is-right
        a.button.is-outlined(tabindex="-1" @click="generate")
          span.icon
            i.fas.fa-cogs
        a.button.is-outlined.is-info(tabindex="-1" @click="hide")
          span.icon
            i.fas(:class="entry.hidden ? 'fa-eye-slash' : 'fa-eye'")
        a.button.is-outlined.is-danger(tabindex="-1" @click="$emit('remove')")
          span.icon
            i.fas.fa-minus
        a.button.is-outlined.is-success(tabindex="-1" @click="$emit('add')")
          span.icon
            i.fas.fa-plus
</template>

<script>
export default {
  props: {
    entry: Object
  },
  methods: {
    generate() {
      this.entry.value = 'generated';
    },
    hide() {
      this.entry.hidden = !this.entry.hidden;
    }
  }
};
</script>
