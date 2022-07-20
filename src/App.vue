<template>
  <main class="relative">
    
    <div class="wrapper">
      <div class="container">

        <div class="app-title">
          <h1 class="mb-0">News CRUD</h1>
          <button type="button" 
            @click="func_openForm"
            class="btn btn-primary d-flex align-items-center"> 
            <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create News
          </button>
        </div>

        <div class="news-container">
          <NewsCardComponentVue 
            :news="getAllNews" 
            @update="func_edit"
          />
        </div>

      </div>
    </div>

    <FormComponentVue 
        :show="showForm"
        :form="form"
        :v="v$"
        :is-update="isUpdate"
        @close="func_close"
        @submit="func_reload"
        @update="func_reload"
      />
  </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { mapActions, mapState } from 'pinia';
import { useNewsStore } from './stores/news';


import FormComponentVue from './components/FormComponent.vue';
import NewsCardComponentVue from './components/NewsCardComponent.vue';


export default {
  components: {
    FormComponentVue,
    NewsCardComponentVue
  },
  
  data() {
    return {
      showForm: false,
      isUpdate: false,
      v$: useVuelidate(),
      form: {
          title: '',
          content: '',
          publish_date: new Date()
      },
    }
  },
  
  validations () {
      return {
          form: {
              title: { required },
              content: { required },
          }
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

    func_reload(value) {
        if(value) {
          this.fetchNews();
          this.showForm = false;
        }
    },


    func_edit(data) {
      if(data) {

        this.isUpdate = true;
        this.showForm = true;

        this.form.id = data.id;
        this.form.title = data.title;
        this.form.content = data.content;
        this.form.publish_date = new Date();

      }
    },

    func_openForm() {
      this.showForm = !this.showForm;
      this.isUpdate = false;

    },

    func_close(val) {
      this.showForm = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 200px;
}
.container {
  max-width: 900px;
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
