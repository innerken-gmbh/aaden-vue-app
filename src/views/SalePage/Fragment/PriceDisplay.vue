<template>
  <v-card elevation="0" style="width: 100%;">
    <div style="display:flex;">
      <v-container>
        <v-row   class="pa-2 justify-center align-center d-flex">
          <v-col class="mt-8" cols="12" lg="4" md="5">
            <v-card elevation="1" style="border-radius: 8px;" class="mx-4 d-flex flex-column align-center justify-center">
              <div class="pa-4">
                <div  class="my-8">
                  <h6 class="font-weight-bold text-body-1">
                    {{ $t('non_german_standard_license') }}
                  </h6>
                </div>
                <div class="mt-8" style="display: flex; min-height: 7rem">
                  <h6 style="font-size: 2.25rem">€</h6>
                  <h1 class="font-weight-bold mt-4" style="font-size: 6rem">
                    4
                  </h1>
                  <h4 class="mt-11" style="font-size: 1rem;">.99 /{{ $t('month') }}</h4>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="mt-2 pa-8 align-center justify-center" style="text-align: left; width:100%; background-color: #fafafa; height: auto;overflow: visible;">
                <div class="my-6 text-h6">
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('remote_view_of_in_store_data') }}
                  </div>
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('support_three_devices_to_synchronize_data') }}
                  </div>
                </div>
              </div>
              <div style="height: 100px; width:100%; background-color: #fafafa;"></div>
              <div style="position: absolute; bottom: 10px">
                <v-img class="ml-4" max-width="100px" max-height="100px" src="@/assets/1.png"></v-img>
                <h4>{{ $t('qrcode_scannen_to_bind_boss_side_app') }}</h4>
              </div>
            </v-card>
          </v-col>
          <v-col class="mt-8" cols="12" lg="5" md="6">
            <v-card elevation="1" style="border-radius: 8px;" class="mx-4 d-flex flex-column align-center justify-center">
              <div class="pa-4">
                <div  class="my-8">
                  <h6 class="font-weight-bold text-body-1">
                    {{ $t('GermanStandardLicense') }}
                  </h6>
                </div>
                <div class="mt-8" style="display: flex; min-height: 7rem">
                  <h6 style="font-size: 2.25rem">€</h6>
                  <h1 class="font-weight-bold mt-4" style="font-size: 6rem">
                    14
                  </h1>
                  <h4 class="mt-11" style="font-size: 1rem;">.99 /{{ $t('month') }}</h4>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="mt-2 pa-8 align-center justify-center" style="text-align: left; width:100%; background-color: #fafafa; height: auto;overflow: visible;">
                <div class="my-6 text-h6">
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('remote_view_of_in_store_data') }}
                  </div>
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('support_three_devices_to_synchronize_data') }}
                  </div>
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('DatevIntegration') }}
                  </div>
                  <div class="align-center d-flex my-2">
                    <v-icon class="theme--light light-green--text mx-2">mdi-check</v-icon>{{ $t('MoreNewFeatures') }}
                  </div>
                </div>
              </div>
              <div style="height: 100px; width:100%; background-color: #fafafa;"></div>
              <div style="position: absolute; bottom: 10px">
                <v-img class="ml-4" max-width="100px" max-height="100px" src="@/assets/1.png"></v-img>
                <h4>{{ $t('qrcode_scannen_to_bind_boss_side_app') }}</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PriceDisplay'
}
</script>

<style scoped>

</style>
