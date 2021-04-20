<template>
    <div class="navbar navbar-dark bg-dark">
        <div class="container">
            <router-link 
                to="/"
                class="navbar-brand"
            >{{nombre}}</router-link>
            <div>
                <button class="btn btn-primary" @click="singIn" v-if="!isAuthenticated">Google</button>
                <button class="btn btn-danger" v-else @click="singOut">Salir</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth } from '@vueuse/firebase'
import {useUser} from '../composables/useUser'
import { computed } from 'vue'
export default {
    setup(){
        const {singIn, singOut} = useUser()
        const {user, isAuthenticated} = useAuth()

        const nombre = computed(() => {
            return isAuthenticated.value ? user.value.displayName : 'Sin auth'
        })

        return {singIn, nombre, isAuthenticated, singOut}
    }
}
</script>