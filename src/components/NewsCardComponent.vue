<template>
  <div>
    <div v-if="news.length == 0" class="text-center py-5">
      <h6 class="text-secondary">Sorry, no news available... :(</h6>
    </div>
    <div v-else v-for="article in news" :key="article.id" class="news border rounded p-4 pt-5 mb-3">
        <div class="controls">
          <svg @click="func_update(article)" xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>

          <svg @click="func_delete(article.id)" xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div class="info d-flex align-items-center justify-content-between mb-3">
          <h3 class="mb-0">{{ article.title }}</h3>
          <p class="mb-0 text-secondary">Published {{ func_dateFormat(article.published_date) }}</p>
        </div>
        <div class="content text-secondary" v-html="article.content">
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useNewsStore } from '../stores/news';

export default {
    props: {
        news: {
            type: [Object, Array],
            default: () => {}
        }
    },

    methods: {
      ...mapActions(useNewsStore, ['removeNews']),

      func_dateFormat(date) {
          let newDate = new Date(date)
          return newDate.getMonth() + '/'+ newDate.getDay() + '/' + newDate.getFullYear(); 
      },

      func_update(data) {
        try {
          // this.updateNews(data);
          this.$emit('update', data);
        } catch (error) {
          this.$emit('update', false);
          console.log(error);
        }
      },

      func_delete(id) {

        try {
          this.removeNews(id)
          this.$emit('delete', true);
        } catch (error) {
          this.$emit('delete', false);
          console.log(error);
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.news {
  transition: all ease-in-out .3s;
  position: relative;
  
  &:hover {
    box-shadow: 0px 4px 8px rgba(0,0,0,.1);
    transition: all ease-in-out .3s;
  }
  .controls {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 20px;

    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0px 5px;
      color: gray;

      &:hover {
        color: #000;
      }
    }
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

</style>