<script>
export default {
  name: 'AwardProgressTab',
  props: {
    userDetails: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Helper computed properties for UI display
    hasAwardProgress () {
      return this.userDetails?.awardProgress && this.userDetails.awardProgress.length > 0
    }
  },
  methods: {
    /**
     * Get award status based on progress and other factors
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The status (NotReady, Ready, Completed)
     */
    getAwardStatus (award) {
      if (!award) return 'NotReady'
      return award.status || 'NotReady'
    },

    /**
     * Get progress percentage for award progress
     *
     * @param {Object} awardProgress - The award progress object
     * @returns {number} - The progress percentage
     */
    getProgressPercentage (awardProgress) {
      if (!awardProgress) return 0

      // Get target from awardInfo
      const awardInfo = awardProgress.awardInfo || {}
      const target = awardInfo.awardMax || 0
      const progress = awardProgress.progress || 0

      if (target === 0) return 0
      return Math.min(100, Math.round((progress / target) * 100))
    },

    /**
     * Get award description from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The award description
     */
    getAwardDescription (award) {
      if (!award || !award.awardInfo) return '未知'
      return award.awardInfo.description || '未知'
    },

    /**
     * Get asset name from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The asset name
     */
    getAssetName (award) {
      if (!award || !award.assetInfo || !award.assetInfo.displayInfo) return '未知'
      return award.assetInfo.displayInfo.name || '未知'
    },

    /**
     * Get asset type from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The asset type
     */
    getAssetType (award) {
      if (!award || !award.assetInfo) return '未知'
      return award.assetInfo.assetType || '未知'
    },

    /**
     * Get claim type from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The claim type
     */
    getClaimType (award) {
      if (!award || !award.awardInfo) return '未知'
      return award.awardInfo.claimType || '未知'
    },

    /**
     * Get asset value from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {number|null} - The asset value
     */
    getAssetValue (award) {
      if (!award || !award.assetInfo) return null
      return award.assetInfo.value || null
    },

    /**
     * Get asset description from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {string} - The asset description
     */
    getAssetDescription (award) {
      if (!award || !award.assetInfo || !award.assetInfo.displayInfo) return '未知'
      return award.assetInfo.displayInfo.description || '未知'
    },

    /**
     * Get minimum order amount from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {number|null} - The minimum order amount
     */
    getMinOrderAmount (award) {
      if (!award || !award.awardInfo) return null
      return award.awardInfo.minOrderAmount || 0
    },

    /**
     * Get award start value from the award object
     *
     * @param {Object} award - The award progress object
     * @returns {number|null} - The award start value
     */
    getAwardStart (award) {
      if (!award || !award.awardInfo) return null
      return award.awardInfo.awardStart || 0
    },

    /**
     * Check if excess accumulation is allowed
     *
     * @param {Object} award - The award progress object
     * @returns {boolean} - Whether excess accumulation is allowed
     */
    isExcessAccumulationAllowed (award) {
      if (!award || !award.awardInfo) return false
      return award.awardInfo.allowExcessAccumulation || false
    },

    /**
     * Get point clear after last usage days
     *
     * @param {Object} award - The award progress object
     * @returns {number|null} - The point clear after last usage days
     */
    getPointClearDays (award) {
      if (!award || !award.awardInfo) return null
      return award.awardInfo.pointClearAfterLastUsageDays || 0
    }
  }
}
</script>

<template>
  <div class="pt-4 px-4">
    <div class="pa-4">
      <div
        v-if="!hasAwardProgress"
        class="text-center pa-4"
      >
        <v-icon
          color="grey lighten-1"
          size="36"
        >
          mdi-trophy-outline
        </v-icon>
        <div class="text-subtitle-2 grey--text mt-2">
          暂无奖励进度数据
        </div>
      </div>

      <div v-else>
        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="warning"
            class="mr-2"
          >
            mdi-trophy-award
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">奖励进度列表</span>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                x-small
                color="grey"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
            <span>
              奖励进度显示用户在各个奖励任务中的完成情况：<br>
              - 进度条：显示当前完成的百分比<br>
              - 未就绪：用户尚未达到领取条件<br>
              - 可领取：用户已达到领取条件，可以领取奖励<br>
              - 已完成：用户已领取奖励
            </span>
          </v-tooltip>
        </div>

        <div class="award-progress-container">
          <div
            v-for="award in userDetails.awardProgress"
            :key="award.id"
            class="award-item mb-4 pa-3 rounded"
          >
            <div class="d-flex align-center mb-2">
              <div>
                <div class="subtitle-1 font-weight-medium">
                  {{ getAwardDescription(award) }}
                </div>
                <div class="text-caption grey--text">
                  {{ getAssetDescription(award) }}
                </div>
              </div>
              <v-spacer />
              <div class="d-flex">
                <v-chip
                  :color="getAwardStatus(award) === 'NotReady' ? 'warning' : 'success'"
                  outlined
                  x-small
                  class="mr-1"
                >
                  {{ getAwardStatus(award) === 'NotReady' ? '进行中' : '已完成' }}
                </v-chip>
                <v-chip
                  color="info"
                  outlined
                  x-small
                >
                  {{ getClaimType(award) }}
                </v-chip>
              </div>
            </div>

            <v-progress-linear
              :value="getProgressPercentage(award)"
              height="16"
              :color="getAwardStatus(award) === 'NotReady' ? 'info' : 'success'"
              rounded
            >
              <template #default>
                <span class="text-caption white--text">{{
                  award.progress || 0
                }} / {{ award.awardInfo?.awardMax || 0 }}</span>
              </template>
            </v-progress-linear>

            <div class="d-flex align-center mt-1 mb-2">
              <v-icon x-small color="grey" class="mr-1">mdi-information-outline</v-icon>
              <span class="caption grey--text">
                从 {{ getAwardStart(award) }} 开始计数，每 {{ getClaimType(award) === 'OrderCount' ? '笔订单' : '消费金额' }}累计一次
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      x-small
                      color="grey"
                      class="ml-1"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ isExcessAccumulationAllowed(award) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}
                    </v-icon>
                  </template>
                  <span>{{ isExcessAccumulationAllowed(award) ? '允许超额累积' : '不允许超额累积' }}</span>
                </v-tooltip>
              </span>
            </div>

            <div class="d-flex flex-wrap mt-3">
              <div class="award-info-item mr-4 mb-2">
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="info"
                    class="mr-1"
                  >
                    mdi-information-outline
                  </v-icon>
                  <span class="caption">奖励类型</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getAssetType(award) }}
                </div>
              </div>

              <div class="award-info-item mr-4 mb-2">
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="success"
                    class="mr-1"
                  >
                    mdi-gift-outline
                  </v-icon>
                  <span class="caption">奖励名称</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getAssetName(award) }}
                </div>
              </div>

              <div class="award-info-item mr-4 mb-2">
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="warning"
                    class="mr-1"
                  >
                    mdi-lightning-bolt
                  </v-icon>
                  <span class="caption">触发类型</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getClaimType(award) }}
                </div>
              </div>

              <div class="award-info-item mr-4 mb-2" v-if="getMinOrderAmount(award) > 0">
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="purple"
                    class="mr-1"
                  >
                    mdi-cash-multiple
                  </v-icon>
                  <span class="caption">最低订单金额</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getMinOrderAmount(award) | priceDisplay }}
                </div>
              </div>

              <div class="award-info-item mr-4 mb-2" v-if="getPointClearDays(award) > 0">
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="orange"
                    class="mr-1"
                  >
                    mdi-calendar-clock
                  </v-icon>
                  <span class="caption">积分清零天数</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getPointClearDays(award) }} 天
                </div>
              </div>

              <div
                v-if="award.assetInfo"
                class="award-info-item mb-2"
              >
                <div class="info-label d-flex align-center">
                  <v-icon
                    x-small
                    color="accent"
                    class="mr-1"
                  >
                    mdi-package-variant
                  </v-icon>
                  <span class="caption">资产价值</span>
                </div>
                <div class="info-value text-body-2">
                  {{ getAssetValue(award) ? (getAssetValue(award) | priceDisplay) : '未知' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
