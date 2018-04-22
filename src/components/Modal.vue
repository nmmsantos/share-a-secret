<template lang='pug'>
.modal(:class="{ 'is-active': this.opened }")
  .modal-background(@click='onClickOutside')
  .modal-card(v-if='isDialog')
    header.modal-card-head
      slot(name='head')
      button.delete(v-if='showCloseButton', @click='close')
    section.modal-card-body(v-if="$slots.default")
      slot
    footer.modal-card-foot(v-if="$slots.foot")
      slot(name='foot')
  template(v-else)
    .modal-content
      slot
    button.modal-close.is-large(v-if='showCloseButton', @click='close')
</template>

<script>
export default {
  props: {
    isDialog: {
      type: Boolean,
      default: true
    },
    closeOnClickOutside: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      opened: false
    };
  },
  methods: {
    open() {
      this.opened = true;
    },
    close() {
      this.opened = false;
    },
    onClickOutside() {
      if (this.closeOnClickOutside) {
        this.close();
      }
    }
  }
};
</script>
