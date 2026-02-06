<script>
import { analyzeConsumptionFrequency } from '@/model/dataLayer/api/MembershipSystem/UserAnalysis'
import { showErrorMessage } from '@/model/utils/utils'

export default {
  name: 'ConsumptionFrequencyAnalysis',
  props: {
    dateRange: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      consumptionFrequencyData: null,
      hourlyChartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: '订单数'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' 订单'
            }
          }
        },
        title: {
          text: '小时分布',
          align: 'center'
        }
      },
      dayOfWeekChartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: '订单数'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' 订单'
            }
          }
        },
        title: {
          text: '星期分布',
          align: 'center'
        }
      },
      monthlyChartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: '订单数'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' 订单'
            }
          }
        },
        title: {
          text: '月份分布',
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
    hourlyCategories () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.hourlyDistribution) return []
      const hours = Object.keys(this.consumptionFrequencyData.hourlyDistribution || {}).sort((a, b) => parseInt(a) - parseInt(b))
      return hours.length > 0 ? hours.map(hour => `${hour}:00`) : ['00:00']
    },
    hourlyChartSeries () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.hourlyDistribution) return []

      const hours = Object.keys(this.consumptionFrequencyData.hourlyDistribution || {}).sort((a, b) => parseInt(a) - parseInt(b))
      const counts = hours.map(hour => this.consumptionFrequencyData.hourlyDistribution[hour] || 0)

      return [{
        name: '订单数',
        data: counts.length > 0 ? counts : [0]
      }]
    },
    dayOfWeekCategories () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.dayOfWeekDistribution) return []
      const days = Object.keys(this.consumptionFrequencyData.dayOfWeekDistribution || {})
      return days.length > 0 ? days : ['周一']
    },
    dayOfWeekChartSeries () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.dayOfWeekDistribution) return []

      const days = this.dayOfWeekCategories
      const counts = days.map(day => this.consumptionFrequencyData.dayOfWeekDistribution?.[day] || 0)

      return [{
        name: '订单数',
        data: counts.length > 0 ? counts : [0]
      }]
    },
    monthlyCategories () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.monthlyDistribution) return []
      const months = Object.keys(this.consumptionFrequencyData.monthlyDistribution || {})
      return months.length > 0 ? months : ['一月']
    },
    monthlyChartSeries () {
      if (!this.consumptionFrequencyData || !this.consumptionFrequencyData.monthlyDistribution) return []

      const months = this.monthlyCategories
      const counts = months.map(month => this.consumptionFrequencyData.monthlyDistribution?.[month] || 0)

      return [{
        name: '订单数',
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
        this.consumptionFrequencyData = await analyzeConsumptionFrequency(this.analysisRequest)
      } catch (error) {
        showErrorMessage('Failed to fetch consumption frequency data')
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
  <div v-if="consumptionFrequencyData" class="consumption-frequency-analysis">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          elevation="4"
          class="metric-card total-orders-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-cart</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">订单总数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ consumptionFrequencyData.totalOrders }}
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
          class="metric-card average-orders-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-calendar-check</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">日均订单数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ consumptionFrequencyData.averageOrdersPerDay }}
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          elevation="4"
          class="metric-card peak-hour-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-clock-time-four-outline</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">高峰时段</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ consumptionFrequencyData.peakHour }}:00
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
          class="metric-card peak-day-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-calendar-star</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">高峰日</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ consumptionFrequencyData.peakDay }}
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
            小时分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="bar"
              height="350"
              :options="{
                ...hourlyChartOptions,
                xaxis: {
                  ...hourlyChartOptions.xaxis,
                  categories: hourlyCategories
                },
                colors: ['#1976d2'],
                chart: {
                  ...hourlyChartOptions.chart,
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
              :series="hourlyChartSeries"
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
            <v-icon left color="primary">mdi-calendar-week</v-icon>
            星期分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="bar"
              height="350"
              :options="{
                ...dayOfWeekChartOptions,
                xaxis: {
                  ...dayOfWeekChartOptions.xaxis,
                  categories: dayOfWeekCategories
                },
                colors: ['#00897b'],
                chart: {
                  ...dayOfWeekChartOptions.chart,
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
              :series="dayOfWeekChartSeries"
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
            <v-icon left color="primary">mdi-calendar-month</v-icon>
            月份分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="bar"
              height="350"
              :options="{
                ...monthlyChartOptions,
                xaxis: {
                  ...monthlyChartOptions.xaxis,
                  categories: monthlyCategories
                },
                colors: ['#e91e63'],
                chart: {
                  ...monthlyChartOptions.chart,
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
              :series="monthlyChartSeries"
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
.consumption-frequency-analysis {
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

.total-orders-card {
  background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
}

.average-orders-card {
  background: linear-gradient(135deg, #00897b 0%, #4db6ac 100%);
}

.peak-hour-card {
  background: linear-gradient(135deg, #e91e63 0%, #f48fb1 100%);
}

.peak-day-card {
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
