<script>
export default {
  name: 'UserInfoTab',
  props: {
    userDetails: {
      type: Object,
      required: true
    }
  },
  computed: {
    // User basic information
    userName () {
      return this.userDetails?.cloudUserInfo?.displayName ||
          this.userDetails?.cloudUserInfo?.username ||
          'Unknown User'
    },
    // Current membership information
    currentMembership () {
      return this.userDetails?.currentMembership || null
    },
    currentMembershipLevel () {
      return this.currentMembership?.currentLevel || null
    },
    // Helper computed properties for UI display
    hasMembershipBenefits () {
      return this.userDetails?.membershipBenefits && this.userDetails.membershipBenefits.length > 0
    }
  },
  methods: {

    /**
     * Format date to localized string
     *
     * @param {string} dateString - The date string
     * @returns {string} - The formatted date
     */
    formatDate (dateString) {
      if (!dateString) return '-'

      try {
        return new Date(dateString).toLocaleString()
      } catch (error) {
        return dateString
      }
    }
  }
}
</script>

<template>
  <div class="user-details-container pt-4 px-4">
    <div class="pa-4">
      <div class="user-info-section">
        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="primary"
            class="mr-2"
          >
            mdi-account-details
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">用户基本信息</span>
        </div>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-account-key
                </v-icon>
                <span class="caption">用户ID</span>
              </div>
              <div class="info-value">
                {{ userDetails.userId }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-account
                </v-icon>
                <span class="caption">用户名</span>
              </div>
              <div class="info-value">
                {{ userName }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-phone
                </v-icon>
                <span class="caption">手机号码</span>
              </div>
              <div class="info-value">
                {{ userDetails.cloudUserInfo?.phoneNumber || '未设置' }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-email
                </v-icon>
                <span class="caption">邮箱</span>
              </div>
              <div class="info-value">
                {{ userDetails.cloudUserInfo?.email || '未设置' }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-gender-male-female
                </v-icon>
                <span class="caption">性别</span>
              </div>
              <div class="info-value">
                {{ userDetails.cloudUserInfo?.gender || '未设置' }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="info"
                  class="mr-1"
                >
                  mdi-cake-variant
                </v-icon>
                <span class="caption">生日</span>
              </div>
              <div class="info-value">
                {{ userDetails.cloudUserInfo?.birthday ? formatDate(userDetails.cloudUserInfo.birthday) : '未设置' }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider
        class="my-3"
        v-if="currentMembership"
      />

      <!-- 会员信息 -->
      <div
        class="membership-info-section"
        v-if="currentMembership"
      >
        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="success"
            class="mr-2"
          >
            mdi-card-account-details
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">会员信息</span>
        </div>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-card-account-details
                </v-icon>
                <span class="caption">会员ID</span>
              </div>
              <div class="info-value">
                {{ currentMembership.id }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-medal
                </v-icon>
                <span class="caption">会员等级</span>
              </div>
              <div class="info-value">
                <v-chip
                  x-small
                  :color="currentMembershipLevel?.displayInfo?.color || 'info'"
                  outlined
                >
                  {{ currentMembershipLevel?.displayInfo?.name || '无等级' }}
                </v-chip>
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-star
                </v-icon>
                <span class="caption">当前积分</span>
              </div>
              <div class="info-value">
                {{ currentMembership.currentPoints || 0 }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-cash-multiple
                </v-icon>
                <span class="caption">总消费金额</span>
              </div>
              <div class="info-value">
                {{ (currentMembership.userTotalConsume || 0) | priceDisplay }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-clock-outline
                </v-icon>
                <span class="caption">最近消费时间</span>
              </div>
              <div class="info-value">
                {{ formatDate(currentMembership.userLastConsumeAt) }}
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="py-1"
          >
            <div class="info-field">
              <div class="info-label d-flex align-center">
                <v-icon
                  x-small
                  color="success"
                  class="mr-1"
                >
                  mdi-bell-ring
                </v-icon>
                <span class="caption">是否订阅</span>
              </div>
              <div class="info-value">
                {{ currentMembership.isSubscribed ? '是' : '否' }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- 会员标签 -->
      <div
        v-if="currentMembership && currentMembership.labels && currentMembership.labels.length > 0"
        class="mt-4"
      >
        <v-divider class="my-3" />

        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="info"
            class="mr-2"
          >
            mdi-tag-multiple
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">会员标签</span>
        </div>

        <div class="d-flex flex-wrap">
          <v-chip
            v-for="(label, index) in currentMembership.labels"
            :key="label && label.id ? label.id : index"
            class="ma-1"
            :color="label && label.color ? label.color : 'info'"
            outlined
            x-small
          >
            {{ label && label.name ? label.name : '' }}
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon
                  x-small
                  class="ml-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-information-outline
                </v-icon>
              </template>
              <span>{{ label && label.description ? label.description : '' }}</span>
            </v-tooltip>
          </v-chip>
        </div>
      </div>

      <!-- 会员权益 -->
      <div
        v-if="hasMembershipBenefits"
        class="mt-4"
      >
        <v-divider class="my-3" />

        <div class="section-title d-flex align-center mb-3">
          <v-icon
            small
            color="accent"
            class="mr-2"
          >
            mdi-gift
          </v-icon>
          <span class="text-subtitle-1 font-weight-medium">会员权益</span>
        </div>

        <v-row>
          <v-col
            v-for="benefit in userDetails.membershipBenefits"
            :key="benefit.id"
            cols="12"
            sm="6"
            md="4"
          >
            <div class="benefit-item pa-2">
              <div class="d-flex align-center mb-1">
                <v-icon
                  x-small
                  color="accent"
                  class="mr-1"
                >
                  mdi-gift-outline
                </v-icon>
                <span class="caption font-weight-medium">{{ benefit.displayInfo?.name }}</span>
              </div>
              <div class="text-caption mb-2">
                {{ benefit.displayInfo?.description }}
              </div>
              <div class="d-flex flex-wrap">
                <v-chip
                  x-small
                  class="mr-1 mb-1"
                  outlined
                >
                  类型: {{ benefit.benefitType }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- 用户尚未成为会员 -->
      <div
        v-if="!currentMembership"
        class="text-center pa-4"
      >
        <v-icon
          color="grey lighten-1"
          size="48"
        >
          mdi-account-off
        </v-icon>
        <div class="text-subtitle-1 grey--text mt-2">
          该用户尚未成为会员
        </div>
      </div>
    </div>
  </div>
</template>
