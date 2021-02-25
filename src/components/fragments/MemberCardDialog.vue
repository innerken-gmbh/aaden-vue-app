<template>
  <v-dialog v-model="realShow" max-width="500px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('会员卡') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="realShow=!realShow">mdi-close</v-icon>
      </v-toolbar>
      <div class="d-flex align-center pa-2">
        <v-card min-width="300px" color="#ad1453" dark>
          <v-card-title class="headline">
            <v-icon>mdi-currency-eur</v-icon>
            {{memberCardInfo.leftAmount|priceDisplay}}
          </v-card-title>
          <v-card-subtitle>
            {{memberCardInfo.longId}}<br>
            {{memberCardInfo.createdAt}}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>充值</v-btn>
          </v-card-actions>
        </v-card>
        <v-list subheader>
          <v-subheader>消费记录</v-subheader>
          <template v-for="record in memberCardInfo.record">
            <v-list-item :key="record.id">
              <v-list-item-content>
                <v-list-item-title>{{record.amount>0?'-':'+'}}{{ record.amount|priceDisplay }}</v-list-item-title>
                <v-list-item-subtitle>Zeit: {{ record.createdAt }}</v-list-item-subtitle>
                <v-list-item-subtitle>RechnungNr.: {{ record.orderId }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MemberCardDialog',
  props: {
    memberCardDialogShow: {
      default: false
    },
    memberCardInfo: {}

  },
  computed: {
    realShow: {
      get: function () {
        return this.memberCardDialogShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
