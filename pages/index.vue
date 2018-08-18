<template>
  <div>
    <header>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">Dapps Nuxt Vote</b-navbar-brand>
      </b-navbar>
    </header>
    <main class="container main__container">
      <h2>候補者一覧</h2>
      <div v-if="list.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>候補者名</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(proposal, key, index) in list" :key="index">
              <td>{{ proposal }}</td>
              <td>
                <p class="btn btn-info" @click="vote">投票する</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="btn btn-info" @click="getProposals">候補者を表示する</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    list() { return this.$store.state.proposals.list }
  },
  props: {
    name: {
      type: String
    }
  },
  methods: {
    async vote () {
      console.log('投票する')
      // TODO ここでスマートコントラクトのvoteメソッドを呼び出す
    },
    async getProposals () {
      await this.$store.dispatch('proposals/getProposals')
    }
  },

}
</script>
<style>
.main__container {
  margin-top: 50px;
}
</style>

