import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import TodoApp from '../TodoApp.vue'

describe('TodoApp.vue Test', () => {

    it('renders todo component', () =>  {

        const wrapper = mount(TodoApp)
        
        const todo = wrapper.get('[data-test="todo"]')
        
        expect(todo.text()).toBe('Learn Vue.js 3')

    })

    it('creates todo', async () => {

        const wrapper = mount(TodoApp);

        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1); // check the count of todos

        await wrapper.get('[data-test="new-todo"]').setValue("New Todo"); // input
        await wrapper.get('[data-test="form"]').trigger('submit'); // trigger submit

        expect(wrapper.findAll('[data-test="todo"]')).length.greaterThan(1) // what we expect

    });

    it('Complete a todo', async () => {

        const wrapper = mount(TodoApp);

        await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

        expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed');
    })


})