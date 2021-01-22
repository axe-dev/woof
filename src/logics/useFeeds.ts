import { formatISO, startOfToday } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { ref } from 'vue'
import { supabase } from './useSupabase'

export interface Feed {
  id?: number
  status: 'NOT_FEED' | 'FED'
  createdAt?: number
  type: 'BREAKFAST' | 'DINNER'
  createdBy?: string
}

export type CreateFeedDto = Pick<Feed, 'status' | 'type'>

const todayFeeds = ref<Feed[]>([])

export default function useFeeds() {
  async function getTodayFeedByType(type: 'BREAKFAST' | 'DINNER'): Promise<Feed> {
    const { data, error } = await supabase
      .from('feeds')
      .select()
      .eq('type', type)
      .gt('createdAt', formatISO(zonedTimeToUtc(startOfToday(), 'Europe/Berlin')))
      .order('createdAt', { ascending: false })
      .limit(1)

    if (error)
      throw new Error('Failed to load data from database.')

    return data?.length ? data[0] : {
      status: 'NOT_FEED',
      type,
    }
  }

  async function loadTodayFeeds(): Promise<[Feed, Feed]> {
    const feeds = await Promise.all([getTodayFeedByType('BREAKFAST'), getTodayFeedByType('DINNER')])
    todayFeeds.value = feeds

    return feeds
  }

  const createFeed = async(dto: CreateFeedDto): Promise<Feed> => {
    const { data, error } = await supabase
      .from('feeds')
      .insert([
        {
          ...dto,
          createdBy: 'A.X.',
        },
      ])

    if (error || data === null)
      throw new Error('Failed to update feed status.')

    if (data?.length)
      todayFeeds.value[dto.type === 'BREAKFAST' ? 0 : 1] = data[0]

    return data[0]
  }

  return {
    todayFeeds,
    loadTodayFeeds,
    getTodayFeedByType,
    createFeed,
  }
}
