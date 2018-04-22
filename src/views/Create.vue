<template lang="pug">
  section.section
    .container
      h1.title Create 'a' Secret
      form
        .field
          label.label(for="name") Name
          .control.has-icons-left
            input.input(
              v-model="name"
              :class="{ 'is-danger': nameErrors.length }"
              id="name" type="text" placeholder="Secret name")
            icon.is-left(fa="font")
          .help.is-danger(v-if="nameErrors.length")
            Errors(:errors="nameErrors")
        .columns
          .column
            .field
              label.label(for="master") Master password
              .control.has-icons-left
                input.input(
                  v-model="master"
                  :class="{ 'is-danger': masterErrors.length }"
                  id="master" type="password" placeholder="Master password")
                icon.is-left(fa="key")
              .help.is-danger(v-if="masterErrors.length")
                Errors(:errors="masterErrors")
          .column
            .field
              label.label(for="masterRepeat") Repeat
              .control.has-icons-left
                input.input(
                  v-model="masterRepeat"
                  :class="{ 'is-danger': masterRepeatErrors.length }"
                  id="masterRepeat" type="password" placeholder="Repeat master password")
                icon.is-left(fa="key")
              .help.is-danger(v-if="masterRepeatErrors.length")
                Errors(:errors="masterRepeatErrors")
        .columns
          .column.is-one-third.has-text-bottom
            .field
              label.label Label
          .column.is-two-fifths.has-text-bottom
            .field
              label.label Value
          .column
            .buttons.is-right
              a.button.is-outlined.is-success(tabindex="-1" @click="add(0)")
                icon(fa="plus")
        create-row(
          v-for="(entry, index) in entries"
          :key="index"
          :entry="entry"
          @add="add(index + 1)"
          @remove="remove(index)")
        .buttons
          button.button.is-primary(:disabled="errors" @click.prevent="create") Create
        div(v-if="Object.keys(link).length === 3")
          .has-text-weight-semibold Your secret is here, you can drag it to your bookmarks
          div
            router-link.is-size-4(:to="{ name: 'unlock', params: link}") {{ name }}
</template>

<script>
import Errors from '@/components/Errors.vue';
import Icon from '@/components/Icon.vue';
import CreateRow from '@/components/CreateRow.vue';
import { aes256CbcEncrypt } from '@/lib/crypto';

export default {
  data() {
    return {
      name: '',
      master: '',
      masterRepeat: '',
      entries: [
        {
          label: 'User',
          value: '',
          hidden: false
        },
        {
          label: 'Pass',
          value: '',
          hidden: true
        }
      ],
      link: {}
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
      if (!this.errors) {
        const entries = this.entries.map(e => ({
          l: e.label,
          v: e.value,
          h: e.hidden
        }));

        this.link = aes256CbcEncrypt(this.master, JSON.stringify(entries));
      } else {
        this.link = {};
      }
    }
  },
  components: {
    Errors,
    Icon,
    CreateRow
  }
};
</script>

<style scoped lang="scss">
.has-text-bottom {
  margin-top: auto;
}
</style>
