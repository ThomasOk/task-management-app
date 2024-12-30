<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { axios } from '@/lib/axios'
import type { Project } from '@/types/api/types.gen'

// type Project = {
//   id: number
//   name: string
//   slug: string
//   status: string
//   collaborators: string[]
//   created_at: string
// }

const projects = ref<Project[] | null>(null)

const getProjects = async () => {
  try {
    const response = await axios.get<Project[]>('/projects')
    projects.value = response.data
    console.log(projects.value)
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  getProjects()
})
</script>
<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to home!</RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
    </ul>
  </div>
</template>
