<template>
    <div class="form-container" :class="show && 'show-form'">
        <svg @click="func_close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <h4>{{ isUpdate ? 'Update' : 'Create' }} News</h4>
        <div class="form mt-4">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" v-model="form.title" class="form-control" id="title" placeholder="eg: Oil price hike">
                <div class="j-error" v-for="(error, index) in v.form.title.$errors" :key="index">{{ error.$message }}</div>
            </div>
            <div class="content mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea v-model="form.content" name="content" id="content" class="form-control" cols="30" rows="10"></textarea>
                <!-- <QuillEditor v-model:content="form.content" 
                contentType="html" :options="quillOption" /> -->
                <div class="j-error" v-for="(error, index) in v.form.content.$errors" :key="index">{{ error.$message }}</div>
            </div>
            <div class="btn-cover">
                <button v-if="isUpdate" @click="func_update" type="button" class="btn btn-primary">
                    Update
                </button>
                <button v-else @click="func_publish" type="button" class="btn btn-primary">
                    Publish
                </button>
            </div>
        </div>

                
    </div>
</template>

<script>


import { mapActions } from 'pinia';
import { useNewsStore } from '../stores/news';

export default {
    props: {
        isUpdate: {
            type: Boolean,
            default: false
        },  
        show: {
            type: Boolean,
            default: false
        },
        v: {
            type: [Object, Array],
            default: () => {}
        },
        form: {
            type: [Object, Array],
            default: () => {}
        }
    },
    data() {
        return {
            quillOption: {
                modules: {
                    toolbar: ['bold', 'italic', 'underline']
                },
                placeholder: 'Enter your content here...',
                theme: 'snow',
            }
        }
    },

    watch: {
        form() {
            return this.from;
        }
    },  
    
    methods: {
        ...mapActions(useNewsStore, ['publishNews', 'updateNews']),

        func_close() {
            this.$emit('close', false)
        },

        async func_publish() {
            const result = await this.v.$validate()
            if (!result) {
                // notify user form is invalid
                return
            }
            this.publishNews(this.form);
            this.$emit('submit', true);
        },

        async func_update() {
            const result = await this.v.$validate()
            if (!result) {
                // notify user form is invalid
                return
            }
            this.updateNews(this.form);
            this.$emit('update', true);
        }
    }
}
</script>

<style lang="scss" scoped> 
    .j-error {
        font-size: 12px;
        padding: 10px 0;
        color: red;
    }
    .form-control {
        border-radius: 0;
    }
    .form-container {
        background-color: white;
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        max-width: 600px;
        height: 100%;
        padding: 80px 40px;
        box-shadow: -5px 3px 8px rgba(0,0,0,.1);
        // margin-right: -500px;
        transform: translateX(200%);
        transition: .6s cubic-bezier(.59,.41,1,.99);
        overflow-y: scroll;

        svg {
            width: 25px;
            height: 25px;
            position: absolute;
            right: 0;
            top: 0;
            margin: 20px 40px;
            cursor: pointer;

        }
        
        .btn-cover{
            text-align: right;

        }
    }

    .show-form {
        // margin-right: 0;
        transform: translateX(0);
        transition: .6s cubic-bezier(0,.99,1,.99);
        display: flex;
        flex-direction: column;
    }



</style>