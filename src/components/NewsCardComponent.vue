<template>
  <div>
    <div v-for="article in news" :key="article.id" class="news border rounded p-4 mb-3">
        <div class="info d-flex align-items-center justify-content-between mb-3">
        <h3 class="mb-0">{{ article.title }}</h3>
        <p class="mb-0 text-secondary">Published Jul 26, 2022</p>
        </div>
        <div class="content text-secondary" v-html="article.content">
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        news: {
            type: [Object, Array],
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>
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

</style>