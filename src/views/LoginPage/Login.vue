<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div
    v-cloak
    class="d-flex  align-center justify-center flex-column"
    style="height: 100%;position: relative"
  >
    <div
      style="width: 70%;max-width: 480px;"
    >
      <template v-if="isLogin">
        <template v-if="!passwordForget">
          <template>
<!--            <div class="d-flex">-->
<!--              <v-spacer/>-->
<!--              <language-switcher-->
<!--                :current-locale-code="currentLocaleCode"-->
<!--                :locales="$i18n.messages"-->
<!--                @language-change="changeLanguage"-->
<!--              />-->
<!--            </div>-->
            <div
              class="d-flex flex-column align-center justify-center"
            >
              <div
                class="text-h3 mb-4 hidden-sm-and-down"
              >
                {{ $t('Login') }}
              </div>
              <div
                class="text-h3 mb-4 hidden-md-and-up"
              >
                <logo-display/>
              </div>
              <div class="text-body-1 text--secondary">
                {{ $t('LoginHint') }}
              </div>
            </div>
          </template>
          <div
            style="min-height: 196px;"
          >
            <v-form
              ref="form"
              v-model="isFormValid"
              lazy-validation
            >
              <div>
                <div class="text-caption mb-2">
                  {{ $t('emailAddress') }}
                </div>
                <v-text-field
                  v-model="email"
                  :error="error"
                  :rules="[rules.required]"
                  :validate-on-blur="false"
                  name="email"
                  outlined
                  @change="resetErrors"
                  @keyup.enter="submit"
                />
              </div>
              <div>
                <div class="text-caption mb-2">
                  {{ $t('Password') }}
                </div>

                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :error="error"
                  :error-messages="errorMessages"
                  :rules="[rules.required]"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  outlined
                  @change="resetErrors"
                  @keyup.enter="submit"
                  @click:append="showPassword = !showPassword"
                />
              </div>

              <div class="d-flex mb-4">
                <v-spacer/>
                <a @click="passwordForget=true">
                  {{ $t('PasswordReset') }}
                </a>
              </div>
              <v-btn
                :disabled="isSignInDisabled"
                :loading="isLoading"
                block
                color="primary lighten-4 black--text"
                elevation="0"
                x-large
                @click="submit"
              >
                {{ $t('LoginRegister') }}
              </v-btn>
              <div
                v-if="errorProvider"
                class="error--text"
              >
                {{ errorProviderMessages }}
              </div>
              <div class="d-flex align-center">
                <v-divider/>
                <div class="text-caption font-weight-bold text-uppercase ma-3 my-4">
                  {{ $t('SignInWith') }}
                </div>
                <v-divider/>
              </div>
              <div class="d-flex justify-center">
                <div
                  style="display: grid;
                grid-auto-flow: column;
                grid-auto-columns: min-content;
                grid-gap: 12px;
"
                >
                  <v-btn
                    v-for="provider in providers"
                    :key="provider.id"
                    :disabled="isSignInDisabled"
                    :loading="provider.isLoading"
                    class="mb-2 secondary lighten-4"
                    elevation="0"
                    icon
                    @click="signInProvider(provider.id)"
                  >
                    <v-icon>
                      mdi-{{ provider.id }}
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-form>
          </div>
        </template>
        <template v-else>
          <v-card-title>{{ $t('PasswordResetTitle') }}</v-card-title>
          <v-card-text style="min-height: 196px">
            <v-form
              ref="form"
              v-model="isFormValid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :error="error"
                :label="$t('emailAddress')"
                :rules="[rules.required]"
                :validate-on-blur="false"
                name="email"
                outlined
                @change="resetErrors"
                @keyup.enter="submit"
              />
              <v-btn
                :disabled="isSignInDisabled"
                :loading="isLoading"
                block
                color="primary"
                x-large
                @click="sendResetPasswordEmail"
              >
                {{ $t('PasswordResetToEmail') }}
              </v-btn>
              <v-btn
                block
                class="mt-2"
                color="blue"
                x-large
                @click="passwordForget = false"
              >
                {{ $t('Zurück') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </template>
      </template>
      <template v-else>
        <div class="d-flex flex-column align-center justify-center">
          <div class="text-body-1 mb-4">
            {{ $t('CheckAccountSettings') }}
          </div>

          <div
            class="mt-8"
            style="min-height: 196px"
          >
            <div
              style="display: flex;justify-content: center"
            >
              <v-progress-circular
                class="mt-4"
                indeterminate
              />
            </div>
          </div>
        </div>
      </template>
      <div
        class="d-flex flex-column align-center text-caption text--secondary"
        style="width: 100%;position: absolute;left: 0;right: 0;bottom: 48px;"
      >
        <div>
          Aaden POS v {{ version }}
        </div>
        <div>
          Copyright 2023, InnerKen All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  createUserWithEmail,
  loginWithApple,
  loginWithEmailAndPassword,
  loginWithGoogle,
  resetPasswordEmail
} from '@/api/firebase/google-fire-base'

import LogoDisplay from '@/views/LoginPage/LogoDisplay'
import { getCurrentUserId } from '@/api/firebase/user'
import i18n from '@/i18n'

export default {
  name: 'LoginPage',
  components: {
    LogoDisplay
  },
  computed: {
    ...mapState(['loginStateReady'])
  },
  data () {
    return {
      isLogin: false,
      minWidth: '',
      userCurrentPinCode: null,
      version: require('../../../package.json').version,
      passwordForget: false,
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,
      errorMessages: '',

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false,

      providers: [
        {
          id: 'google',
          label: 'Google',
          isLoading: false,
          color: '#fbbc05'
        }, {
          id: 'apple',
          label: 'Apple',
          isLoading: false,
          color: 'black'
        }
      ],

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || i18n.t('required')
      }
    }
  },
  watch: {},
  async mounted () {
    setTimeout(() => this.checkLogin(), 3000)
    this.minWidth = window.innerWidth
  },
  methods: {
    checkLogin () {
      console.log(getCurrentUserId(), 'getCurrentUserId()1')
      if (!getCurrentUserId()) {
        this.isLogin = true
      }
    },
    async submit () {
      console.log('1')
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        await this.signIn(this.email, this.password)
        this.isLoading = false
        this.isSignInDisabled = false
      }
    },
    async sendResetPasswordEmail () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        await resetPasswordEmail(this.email)
        this.isLoading = false
        this.isSignInDisabled = false
        this.passwordForget = false
        this.errorMessages = i18n.t('PasswordSuccessReset')
        this.password = ''
      }
    },
    async signIn (email, password) {
      try {
        console.log('2')
        await loginWithEmailAndPassword(email, password)
        console.log('1')
      } catch (e) {
        if (e.code === 'auth/user-not-found') {
          try {
            await createUserWithEmail(email, password)
          } catch (e) {
            this.error = true
            this.errorMessages = e.message
          }
        } else {
          console.log(e.code, 'login')
          this.error = true
          this.errorMessages = e.message
        }
      }
    },
    async signInProvider (id) {
      console.log(id, 'id')
      try {
        if (id === 'google') {
          await loginWithGoogle()
        } else {
          await loginWithApple()
        }
      } catch (e) {
        this.errorProvider = true
        this.errorProviderMessages = e.message
      }
    },
    resetErrors () {
      this.error = false
      this.errorMessages = ''
      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }
}
</script>

<style scoped>

</style>
