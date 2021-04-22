<template>
  <div class="p-fluid">
    <form @submit.prevent="procesarFormulario" class="p-field">
      <InputText 
        type="text"
        placeholder="Enter para agregar Tarea"
        class="p-my-3 p-shadow-1 form-control"
        v-model.trim="texto"
      />
    </form>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { useDb } from "../composables/useDb";
import InputText from 'primevue/inputtext'

export default {
  components: {InputText },
  setup() {
    const { agregarTodo } = useDb();

    const texto = ref("");
    const todos = inject("todos");

    const procesarFormulario = async () => {
      if (!texto.value.trim()) {
        console.log("texto vacio");
        return;
      }

      const todo = await agregarTodo(texto.value);

      todos.value = [...todos.value, todo];
      texto.value = "";
    };

    return { texto, procesarFormulario };
  },
};

</script>

<style>
.form-control {
  border: none;
}
</style>