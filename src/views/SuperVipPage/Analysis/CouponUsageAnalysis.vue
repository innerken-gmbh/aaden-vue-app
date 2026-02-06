<script>
import { analyzeCouponUsage } from '@/model/dataLayer/api/MembershipSystem/UserAnalysis'
import { showErrorMessage } from '@/model/utils/utils'

export default {
  name: 'CouponUsageAnalysis',
  props: {
    dateRange: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      couponUsageData: null,
      couponTypeChartOptions: {
        chart: {
          type: 'pie',
          height: 350
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        title: {
          text: '优惠券类型分布',
          align: 'center'
        }
      },
      topCouponsChartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: '使用次数'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        },
        title: {
          text: '热门优惠券',
          align: 'center'
        },
        legend: {
          position: 'top'
        }
      }
    }
  },
  computed: {
    analysisRequest () {
      return {
        startTime: this.dateRange[0] + 'T00:00:00',
        endTime: this.dateRange[1] + 'T23:59:59'
      }
    },
    couponTypeLabels () {
      if (!this.couponUsageData) return []
      return Object.keys(this.couponUsageData.couponTypeDistribution || {})
    },
    couponTypeChartSeries () {
      if (!this.couponUsageData) return []

      const types = this.couponTypeLabels
      return types.map(type => this.couponUsageData.couponTypeDistribution[type])
    },
    topCouponCategories () {
      if (!this.couponUsageData) return []
      const coupons = this.couponUsageData.topCoupons || []
      return coupons.map(c => c.couponName)
    },
    topCouponsChartSeries () {
      if (!this.couponUsageData) return []

      const coupons = this.couponUsageData.topCoupons || []
      const usageCounts = coupons.map(c => c.usageCount)
      const discountAmounts = coupons.map(c => c.discountAmount)

      return [
        {
          name: '使用次数',
          data: usageCounts
        },
        {
          name: '折扣金额',
          data: discountAmounts
        }
      ]
    }
  },
  watch: {
    dateRange: {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    async fetchData () {
      try {
        this.loading = true
        this.couponUsageData = await analyzeCouponUsage(this.analysisRequest)
      } catch (error) {
        showErrorMessage('Failed to fetch coupon usage data')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    refresh () {
      this.fetchData()
    }
  }
}
</script>

<template>
  <div v-if="couponUsageData" class="coupon-usage-analysis">
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          elevation="4"
          class="metric-card total-coupons-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-ticket-outline</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">总优惠券数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ couponUsageData.totalCoupons }}
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          elevation="4"
          class="metric-card active-coupons-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-ticket-confirmation</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">活跃优惠券数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ couponUsageData.activeCoupons }}
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          elevation="4"
          class="metric-card redeemed-coupons-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-ticket-percent</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">已兑换优惠券数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ couponUsageData.redeemedCoupons }}
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          elevation="4"
          class="metric-card redemption-rate-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-percent</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">兑换率</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ couponUsageData.redemptionRate.toFixed(2) }}%
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          elevation="4"
          class="metric-card discount-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-currency-usd</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">平均折扣金额</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ couponUsageData.averageDiscountAmount | priceDisplay }}
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          elevation="4"
          class="chart-card"
        >
          <v-card-title class="chart-title">
            <v-icon left color="primary">mdi-ticket-percent-outline</v-icon>
            优惠券类型分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="pie"
              height="350"
              :options="{
                ...couponTypeChartOptions,
                labels: couponTypeLabels,
                colors: ['#1976d2', '#00897b', '#e91e63', '#ff9800', '#8e24aa'],
                chart: {
                  ...couponTypeChartOptions.chart,
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150
                    }
                  }
                }
              }"
              :series="couponTypeChartSeries"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card
          elevation="4"
          class="chart-card"
        >
          <v-card-title class="chart-title">
            <v-icon left color="primary">mdi-chart-bar</v-icon>
            热门优惠券
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="bar"
              height="350"
              :options="{
                ...topCouponsChartOptions,
                xaxis: {
                  ...topCouponsChartOptions.xaxis,
                  categories: topCouponCategories
                },
                colors: ['#1976d2', '#00897b'],
                chart: {
                  ...topCouponsChartOptions.chart,
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 350
                    }
                  }
                }
              }"
              :series="topCouponsChartSeries"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div
    v-else
    class="loading-container text-center pa-8"
  >
    <v-progress-circular
      indeterminate
      size="64"
      width="5"
      color="primary"
    />
    <div class="mt-4 text-h6 font-weight-medium text-primary">
      加载数据中...
    </div>
  </div>
</template>

<style scoped>
.coupon-usage-analysis {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.metric-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.metric-card-content {
  display: flex;
  padding: 16px;
  height: 100%;
}

.metric-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 16px;
}

.metric-details {
  flex: 1;
}

.total-coupons-card {
  background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
}

.active-coupons-card {
  background: linear-gradient(135deg, #00897b 0%, #4db6ac 100%);
}

.redeemed-coupons-card {
  background: linear-gradient(135deg, #e91e63 0%, #f48fb1 100%);
}

.redemption-rate-card {
  background: linear-gradient(135deg, #ff9800 0%, #ffcc80 100%);
}

.discount-card {
  background: linear-gradient(135deg, #8e24aa 0%, #ba68c8 100%);
}

.chart-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.chart-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  font-weight: 500;
}

.loading-container {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
