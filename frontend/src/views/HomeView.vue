// sample Home code for testing purposes

<template>
<div class="container at-5 text-center">
  <h3>{{message}}</h3>

  <a href="javascript:void(0)" class="btn btn-lg btn-primary"
     @click="logout">Logout</a>
</div>
</template>

<script>
import {onMounted, ref} from 'vue'
// import {api} from '../services/UserApi'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup () {
    const message = ref('')

    onMounted(async () => {
      try {
        // const {data} = await api.getUserByID('get_user', 'userID')

        // message.value = `Hi ${data.name}`
      } catch (e) {
        await event.push('/login')
      }
    })

    const logout = async () => {
      await event.post('logout', {}, {withCredentials: true})

      event.defaults.headers.common['Authorization'] = ''

      await event.push('/login')
    }

    return {
      message,
      logout
    }
  }
}
</script>

<style scoped>

</style>
