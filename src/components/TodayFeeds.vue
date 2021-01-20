<template>
  <div class="flex flex-1 flex-col h-full w-full justify-around">
    <FeedCard v-for="feed in todayFeeds" :key="feed.id" :feed="feed" />
  </div>
</template>

<script setup lang='ts'>
import useFeeds from '../logics/useFeeds'

const { todayFeeds, loadTodayFeeds } = useFeeds()

await loadTodayFeeds()
</script>
