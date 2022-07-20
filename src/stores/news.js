import { defineStore } from "pinia";

export const useNewsStore = defineStore({
    id: 'news',
    state: () => ({
        news: [
            {
                id: 1,
                title: 'Oil price hike, hit again and again',
                content: `This is gonna be the sample content of the news, please check the content type. This is gonna be the sample content of the news, please check the content type.`,
                published_date: new Date()
            },
            {
                id: 0,
                title: 'Oil price hike, hit again',
                content: `This is gonna be the sample content of the news, please check the content type. This is gonna be the sample content of the news, please check the content type.`,
                published_date: new Date()
            },
        ],
        article: {},
        loading: false
    }),
    getters: {
        getAllNews: (state) => {
            return state.news;
        },
        getPost: (state) => {
            return state.article;
        },
    },
    actions: {
        fetchNews() {
            return this.news
        },

        publishNews(data) {
            // this.loading = true;
            // Adding news in array
            let count = this.news.length;

            this.news.unshift({
                id: count+1,
                published_date: new Date(),
                ...data
            })

        },

        updateNews(data) {
            // this.loading = true;
            // Update existing news in array

            // console.log(data);
            const index = this.news.findIndex(article => article.id === data.id)
            if (index !== -1) {
                this.news.splice(index, 1, {
                    id:  data.id,
                    title:  data.title,
                    content:  data.content,
                    published_date: new Date(),
                })
            }
        },

        removeNews(id) {
            // this.loading = true;
            // Delete existing news in array by id
            this.news = this.news.filter(article => article.id !== id)
        }
    }
});