<script>
import { analyzeConsumptionPreferences } from '@/model/dataLayer/api/MembershipSystem/UserAnalysis'
import { showErrorMessage } from '@/model/utils/utils'

export default {
  name: 'ConsumptionPreferencesAnalysis',
  props: {
    dateRange: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      consumptionPreferencesData: null,
      topProductsChartOptions: {
        chart: {
          type: 'bar',
          height: 350
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
        title: {
          text: '热门产品',
          align: 'center'
        }
      },
      productCategoriesChartOptions: {
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
          text: '产品类别',
          align: 'center'
        }
      },
      paymentMethodsChartOptions: {
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
          text: '支付方式',
          align: 'center'
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
    topProductsCategories () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.topProducts) return []
      const products = this.consumptionPreferencesData.topProducts || []
      const categories = products.map(p => p?.productName || '未知产品')
      return categories.length > 0 ? categories : ['未知产品']
    },
    topProductsChartSeries () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.topProducts) return []

      const products = this.consumptionPreferencesData.topProducts || []
      const counts = products.map(p => p?.count || 0)

      return [{
        name: '数量',
        data: counts.length > 0 ? counts : [0]
      }]
    },
    productCategoriesLabels () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.productCategories) return []
      const labels = Object.keys(this.consumptionPreferencesData.productCategories || {})
      return labels.length > 0 ? labels : ['未知类别']
    },
    productCategoriesChartSeries () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.productCategories) return []

      const categories = this.productCategoriesLabels
      const values = categories.map(category => this.consumptionPreferencesData.productCategories?.[category] || 0)
      return values.length > 0 ? values : [0]
    },
    paymentMethodsLabels () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.paymentMethods) return []
      const labels = Object.keys(this.consumptionPreferencesData.paymentMethods || {})
      return labels.length > 0 ? labels : ['微信支付']
    },
    paymentMethodsChartSeries () {
      if (!this.consumptionPreferencesData || !this.consumptionPreferencesData.paymentMethods) return []

      const methods = this.paymentMethodsLabels
      const values = methods.map(method => this.consumptionPreferencesData.paymentMethods?.[method] || 0)
      return values.length > 0 ? values : [0]
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
        this.consumptionPreferencesData = await analyzeConsumptionPreferences(this.analysisRequest)
      } catch (error) {
        showErrorMessage('Failed to fetch consumption preferences data')
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
  <div v-if="consumptionPreferencesData" class="consumption-preferences-analysis">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            elevation="4"
            class="metric-card orders-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-cart-outline</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">订单总数</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ consumptionPreferencesData.totalOrders }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            elevation="4"
            class="metric-card revenue-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-cash-multiple</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">总收入</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ consumptionPreferencesData.totalRevenue | priceDisplay }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            elevation="4"
            class="metric-card average-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-calculator</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">平均订单金额</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ consumptionPreferencesData.averageOrderValue | priceDisplay }}
                </v-card-text>
              </div>
            </div>
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
              热门产品
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="bar"
                height="350"
                :options="{
                  ...topProductsChartOptions,
                  xaxis: {
                    ...topProductsChartOptions.xaxis,
                    categories: topProductsCategories
                  },
                  colors: ['#1976d2'],
                  chart: {
                    ...topProductsChartOptions.chart,
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
                :series="topProductsChartSeries"
              />
            </v-card-text>
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
            class="chart-card"
          >
            <v-card-title class="chart-title">
              <v-icon left color="primary">mdi-shape</v-icon>
              产品类别
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="pie"
                height="350"
                :options="{
                  ...productCategoriesChartOptions,
                  labels: productCategoriesLabels,
                  colors: ['#1976d2', '#00897b', '#e91e63', '#ff9800', '#8e24aa'],
                  chart: {
                    ...productCategoriesChartOptions.chart,
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
                :series="productCategoriesChartSeries"
              />
            </v-card-text>
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
              <v-icon left color="primary">mdi-credit-card-outline</v-icon>
              支付方式
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="pie"
                height="350"
                :options="{
                  ...paymentMethodsChartOptions,
                  labels: paymentMethodsLabels,
                  colors: ['#43a047', '#e91e63', '#ff9800', '#1976d2'],
                  chart: {
                    ...paymentMethodsChartOptions.chart,
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
                :series="paymentMethodsChartSeries"
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
.consumption-preferences-analysis {
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

.orders-card {
  background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
}

.revenue-card {
  background: linear-gradient(135deg, #43a047 0%, #81c784 100%);
}

.average-card {
  background: linear-gradient(135deg, #ff9800 0%, #ffcc80 100%);
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
