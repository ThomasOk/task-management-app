<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { axios } from '@/lib/axios'
import type { Task } from '@/types/api/types.gen'

const tasks = ref<Task[] | null>(null)

const getTasks = async () => {
  try {
    const response = await axios.get<Task[]>('/tasks')
    tasks.value = response.data
    console.log(tasks.value)
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  getTasks()
})
</script>
<template>
  <div>
    <h1 class="text-3xl">Tasks Page</h1>
    <RouterLink to="/">Go to home!</RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
    </ul>
  </div>
</template>
