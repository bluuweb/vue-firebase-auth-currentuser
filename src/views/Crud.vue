<template>
    <div v-if="isAuthenticated">
        <h1>CRUD</h1>
        <Cargando v-if="cargando" />
        <div v-else>
            <Error v-if="pintarError" />
            <TodoForm />
            <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
            
            <div v-if="todos.length === 0">
                <p>Sin TODOS</p>
            </div>
        </div>
    </div>
</template>

<script>
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import TodoForm from '../components/TodoForm'
import Todo from '../components/Todo'

import {useAuth} from '@vueuse/firebase'
import {useDb} from '../composables/useDb'
import { computed, onMounted, provide, ref } from 'vue'

export default {
    components: {Cargando, Error, TodoForm, Todo},
    setup(){
        const {isAuthenticated} = useAuth()
        const {cargando, getTodos} = useDb()
        const todos = ref([])
        const error = ref(null)

        provide('todos', todos)
        provide('error', error)

        const pintarError = computed(() => error.value ? true : false)

        onMounted(async() => {
            todos.value = await getTodos()
            if (todos.value.res) {
                error.value = todos.value.error;
            }
        })

        return {isAuthenticated, cargando, todos, pintarError}
    }
}
</script>