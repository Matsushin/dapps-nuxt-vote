import getWeb3 from '~/plugins/getWeb3'
import BallotContract from '~/truffle/build/contracts/Ballot.json'

const contract = require('truffle-contract')
const ballot = contract(BallotContract)

export const state = () => ({
  votedCount: 0,
  list: [],
  votedName: null,
  winnerName: '',
})

export const mutations = {
  setVotedCount (state, count) {
    state.votedCount = count
  },
  setProposal (state, proposal) {
    state.list.push(proposal)
  },
  setVotedName (state, name) {
    state.votedName = name
  },
  setWinnerName (state, name) {
    state.winnerName = name
  },
}

export const actions = {
  async vote ({ commit, state}, index) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.vote(index, {from: accounts[0], gas: 200000 }).then((result) => {
              console.log(result)
            }).catch((e) => {
              console.log('Error vote')
              console.error(e)
            })
          })
        })
      })
      .catch((e) => {
        console.log(e)
        console.log('Error finding web3.')
      })
  },
  async getVotedCount ({ commit }) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.getVoterLength().then((result) => {
              const count = Number.parseInt(result)
              commit('setVotedCount', count)
            }).catch((e) => {
              console.log('Error getVotedCount')
              console.error(e)
            })
          })
        })
      })
      .catch((e) => {
        console.log(e)
        console.log('Error finding web3.')
      })
  },
  async getVotedName ({ commit }) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.getVotedName().then((result) => {
              commit('setVotedName', result)
            }).catch((e) => {
              console.log('Error getVotedName')
              console.error(e)
            })
          })
        })
      })
      .catch((e) => {
        console.log(e)
        console.log('Error finding web3.')
      })
  },
  async getWinnerName ({ commit }) {
    getWeb3
      .then(results => {
        ballot.setProvider(results.web3.currentProvider)
        results.web3.eth.getAccounts((error, accounts) => {
          ballot.deployed().then((instance) => {
            instance.winnerName().then((name) => {
              commit('setWinnerName', results.web3.utils.hexToAscii(name))
            }).catch((e) => {
              console.log('Error getWinnerName')
              console.error(e)
            })
          })
        })
      })
      .catch((e) => {
        console.log(e)
        console.log('Error finding web3.')
      })
  },
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