<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        dapps-nuxt-vote
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import getWeb3 from '~/plugins/getWeb3'
import BallotContract from '~/truffle/build/contracts/Ballot.json'

const contract = require('truffle-contract')
const ballot = contract(BallotContract)

export default {
  components: {
    AppLogo
  },
  async asyncData ({ params }) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.getProposalLength().then((result) => {
              const proposalCount = Number.parseInt(result)
              for (let i = 0; i < proposalCount; ++i) {
                instance.getProposal(i).then((result) => {
                  console.log(result);
                }).catch((e) => {
                  console.log('Error getProposal')
                  console.error(e)
                });
              }
            }).catch((e) => {
              console.log('Error getProposalLength')
              console.error(e)
            })
          })
        })
      })
      .catch((e) => {
        console.log(e)
        console.log('Error finding web3.')
      })
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

