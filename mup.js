module.exports = {
  servers: {
    one: {
      host: '91.134.132.54',
      username: 'root'
      "pem":"../keyOVH.ppk"
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },
	"setupMongo": true,
	"setupNode": true,
	"nodeVersion": "6.5.0",
	"setupPhantom": true,

  meteor: {
    name: 'app',
    path: '.',
    env: {
      ROOT_URL: 'http://91.134.132.54'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },
};