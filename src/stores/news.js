import { defineStore } from "pinia";

export const useNewsStore = defineStore({
    id: 'news',
    state: () => ({
        news: [
            {
                id: 2,
                title: 'Oil price hike, hit again',
                content: `
                    <p>This is gonna be the sample content of the news, please check the content type. This is gonna be the sample content of the news, please check the content type.</p>
                    <p>This is gonna be the sample content of the news, please check the content type.</p>
                `,
                published_date: new Date()
            },
            {
                id: 1,
                title: 'Oil price hike, hit again',
                content: `
                    <p>This is gonna be the sample content of the news, please check the content type. This is gonna be the sample content of the news, please check the content type.</p>
                    <p>This is gonna be the sample content of the news, please check the content type. This is gonna be the sample content of the news, please check the content type.This is gonna be the sample content of the news, please check the content type.This is gonna be the sample content of the news, please check the content type.</p>
                `,
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
            this.loading = true;
            // Adding news in array
            let count = this.news.length;

            this.news.unshift({
                id: count+1,
                ...data
            })

        },

        updateNews(data) {
            this.loading = true;
            // Update existing news in array

            const index = this.news.findIndex(article => article.id === data.id)
            if (index !== -1) {
                this.news.splice(index, 1, updTodo)
            }
        },

        removeNews(id) {
            this.loading = true;
            // Delete existing news in array by id
            this.news.filter(article => article.id !== id)
        }
    }
});