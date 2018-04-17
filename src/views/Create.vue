<template lang="pug">
  section.section
    .container
      h1.title Create 'a' Secret
      .field
        label.label
          | Name
        .control.has-icons-left
          input.input(
            :class="{ 'is-danger': nameErrors.length }"
            type="text" placeholder="Secret name" v-model="name")
          span.icon.is-left
            i.fas.fa-font
        .help.is-danger(v-if="nameErrors.length")
          Errors(:errors="nameErrors")
      .columns
        .column
          .field
            label.label
              | Master password
            .control.has-icons-left
              input.input(
                :class="{ 'is-danger': masterErrors.length }"
                type="password" placeholder="Master password" v-model="master")
              span.icon.is-left
                i.fas.fa-key
            .help.is-danger(v-if="masterErrors.length")
              Errors(:errors="masterErrors")
        .column
          .field
            label.label
              | Repeat
            .control.has-icons-left
              input.input(
                :class="{ 'is-danger': masterRepeatErrors.length }"
                type="password" placeholder="Repeat master password" v-model="masterRepeat")
              span.icon.is-left
                i.fas.fa-key
            .help.is-danger(v-if="masterRepeatErrors.length")
              Errors(:errors="masterRepeatErrors")
      .buttons.is-right
        a.button.is-outlined.is-success(tabindex="-1" @click="add(0)")
          span.icon
            i.fas.fa-plus
      .columns(v-for="(entry, index) in entries")
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
            a.button.is-outlined(tabindex="-1" @click="generate(index)")
              span.icon
                i.fas.fa-cogs
            a.button.is-outlined.is-info(tabindex="-1" @click="hide(index)")
              span.icon
                i.fas(:class="entry.hidden ? 'fa-eye-slash' : 'fa-eye'")
            a.button.is-outlined.is-danger(tabindex="-1" @click="remove(index)")
              span.icon
                i.fas.fa-minus
            a.button.is-outlined.is-success(tabindex="-1" @click="add(index + 1)")
              span.icon
                i.fas.fa-plus
      .buttons.is-grouped
        button.button.is-primary(:disabled="errors" @click="create")
          | Create
        span.has-text-weight-semibold(if="{ !hasErrors() && href !== '' }")
          | Your secret is here, you can drag it to your bookmarks:
          |
          a.has-text-link.is-size-4(href="{ href }") asd
</template>

<script>
// @ is an alias to /src
import Errors from '@/components/Errors.vue';

export default {
  name: 'Create',
  data() {
    return {
      name: '',
      master: '',
      masterRepeat: '',
      entries: []
    }
  },
  computed: {
    nameErrors() {
      const err = [];
      if(this.name.length < 1) err.push('Minimum of 1 character');
      return err;
    },
    masterErrors() {
      const err = [];
      if(this.master.length < 4) err.push('Minimum of 4 characters');
      return err;
    },
    masterRepeatErrors() {
      const err = [];
      if(this.masterRepeat.length < 4) err.push('Minimum of 4 characters');
      if(this.master !== this.masterRepeat) err.push('Passwords do not match');
      return err;
    },
    errors() {
      return [
        'nameErrors',
        'masterErrors',
        'masterRepeatErrors'
      ].some(computed => this[computed].length);
    }
  },
  methods: {
    generate(i) {
      this.entries[i].value = 'generated';
    },
    hide(i) {
      this.entries[i].hidden = !this.entries[i].hidden;
    },
    remove(i) {
      this.entries.splice(i, 1);
    },
    add(i) {
      this.entries.splice(i, 0, {
        label: '',
        value: '',
        hidden: false
      });
    },
    create() {
      console.log(this);
    }
  },
  components: {
    Errors,
  },
};
</script>
