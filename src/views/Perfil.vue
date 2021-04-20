<template>
  <div v-if="isAuthenticated">
    <h1>Ruta Protegida</h1>
    <pre>{{isAuthenticated}}</pre>
    <pre>{{user}}</pre>
  </div>
</template>


<script>
import {useAuth} from '@vueuse/firebase'
export default {
  setup(){
    const {user, isAuthenticated} = useAuth()

    return {user, isAuthenticated}
  }
}
</script>
