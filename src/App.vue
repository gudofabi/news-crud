<template>
  <main>
    <div class="container">

      <div class="app-title">
        <h1 class="mb-0">News CRUD</h1>
        <button type="button" 
          @click="showForm = !showForm"
          class="btn btn-primary d-flex align-items-center"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create News
        </button>
      </div>

      <div class="news-container">
        <NewsCardComponentVue :news="getAllNews" />
      </div>

    </div>

    <FormComponentVue :show="showForm"
      @close="func_close"
      @submit="func_submit"
     />
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import FormComponentVue from './components/FormComponent.vue';
import NewsCardComponentVue from './components/NewsCardComponent.vue';

import { useNewsStore } from './stores/news';

export default {
  components: {
    FormComponentVue,
    NewsCardComponentVue
  },
  data() {
    return {
      showForm: false,
    }
  },
  computed: {
    ...mapState(useNewsStore, ['getAllNews'])
  },
  created() {
    this.fetchNews();
  },
  methods: {
    ...mapActions(useNewsStore, ['fetchNews']),

    func_submit(value) {
        console.log(value);
        if(value) {
          this.fetchNews();
        }
    },

    func_close(val) {
      this.showForm = val;
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  max-width: 900px;
  margin-top: 100px;
  position: relative;

  .app-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    h1 {
      text-transform: uppercase;

    }

    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }

  .news-container {
    .news {
      transition: all ease-in-out .3s;
      
      &:hover {
        box-shadow: 0px 4px 8px rgba(0,0,0,.1);
        transition: all ease-in-out .3s;
      }

      .info {
        .text-secondary {
          font-size: 14px;

        }
      }

      .content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

      }
    }
  }

}
</style>
