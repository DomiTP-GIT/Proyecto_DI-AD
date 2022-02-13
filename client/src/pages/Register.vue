<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-layout view="lHh Lpr fff">
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card class="shadow-24" square style="width:400px;height:600px;">
              <q-card-section class="bg-blue-7">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-l">
                  <q-input
                    ref="fullname"
                    v-model="fullname"
                    :rules="[this.required]"
                    clearable
                    label="Nombre completo"
                    lazy-rules
                    square type="name">
                    <template v-slot:prepend>
                      <q-icon name="drive_file_rename_outline"/>
                    </template>
                  </q-input>
                  <q-input
                    ref="dni"
                    v-model="dni"
                    :rules="[this.required,this.isDNI]"
                    clearable
                    label="DNI"
                    lazy-rules
                    square>
                    <template v-slot:prepend>
                      <q-icon name="fingerprint"/>
                    </template>
                  </q-input>
                  <q-input
                    ref="username"
                    v-model="username"
                    :rules="[this.required,this.short]"
                    clearable
                    label="Nombre de usuario"
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
                  <q-input
                    ref="repassword"
                    v-model="repassword"
                    :rules="[this.required,this.short,this.diffPassword]"
                    :type="passwordFieldType" clearable
                    label="Repetir contraseña"
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
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Register',
  data () {
    return {
      title: 'Register',
      dni: '',
      username: '',
      password: '',
      repassword: '',
      passwordFieldType: 'password',
      fullname: '',
      btnLabel: 'Register',
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
    diffPassword (val) {
      const val2 = this.$refs.password.value
      // eslint-disable-next-line no-mixed-operators
      return (val && (val !== val2) || 'La contraseña no coincide')
    },
    isDNI (val) {
      let numero, le, letra
      const expresionRegularDni = /^[XYZ]?\d{5,8}[A-Z]$/

      val = val.toUpperCase()

      if (expresionRegularDni.test(val) === true) {
        numero = val.substr(0, val.length - 1)
        numero = numero.replace('X', 0)
        numero = numero.replace('Y', 1)
        numero = numero.replace('Z', 2)
        le = val.substr(val.length - 1, 1)
        numero = numero % 23
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET'
        letra = letra.substring(numero, numero + 1)
        if (letra !== le) {
          return 'La letra del DNI/NIF no coincide'
        } else {
          return true
        }
      } else {
        return 'Formato no válido'
      }
    },
    submit () {
      // Clic botón registrar
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  }
})
</script>
