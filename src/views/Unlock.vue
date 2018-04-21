<template lang="pug">
  section.section
    .container(v-if="isLocked")
      h1.title Unlock 'a' Secret
      form
        .field
          label.label Master password
          .control.has-icons-left
            input.input(
              :class="{ 'is-danger': masterErrors.length }"
              type='password' placeholder='Master password' v-model="master"
              @focus="isInvalid = false" autofocus)
            icon.is-left(fa="key")
          .help.is-danger(v-if="masterErrors.length")
            Errors(:errors="masterErrors")
        .buttons
          button.button.is-primary(:disabled="errors" @click.prevent="unlock")
            icon.is-left(fa="lock")
            span Unlock
    .container(v-else)
      h1.title View 'a' Secret
      timer.progress.is-large(
        :max="20000"
        :start="20000"
        ref="timer"
        @ended="lock" @click.native="restart")
      table.table.is-bordered.is-striped
        tbody
          view-row(
            v-for="(entry, index) in entries"
            :key="index"
            :entry="entry")
</template>

<script>
import ClipboardJS from 'clipboard';
import Errors from '@/components/Errors.vue';
import Icon from '@/components/Icon.vue';
import Timer from '@/components/Timer.vue';
import ViewRow from '@/components/ViewRow.vue';
import { aes256CbcDecrypt } from '@/lib/crypto';

export default {
  data() {
    return {
      master: '',
      isLocked: true,
      isInvalid: false,
      entries: [],
      clipboard: null
    };
  },
  computed: {
    masterErrors() {
      const err = [];
      if (this.master.length < 4) err.push('Minimum of 4 characters');
      if (this.isInvalid) err.push('Wrong password');
      return err;
    },
    errors() {
      return [
        'masterErrors'
      ].some(computed => this[computed].length);
    }
  },
  methods: {
    unlock() {
      if (!this.errors) {
        const { ciphertext, salt, iterations } = this.$route.params;

        try {
          const text = aes256CbcDecrypt(this.master, ciphertext, salt, iterations);
          this.entries = JSON.parse(text).map(e => ({
            label: e.l,
            value: e.v,
            hidden: e.h
          }));
        } catch (err) {
          this.isInvalid = true;
          return;
        }

        this.isLocked = false;
      }
    },
    lock() {
      this.master = '';
      this.isLocked = true;
      this.entries = [];
    },
    restart() {
      this.$refs.timer.startTimer();
    }
  },
  mounted() {
    this.clipboard = new ClipboardJS('.copyable');
  },
  beforeDestroy() {
    this.clipboard.destroy();
  },
  components: {
    Errors,
    Icon,
    Timer,
    ViewRow
  }
};
</script>
