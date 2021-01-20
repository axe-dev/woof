<template>
  <div v-if="error">
    {{ error }}
  </div>
  <Suspense v-else>
    <template #default>
      <TodayFeeds />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<script setup lang='ts'>
import { onErrorCaptured, ref } from 'vue'

const error = ref<unknown>(null)

onErrorCaptured((e) => {
  error.value = e
  return true
})
</script>
