<template>
  <div>
    <div
        class="ml-2"
        style="
                display: grid;
                grid-auto-columns: min-content;
                grid-gap: 6px;
                grid-auto-flow: column;
              "
    >
      <template v-if="consumeTypeId === 2">
        <template v-if="consumeTypeStatusId < 2">
          <template v-for="time in [0, 15, 20, 30, 60]">
            <grid-button
                :key="time"
                :text="time"
                color="success"
                icon="mdi-plus"
                @click="acceptOrderWithTime(time)"
            />
          </template>
          <grid-button
              :text="$t('Reject')"
              color="error"
              icon="mdi-minus"
              @click="rejectOrder"
          />
        </template>
      </template>
      <template v-else-if="consumeTypeStatusId < 2">
        <grid-button
            :loading="isSendingRequest"
            :text="$t('Accept')"
            color="success"
            icon="mdi-check"
            @click="acceptOrder"
        />
        <grid-button
            :loading="isSendingRequest"
            :text="$t('Reject')"
            color="error"
            icon="mdi-close"
            @click="rejectOrder"
        />
      </template>
    </div>
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

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="mr-4"
            color="grey lighten-3 black--text"
            elevation="0"
            rounded
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="ct of consumeTypeList"
            :key="ct.id + 'consumeType'"
            @click="overrideConsumeTypeId = ct.id"
        >
          <v-list-item-title>
            {{ ct.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
        color="grey lighten-3 black--text"
        elevation="0"
        rounded
        @click="keyboardMode = !keyboardMode"
    >
      <template v-if="!keyboardMode">
        <v-icon>mdi-keyboard</v-icon>
      </template>
      <template v-else>
        <v-icon>mdi-menu</v-icon>
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
