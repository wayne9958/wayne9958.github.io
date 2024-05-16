<template>
  <Profile />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Profile from '../components/Profile.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Profile,
  },
});
</script>
