<template>
    <div class="navbar navbar-dark bg-dark">
        <div class="container">
            <router-link 
                to="/"
                class="navbar-brand"
            >{{nombre}}</router-link>
            <div>
                <button class="btn btn-sm btn-primary m-1" @click="singIn" v-if="!isAuthenticated">Google</button>
                <div v-else>
                    <router-link class="btn btn-sm btn-primary m-1" to="/crud">CRUD</router-link>
                    <router-link class="btn btn-sm btn-primary m-1" to="/perfil">Perfil</router-link>
                    <button class="btn btn-sm btn-danger m-1" @click="singOut">Salir</button>
                </div>
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