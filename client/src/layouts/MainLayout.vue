<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          side="right"
          @click="drawerState = !drawerState"
        />

        <q-toolbar-title>
          Qualificacions App
        </q-toolbar-title>

        <div>{{ fecha }}</div>
        <q-space />
        <q-icon
          name="network_check" @click="testConnection"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerState"
      show-if-above
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ userName }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'boot/axios'

const linksList = [
  {
    title: 'Iniciar sesión',
    caption: 'Iniciar sesión en la aplicación',
    icon: 'login',
    link: '#/'
  },
  {
    title: 'Registrarse',
    caption: 'Registrarse en la aplicación',
    icon: 'note_alt',
    link: '#/Register'
  },
  {
    title: 'About',
    caption: 'Sobre mi',
    icon: 'badge',
    link: '#/About'
  }
]

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  setup () {
    return {
      essentialLinks: linksList
    }
  },
  computed: {
    fecha () {
      const meses = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre']
      const hoy = new Date()
      const diaSemana = hoy.toLocaleDateString('ca-CA', { weekday: 'long' })
      const diaSemanaMayus = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
      return diaSemanaMayus + ', ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear()
    },
    drawerState: {
      get () {
        return this.$store.state.showcase.drawerState
      },
      set (val) {
        this.$store.commit('showcase/updateDrawerState', val)
      }
    },
    userName () {
      return this.$store.state.showcase.username ? this.$store.state.showcase.username : 'Inicia sesión'
    }
  },
  methods: {
    testConnection () {
      api.get('/').then((response) => {
        if (response.status === 200) {
          this.$q.notify({
            color: 'positive',
            position: 'bottom',
            message: 'Conectado correctamente',
            icon: 'check'
          })
        }
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: 'No se ha podido conectar con el servidor',
          icon: 'report_problem'
        })
      })
    }
  }
})
</script>
