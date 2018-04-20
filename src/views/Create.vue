<template lang="pug">
  section.section
    .container
      h1.title Create 'a' Secret
      form
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
        create-row(
          v-for="(entry, index) in entries"
          :entry="entry"
          @add="add(index + 1)"
          @remove="remove(index)")
        .buttons.is-grouped
          button.button.is-primary(:disabled="errors" @click.prevent="create")
            | Create
          span.has-text-weight-semibold(if="{ !hasErrors() && href !== '' }")
            | Your secret is here, you can drag it to your bookmarks:
            |
            a.has-text-link.is-size-4(href="{ href }") asd
</template>

<script>
// @ is an alias to /src
import Errors from '@/components/Errors.vue';
import CreateRow from '@/components/CreateRow.vue';

export default {
  name: 'Create',
  data() {
    return {
      name: '',
      master: '',
      masterRepeat: '',
      entries: []
    };
  },
  computed: {
    nameErrors() {
      const err = [];
      if (this.name.length < 1) err.push('Minimum of 1 character');
      return err;
    },
    masterErrors() {
      const err = [];
      if (this.master.length < 4) err.push('Minimum of 4 characters');
      return err;
    },
    masterRepeatErrors() {
      const err = [];
      if (this.masterRepeat.length < 4) err.push('Minimum of 4 characters');
      if (this.master !== this.masterRepeat) err.push('Passwords do not match');
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
    CreateRow
  }
};
</script>
