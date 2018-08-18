import getWeb3 from '~/plugins/getWeb3'
import BallotContract from '~/truffle/build/contracts/Ballot.json'

const contract = require('truffle-contract')
const ballot = contract(BallotContract)

export const state = () => ({
  list: []
})

export const mutations = {
  setProposal (state, proposal) {
    state.list.push(proposal)
  },
}

export const actions = {
  async getProposals ({ commit }) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.getProposalLength().then((result) => {
              const proposalCount = Number.parseInt(result)
              for (let i = 0; i < proposalCount; ++i) {
                instance.getProposal(i).then((name) => {
                  commit('setProposal', name)
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