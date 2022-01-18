<template>
  <base-dialog :show="!!error" title="An Error happend!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <couch-fillter @change-filter="setFilters"></couch-fillter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isLoading" link to="/regester">
          Regester as Coach
        </base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="item in fillterdCoaches"
          :key="item.id"
          :id="item.id"
          :first-name="item.firstName"
          :last-name="item.lastName"
          :rate="item.hourlyRate"
          :areas="item.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CouchFillter from '../../components/coaches/CouchFillter.vue';
import BaseButton from '../../components/UI/BaseButton.vue';

export default {
  components: {
    CoachItem,
    BaseButton,
    CouchFillter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    fillterdCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((item) => {
        if (this.activeFilters.frontend && item.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && item.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && item.areas.includes('career')) {
          return true;
        }
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something Went Wrong';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
