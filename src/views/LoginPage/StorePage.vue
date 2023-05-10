<template>
  <div
    v-cloak
    class="d-flex  align-center justify-center flex-column"
    style="height: 100%;position: relative"
  >
    <templete v-if="loading">
      <v-card class="py-4 d-flex justify-center align-center flex-column" elevation="0" outlined>
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
              @click="useDeviceId(i.deviceId)"
            />
          </div>
        </div>
      </v-card>
    </templete>
    <template v-else>
      <div
        class="d-flex align-center justify-center flex-column"
        style="height: 300px"
      >
        <div class="mb-2 text-h5">
          {{ selectedStore  ? '正在进入所选门店' : '正在加载您的所有门店'}}
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
import { getAllStoreIdForUser, getCurrentUserId, setUserStoreLoginStatus } from '@/api/firebase/user'
import hillo from 'hillo'
import i18n from '@/i18n'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'StorePage',
  components: {
    RestaurantInfoBlock
  },
  data: function () {
    return {
      selectedStore: false,
      loading: false,
      storeListOfId: [],
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
    async useDeviceId (deviceId) {
      this.loading = false
      this.selectedStore = true
      const userId = await getCurrentUserId()
      await setUserStoreLoginStatus(userId, deviceId)
      const { url } = await this.getBaseAndUrlForDeviceId(deviceId)
      GlobalConfig.Base = url.split('//')[1]
      await hillo.initial(url + '/PHP/')
      setTimeout(async () => {
        await this.$router.push({ name: 'order' })
        this.loading = true
      }, 3000)
    },
    async reload () {
      this.loading = false
      this.storeListOfId = (await getAllStoreIdForUser(getCurrentUserId()))
      this.restaurantInfos = await Promise.all(this.storeListOfId.map(async (id) => {
        return {
          ...await this.getInfoForDeviceId(id),
          deviceId: id
        }
      }))
      this.loading = true
    },
    async getInfoForDeviceId (deviceId) {
      const { url } = await this.getBaseAndUrlForDeviceId(deviceId)
      try {
        return (await hillo.get(url + '/PHP/Restaurant.php?op=view')).content[0]
      } catch (e) {
        // return {name: "店内主机未连接网络", adress1: "无法读取该店铺数据" + counter++}
        return {
          name: i18n.t('Shop_net_error'),
          adress1: i18n.t('cant_get_data') + ':' + deviceId,
          broken: true
        }
      }
    },
    async getBaseAndUrlForDeviceId (deviceId) {
      const url = (await this.findDeviceInSaaSSystem(deviceId))
        ?.baseUrl ?? this.getNgrokUrl(deviceId)
      return {
        deviceId,
        url
      }
    },
    async findDeviceInSaaSSystem (deviceId) {
      return (await hillo.jsonPost('http://3.73.120.210:8083/virtualDevice/search', { deviceId: deviceId })).data?.[0]
    },
    getNgrokUrl (deviceId) {
      return `${location.protocol}//ik${deviceId.padStart(4, '0')}.ngrok.aaden.io`
    }
  }
}
</script>

<style scoped>

</style>
