<template>
    <div class="navbar">
        <div class="container p-d-flex p-ai-center">
            <router-link 
                to="/"
                class="navbar-brand"
            >{{nombre}}</router-link>
            <div class="p-ml-auto">
                <Button 
                    @click="singIn"
                    v-if="!isAuthenticated"
                    label="Acceder"
                    icon="pi pi-google"
                />
                <div v-else>
                    <Button label="Crud" @click="ancla('/crud')" class="p-mx-1" icon="pi pi-bell" />
                    <Button label="Perfil" @click="ancla('/perfil')" class="p-mx-1" icon="pi pi-user" />
                    <Button label="Salir" icon="pi pi-times" class="p-button-danger p-mx-1" @click="singOut" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuth } from '@vueuse/firebase'
import {useUser} from '../composables/useUser'
import { computed } from 'vue'
import {useRouter} from 'vue-router'
import Button from 'primevue/button' 

export default {
    components: {Button},
    setup(){
        const {singIn, singOut} = useUser()
        const {user, isAuthenticated} = useAuth()

        const nombre = computed(() => {
            return isAuthenticated.value ? user.value.displayName : 'Sin auth'
        })
        
        const router = useRouter()
        const ancla = to => {
            router.push(to)
        }

        return {singIn, nombre, isAuthenticated, singOut, ancla}
    }
}
</script>

<style>
.navbar {
    background-color: var(--indigo-700);
    padding: 10px 0;
}
.navbar-brand {
    text-decoration: none;
    color: white;
}
</style>