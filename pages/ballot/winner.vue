<template>
  <div>
	<h2>投票結果</h2>
	<p>一番投票の多い候補者は<span class="winner__name">{{winnerName}}</span>さんです！</p>
	<nuxt-link to="/" class="btn btn-info">戻る</nuxt-link>
  </div>
</template>

<script>
export default {
	computed: {
		winnerName() { return this.$store.state.ballot.winnerName }
	},
	async fetch ({ store, params }) {
		await store.dispatch('ballot/getWinnerName')
	}
}
</script>
<style>
.winner__name {
	font-size: 30px;
	font-weight: bold;
}
</style>