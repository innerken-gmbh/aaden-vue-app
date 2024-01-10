<template>
  <div>
    <v-btn
        v-if="Config.activeVip"
        class="mr-4"
        color="grey lighten-3 black--text"
        elevation="0"
        rounded
        @click="showMemberSelectionDialog=true"
    >
      <template v-if="currentMemberId">
        <v-icon left>mdi-wallet-membership</v-icon>
        {{ currentMemberId }}
      </template>
      <template v-else>
        <v-icon>mdi-wallet-membership</v-icon>
      </template>
    </v-btn>
  </div>

</template>

<script>
import GridButton from '@/components/Base/GridButton.vue'

export default {
  name: 'DeliveryInfomationFragment',
  components: { GridButton }
}
</script>

<style scoped>

</style>
