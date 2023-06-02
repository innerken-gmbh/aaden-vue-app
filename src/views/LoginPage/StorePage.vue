<template>
  <div
    v-cloak
    class="d-flex  align-center justify-center flex-column"
    style="height: 100%;position: relative"
  >
    <templete v-if="loading">
      <div class="py-4 d-flex justify-center align-center flex-column" elevation="0" outlined>
        <div class="text-h5 font-weight-bold my-2">{{ $t('SelectStoreWouldLikeEnter') }}</div>
        <div
          v-dragscroll
          class="my-3"
          style="width:100%;max-width: 600px;overflow-x: scroll"
        >
          <div style="display: grid;grid-auto-flow: column;grid-gap: 16px;grid-auto-columns: min-content">
            <div style="width: 4px"/>

            <restaurant-info-block
              v-for="i in restaurantInfos"
              :key="i.deviceId"
              :info="i"
              @click="useDeviceId(i)"
            />
          </div>
        </div>
      </div>
    </templete>
    <template v-else>
      <div
        class="d-flex align-center justify-center flex-column"
        style="height: 300px"
      >
        <div class="mb-2 text-h5">
          {{ selectedStore  ? $t('Enter') + ' ' + selectedStoreName : $t('AllShopsWillLoad')}}
        </div>
        <div class="mb-8 text-body-2 text--secondary">{{ $t('waitAMoment') }}</div>
        <v-progress-circular
          indeterminate
          size="64"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll/src/main'
import RestaurantInfoBlock from '@/views/LoginPage/RestaurantInfoBlock'
import { getCurrentUserId, setUserStoreLoginStatus, usefulStoreId } from '@/api/firebase/user'
import { getInfoForDeviceId, resetBaseUrl } from '@/api/firebase/baseUrlSetting'

export default {
  name: 'StorePage',
  components: {
    RestaurantInfoBlock
  },
  data: function () {
    return {
      usefulStoreId,
      selectedStoreName: '',
      selectedStore: false,
      loading: false,
      restaurantInfos: []
    }
  },
  directives: {
    dragscroll
  },
  mounted () {
    this.reload()
  },
  methods: {
    async useDeviceId (item) {
      this.loading = false
      this.selectedStore = true
      this.selectedStoreName = item.name
      const userId = await getCurrentUserId()
      await setUserStoreLoginStatus(userId, item.deviceId)
      localStorage.setItem('lastTimeLoginStore', item.deviceId)
      await resetBaseUrl(item.deviceId)
    },
    async reload () {
      this.loading = false
      this.restaurantInfos = await Promise.all(usefulStoreId.map(async (id) => {
        return {
          ...await getInfoForDeviceId(id),
          deviceId: id
        }
      }))
      this.loading = true
    }
  }
}
</script>

<style scoped>

</style>
