<template>
  <!-- <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p class="m-0" :class="{ 'text-decoration-line-through': todo.estado }">
        {{ todo.texto }}
      </p>
      <div class="mt-2">
        <button
          class="btn btn-sm me-2"
          :class="todo.estado ? 'btn-success' : 'btn-warning'"
          @click="modificar(todo)"
          :disabled="bloquear"
        >
          {{ todo.estado ? "Finalizada" : "Pendiente" }}
        </button>
        <button
          class="btn btn-sm btn-danger"
          @click="eliminar(todo.id)"
          :disabled="bloquear"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div> -->
  <Card class="p-shadow-1 p-mb-3">
    <template #content>
      <p>
        {{todo.texto}}
      </p>
    </template>
    <template #footer>
      <Button 
        icon="pi pi-check" 
        :label="todo.estado ? 'Finalizada' : 'Pendiente'" 
        @click="modificar(todo)"
        :disabled="bloquear"
        loadingIcon="pi pi-spinner pi-spin"
        :class="todo.estado ? 'p-button-success' : 'p-button-warning'"
      />
      <Button
        icon="pi pi-times"
        label="Eliminar"
        class="p-button-secondary p-ml-2"
        @click="eliminar(todo.id)"
        :disabled="bloquear"
      />
    </template>
  </Card>
</template>

<script>
import { inject, ref } from "vue";
import { useDb } from "../composables/useDb";
import Card from "primevue/card";
import Button from "primevue/button";

export default {
  components: { Card, Button },
  props: {
    todo: Object,
  },
  setup() {
    const error = inject("error");
    const todos = inject("todos");
    const { eliminarTodo, modificarTodo } = useDb();
    const bloquear = ref(false);

    const eliminar = async (id) => {
      bloquear.value = true;
      const respuesta = await eliminarTodo(id);

      if (respuesta.res) {
        error.value = respuesta.error;
        bloquear.value = false;
        return;
      }

      todos.value = todos.value.filter((item) => item.id !== id);
      bloquear.value = false;
    };

    const modificar = async (todo) => {
      bloquear.value = true;
      const respuesta = await modificarTodo(todo);

      if (respuesta.res) {
        error.value = respuesta.error;
        bloquear.value = false;
        return;
      }

      todos.value = todos.value.map((item) =>
        item.id === todo.id ? { ...item, estado: !todo.estado } : item
      );
      bloquear.value = false;
    };
    return { modificar, eliminar, bloquear };
  },
};
</script>
