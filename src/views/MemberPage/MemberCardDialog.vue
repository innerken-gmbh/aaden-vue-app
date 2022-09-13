<template>
  <v-dialog v-model="realShow">
    <v-card>
      <v-toolbar dense dark>
        <v-toolbar-title>{{ $t('VIP_Card') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="d-flex pa-2 align-start">
        <v-card>
          <v-list-item>
            <v-text-field @keydown.enter="trySelectCurrentCard" clearable
                          hide-details
                          v-model="cardSearch" autofocus
                          :label="$t('Suchen')"></v-text-field>
          </v-list-item>
          <v-list subheader max-height="300px" style="overflow: scroll">
            <v-subheader>{{ $t('Liste') }}</v-subheader>
            <template v-for="(card) in filteredMemberCardList">
              <v-list-item @click="selectedCardId=card.longId" :key="card.id">
                <v-list-item-content>
                  <v-list-item-title>{{card.note}}/{{ "****"+card.longId.substr(4) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{$t('time')}}: {{ card.createdAt }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ $t('amount') }}: {{ card.leftAmount|priceDisplay }}/{{ card.totalAmount|priceDisplay }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <template v-if="selectedCard">
          <v-card min-width="300px" color="#ad1453" dark>
            <v-card-title class="headline">
              {{ "****"+selectedCard.longId.substr(4) }}
            </v-card-title>
            <v-card-subtitle>
              {{ selectedCard.leftAmount|priceDisplay }}/{{ selectedCard.totalAmount|priceDisplay }}<br>
              {{ selectedCard.createdAt }}
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="renameMemberCard(selectedCard.longId)">Karte ändern</v-btn>
            </v-card-actions>
          </v-card>
          <v-list subheader v-if="selectedCard&&selectedCard.record&&selectedCard&&selectedCard.record.length>0">
            <v-subheader>Records</v-subheader>
            <template v-for="record in selectedCard.record">
              <v-list-item :key="record.id">
                <v-list-item-content>
                  <v-list-item-title>{{ record.amount > 0 ? '-' : '+' }}{{
                      record.amount|priceDisplay
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{$t('time')}}: {{ record.createdAt }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ $t('RechnungNr') }}.: {{ record.orderId }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </template>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="realShow=!realShow">
          <v-icon left>mdi-close</v-icon>
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { checkOneMemberCard, loadMemberCard } from '@/api/api'
import { fastSweetAlertRequest } from '@/oldjs/common'

export default {
  name: 'MemberCardDialog',
  props: {
    memberCardDialogShow: {
      default: false
    },
    memberCardInfo: {}

  },
  data: function () {
    return {
      memberCardList: [],
      selectedCardId: null,
      cardSearch: null,
      selectedCard: null
    }
  },
  methods: {
    trySelectCurrentCard () {
      if (this.memberCardList.some(c => c.longId === this.cardSearch)) {
        this.selectedCardId = this.cardSearch
      }
    },
    async loadMemberCardList () {
      this.memberCardList = await loadMemberCard()
    },
    initPanel () {
      this.loadMemberCardList()
      this.selectedCardId = null
      this.cardSearch = null
      this.selectedCard = null
    },
    async renameMemberCard (oldName) {
      this.realShow = false
      await fastSweetAlertRequest('Bitte Neue Karte Scanen', 'password',
        'MemberCard.php?op=renameMemberCard', 'new',
        { old: oldName }, 'POST')
      this.realShow = true
    }
  },
  watch: {
    memberCardDialogShow (val) {
      if (val) {
        this.initPanel()
      }
    },
    async selectedCardId (val) {
      if (val) {
        this.selectedCard = await checkOneMemberCard(val)
      }
    }
  },
  mounted () {
    this.initPanel()
  },
  computed: {
    filteredMemberCardList () {
      if (this.cardSearch) {
        return this.memberCardList.filter(c => c.longId.toLowerCase().includes(this.cardSearch.toLowerCase()) || c.note.toLowerCase().includes(this.cardSearch.toLowerCase()))
      } else {
        return this.memberCardList
      }
    },
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
