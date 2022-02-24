<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-layout view="lHh Lpr fff">
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card class="shadow-24" square style="width:400px;height:400px;">
              <q-card-section class="bg-blue-7">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-l">
                  <q-input
                    ref="username"
                    v-model="username"
                    :rules="[this.required,this.short]"
                    clearable
                    label="Usuario"
                    lazy-rules
                    square type="username">
                    <template v-slot:prepend>
                      <q-icon name="person"/>
                    </template>
                  </q-input>
                  <q-input
                    ref="password"
                    v-model="password"
                    :rules="[this.required,this.short]"
                    :type="passwordFieldType" clearable
                    label="Contraseña"
                    lazy-rules
                    square>

                    <template v-slot:prepend>
                      <q-icon name="lock"/>
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon" class="cursor-pointer" @click="switchVisibility"/>
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  :label="btnLabel"
                  class="full-width text-white"
                  color="secondary"
                  size="lg"
                  unelevated @click="submit"/>
              </q-card-actions>
              <q-card-section
                class="text-center q-pa-sm">
                <p class="text-grey-6">¿No estás registrado? <a href="#/Register">Regístrate</a></p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
const md5 = require('blueimp-md5')

export default defineComponent({
  name: 'Login',
  data () {
    return {
      title: 'Login',
      username: '',
      password: '',
      passwordFieldType: 'password',
      btnLabel: 'LOGIN',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  methods: {
    required (val) {
      return ((val && val.length > 0) || 'El campo no puede estar vacío')
    },
    short (val) {
      return ((val && val.length > 2) || 'El campo es muy corto')
    },
    submit () {
      api.post('/login', {
        username: this.username,
        password: md5(this.password)
      }).then((response) => {
        if (response.data.ok) {
          this.$q.notify({
            color: 'positive',
            position: 'center',
            message: 'Login Correcto',
            icon: 'thumb_up_alt'
          })
          this.$store.commit('showcase/setToken', response.data.data.token)
          this.$store.commit('showcase/setRefreshToken', response.data.data.refreshToken)
          this.$store.commit('showcase/setUsername', this.username)
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'bottom',
            message: response.data.failed,
            icon: 'report_problem'
          })
        }
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'Login failed',
          icon: 'report_problem'
        })
      })
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  }
})
</script>
