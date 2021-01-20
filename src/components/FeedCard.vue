<template>
  <div
    class="flex flex-col justify-center items-center ring-2 rounded-xl ring-grey-50 p-3 my-3 w-full"
    @click="toggleStatus"
  >
    <h2 class="text-3xl pb-5">
      {{ t(`feed.type.${feed.type}`) }}
    </h2>
    <ion-checkmark-circle-outline v-if="feed.status === 'FED'" class="text-8xl text-green-500" />
    <ion-close-circle-outline v-else class="text-8xl text-red-500" />
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Feed } from '../logics/useFeeds'
import useFeeds from '../logics/useFeeds'

const props = defineProps({
  feed: {
    type: Object as PropType<Feed>,
    required: true,
  },
})

const { t } = useI18n()
const { createFeed } = useFeeds()

const toggleStatus = async() => {
  await createFeed({
    type: props.feed.type,
    status: props.feed.status === 'FED' ? 'NOT_FEED' : 'FED',
  })
}

</script>
