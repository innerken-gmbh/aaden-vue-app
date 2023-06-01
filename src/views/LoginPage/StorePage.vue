<template>
  <div
    v-cloak
    class="d-flex  align-center justify-center flex-column"
    style="height: 100%;position: relative"
  >
    <templete v-if="loading">
      <div class="py-4 d-flex justify-center align-center flex-column" elevation="0" outlined>
        <div class="text-h5 font-weight-bold my-2">请选择进入的门店</div>
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
          {{ selectedStore  ? '正在进入 ' + selectedStoreName : '正在加载您的所有门店'}}
        </div>
        <div class="mb-8 text-body-2 text--secondary">请稍等片刻</div>
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
import {
  getAllStoreIdForUser,
  getCurrentUserId,
  setUserLastTimeLoginStore,
  setUserStoreLoginStatus
} from '@/api/firebase/user'
import { getInfoForDeviceId, resetBaseUrl } from '@/api/firebase/baseUrlSetting'

export default {
  name: 'StorePage',
  components: {
    RestaurantInfoBlock
  },
  data: function () {
    return {
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
      await setUserLastTimeLoginStore(item.deviceId)
      await resetBaseUrl(item.deviceId)
    },
    async reload () {
      this.loading = false
      const storeListOfId = (await getAllStoreIdForUser(getCurrentUserId()))
      this.restaurantInfos = await Promise.all(storeListOfId.map(async (id) => {
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
