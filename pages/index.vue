<template>
  <div>
    <h2>候補者一覧</h2>
    <div v-if="list.length > 0">
      <p>投票数：{{ votedCount }}</p>
      <p class="pull-right">
        <nuxt-link to="ballot/winner" class="btn btn-info">投票結果を見る</nuxt-link>
      </p>
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
              <div v-if="votedName != ''">
                <p v-if="proposal == votedName" class="text-muted">投票しました</p>
              </div>
              <div v-else>
                <p class="btn btn-info" @click="vote(proposal, key)">投票する</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="btn btn-info" @click="getProposals">候補者を表示する</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    votedCount() { return this.$store.state.ballot.votedCount },
    list() { return this.$store.state.ballot.list },
    votedName() { return this.$store.state.ballot.votedName },
  },
  props: {
    name: {
      type: String
    }
  },
  methods: {
    async vote (name, index) {
      await this.$store.dispatch('ballot/vote', { name, index })
    },
    async getProposals () {
      await this.$store.dispatch('ballot/getProposals')
      await this.$store.dispatch('ballot/getVotedCount')
      await this.$store.dispatch('ballot/getVotedName')
    }
  },

}
</script>

