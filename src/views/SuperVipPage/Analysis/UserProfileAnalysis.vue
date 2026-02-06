<script>
import { analyzeUserProfile } from '@/model/dataLayer/api/MembershipSystem/UserAnalysis'
import { showErrorMessage } from '@/model/utils/utils'

export default {
  name: 'UserProfileAnalysis',
  data () {
    return {
      loading: false,
      userProfileData: null,
      ageChartOptions: {
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
          text: '年龄分布',
          align: 'center'
        }
      },
      genderChartOptions: {
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
          text: '性别分布',
          align: 'center'
        }
      },
      membershipLevelChartOptions: {
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
            text: '用户数'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' 用户'
            }
          }
        },
        title: {
          text: '会员等级分布',
          align: 'center'
        }
      }
    }
  },
  computed: {
    ageLabels () {
      if (!this.userProfileData || !this.userProfileData.ageDistribution) return []
      const labels = Object.keys(this.userProfileData.ageDistribution || {})
      return labels.length > 0 ? labels : ['18-24岁']
    },
    ageChartSeries () {
      if (!this.userProfileData || !this.userProfileData.ageDistribution) return []
      const values = this.ageLabels.map(range => this.userProfileData.ageDistribution?.[range] || 0)
      return values.length > 0 ? values : [0]
    },
    genderLabels () {
      if (!this.userProfileData || !this.userProfileData.genderDistribution) return []
      const labels = Object.keys(this.userProfileData.genderDistribution || {})
      return labels.length > 0 ? labels : ['男', '女']
    },
    genderChartSeries () {
      if (!this.userProfileData || !this.userProfileData.genderDistribution) return []
      const values = this.genderLabels.map(gender => this.userProfileData.genderDistribution?.[gender] || 0)
      return values.length > 0 ? values : [0, 0]
    },
    membershipLevelCategories () {
      if (!this.userProfileData || !this.userProfileData.membershipLevelDistribution) return []
      const categories = Object.keys(this.userProfileData.membershipLevelDistribution || {})
      return categories.length > 0 ? categories : ['普通会员']
    },
    membershipLevelChartSeries () {
      if (!this.userProfileData || !this.userProfileData.membershipLevelDistribution) return []

      const counts = this.membershipLevelCategories.map(level => this.userProfileData.membershipLevelDistribution?.[level] || 0)

      return [{
        name: '用户数',
        data: counts.length > 0 ? counts : [0]
      }]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        this.loading = true
        this.userProfileData = await analyzeUserProfile()
      } catch (error) {
        showErrorMessage('Failed to fetch user profile data')
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
  <div v-if="userProfileData" class="user-profile-analysis">
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          elevation="4"
          class="metric-card total-users-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-account-group</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">总用户数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ userProfileData.totalUsers }}
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
          class="metric-card active-users-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-account-check</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">活跃用户数</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ userProfileData.activeUsers }}
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
          class="metric-card new-users-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-account-plus</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">30天新用户</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ userProfileData.newUsers30Days }}
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
          class="metric-card retention-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-account-heart</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">留存率</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ userProfileData.retentionRate }}%
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
            <v-icon left color="primary">mdi-chart-pie</v-icon>
            年龄分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="pie"
              height="350"
              :options="{
                ...ageChartOptions,
                labels: ageLabels,
                colors: ['#1976d2', '#00897b', '#e91e63', '#ff9800', '#8e24aa'],
                chart: {
                  ...ageChartOptions.chart,
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
              :series="ageChartSeries"
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
            <v-icon left color="primary">mdi-gender-male-female</v-icon>
            性别分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="pie"
              height="350"
              :options="{
                ...genderChartOptions,
                labels: genderLabels,
                colors: ['#1976d2', '#e91e63', '#9c27b0'],
                chart: {
                  ...genderChartOptions.chart,
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
              :series="genderChartSeries"
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
            <v-icon left color="primary">mdi-medal</v-icon>
            会员等级分布
          </v-card-title>
          <v-card-text>
            <apex-chart
              type="bar"
              height="350"
              :options="{
                ...membershipLevelChartOptions,
                xaxis: {
                  ...membershipLevelChartOptions.xaxis,
                  categories: membershipLevelCategories
                },
                colors: ['#1976d2'],
                chart: {
                  ...membershipLevelChartOptions.chart,
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
              :series="membershipLevelChartSeries"
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
          class="metric-card points-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-star-circle</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">平均积分余额</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                {{ userProfileData.averagePointsBalance }}
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
          class="metric-card consumption-card"
        >
          <div class="metric-card-content">
            <div class="metric-icon">
              <v-icon size="36" color="white">mdi-currency-usd</v-icon>
            </div>
            <div class="metric-details">
              <v-card-title class="white--text">平均消费金额</v-card-title>
              <v-card-text class="text-h3 white--text text-center font-weight-bold">
                ¥{{ userProfileData.averageConsumptionAmount }}
              </v-card-text>
            </div>
          </div>
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
.user-profile-analysis {
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

.total-users-card {
  background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
}

.active-users-card {
  background: linear-gradient(135deg, #00897b 0%, #4db6ac 100%);
}

.new-users-card {
  background: linear-gradient(135deg, #e91e63 0%, #f48fb1 100%);
}

.retention-card {
  background: linear-gradient(135deg, #ff9800 0%, #ffcc80 100%);
}

.points-card {
  background: linear-gradient(135deg, #8e24aa 0%, #ba68c8 100%);
}

.consumption-card {
  background: linear-gradient(135deg, #43a047 0%, #81c784 100%);
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
