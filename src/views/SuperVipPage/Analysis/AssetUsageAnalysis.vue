<script>
import { analyzeAssetUsage } from '@/model/dataLayer/api/MembershipSystem/UserAnalysis'
import { showErrorMessage } from '@/model/utils/utils'

export default {
  name: 'AssetUsageAnalysis',
  props: {
    dateRange: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      assetUsageData: null,
      assetTypeChartOptions: {
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
          text: '资产类型分布',
          align: 'center'
        }
      },
      assetStatusChartOptions: {
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
          text: '资产状态分布',
          align: 'center'
        }
      },
      popularAssetsChartOptions: {
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
          text: '最受欢迎的资产',
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
    assetTypeLabels () {
      if (!this.assetUsageData || !this.assetUsageData.assetTypeDistribution) return []
      const labels = Object.keys(this.assetUsageData.assetTypeDistribution || {})
      return labels.length > 0 ? labels : ['优惠券']
    },
    assetTypeChartSeries () {
      if (!this.assetUsageData || !this.assetUsageData.assetTypeDistribution) return []
      const values = this.assetTypeLabels.map(type => this.assetUsageData.assetTypeDistribution?.[type] || 0)
      return values.length > 0 ? values : [0]
    },
    assetStatusLabels () {
      if (!this.assetUsageData || !this.assetUsageData.assetStatusDistribution) return []
      const labels = Object.keys(this.assetUsageData.assetStatusDistribution || {})
      return labels.length > 0 ? labels : ['已使用', '未使用']
    },
    assetStatusChartSeries () {
      if (!this.assetUsageData || !this.assetUsageData.assetStatusDistribution) return []
      const values = this.assetStatusLabels.map(status => this.assetUsageData.assetStatusDistribution?.[status] || 0)
      return values.length > 0 ? values : [0, 0]
    },
    popularAssetsCategories () {
      if (!this.assetUsageData || !this.assetUsageData.mostPopularAssets) return []
      const assets = this.assetUsageData.mostPopularAssets || []
      const categories = assets.map(a => a?.assetName || '未知资产')
      return categories.length > 0 ? categories : ['未知资产']
    },
    popularAssetsChartSeries () {
      if (!this.assetUsageData || !this.assetUsageData.mostPopularAssets) return []
      const assets = this.assetUsageData.mostPopularAssets || []
      const counts = assets.map(a => a?.usageCount || 0)

      return [{
        name: '使用次数',
        data: counts.length > 0 ? counts : [0]
      }]
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
        this.assetUsageData = await analyzeAssetUsage(this.analysisRequest)
      } catch (error) {
        showErrorMessage('Failed to fetch asset usage data')
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
  <div v-if="assetUsageData" class="asset-usage-analysis">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            elevation="4"
            class="metric-card total-assets-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-package-variant</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">总资产数</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ assetUsageData.totalAssets }}
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
            class="metric-card active-assets-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-package-variant-closed-check</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">活跃资产数</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ assetUsageData.activeAssets }}
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
            class="metric-card redemption-card"
          >
            <div class="metric-card-content">
              <div class="metric-icon">
                <v-icon size="36" color="white">mdi-percent</v-icon>
              </div>
              <div class="metric-details">
                <v-card-title class="white--text">兑换率</v-card-title>
                <v-card-text class="text-h3 white--text text-center font-weight-bold">
                  {{ assetUsageData.redemptionRate.toFixed(2) }}%
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
            class="chart-card"
          >
            <v-card-title class="chart-title">
              <v-icon left color="primary">mdi-shape</v-icon>
              资产类型分布
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="pie"
                height="350"
                :options="{
                  ...assetTypeChartOptions,
                  labels: assetTypeLabels,
                  colors: ['#1976d2', '#00897b', '#e91e63', '#ff9800', '#8e24aa'],
                  chart: {
                    ...assetTypeChartOptions.chart,
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
                :series="assetTypeChartSeries"
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
              <v-icon left color="primary">mdi-checkbox-marked-circle-outline</v-icon>
              资产状态分布
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="pie"
                height="350"
                :options="{
                  ...assetStatusChartOptions,
                  labels: assetStatusLabels,
                  colors: ['#43a047', '#e91e63', '#ff9800', '#1976d2'],
                  chart: {
                    ...assetStatusChartOptions.chart,
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
                :series="assetStatusChartSeries"
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
              <v-icon left color="primary">mdi-star</v-icon>
              最受欢迎的资产
            </v-card-title>
            <v-card-text>
              <apex-chart
                type="bar"
                height="350"
                :options="{
                  ...popularAssetsChartOptions,
                  xaxis: {
                    ...popularAssetsChartOptions.xaxis,
                    categories: popularAssetsCategories
                  },
                  colors: ['#1976d2'],
                  chart: {
                    ...popularAssetsChartOptions.chart,
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
                :series="popularAssetsChartSeries"
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
.asset-usage-analysis {
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

.total-assets-card {
  background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
}

.active-assets-card {
  background: linear-gradient(135deg, #43a047 0%, #81c784 100%);
}

.redemption-card {
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
