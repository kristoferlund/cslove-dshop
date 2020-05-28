const deploy = require('ipfs-deploy')
const ipfsClient = require('ipfs-http-client')
const fs = require('fs')
const { exec } = require('child_process')

const { ShopDeployment } = require('../models')

const { getConfig } = require('./encryptedConfig')
const prime = require('./primeIpfs')
const setCloudflareRecords = require('./dns/cloudflare')
const setCloudDNSRecords = require('./dns/clouddns')

async function deployShop({ OutputDir, dataDir, network, subdomain, shop }) {
  const networkConfig = getConfig(network.config)
  const zone = networkConfig.domain

  await new Promise((resolve, reject) => {
    exec(`rm -rf ${OutputDir}/public`, (error, stdout) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })

  await new Promise((resolve, reject) => {
    exec(`cp -r ${__dirname}/../dist ${OutputDir}/public`, (error, stdout) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })

  await new Promise((resolve, reject) => {
    exec(
      `cp -r ${OutputDir}/data ${OutputDir}/public/${dataDir}`,
      (error, stdout) => {
        if (error) reject(error)
        else resolve(stdout)
      }
    )
  })

  const networkName =
    network.networkId === 1
      ? 'mainnet'
      : network.networkId === 4
      ? 'rinkeby'
      : 'localhost'

  const html = fs.readFileSync(`${OutputDir}/public/index.html`).toString()
  fs.writeFileSync(
    `${OutputDir}/public/index.html`,
    html
      .replace('TITLE', shop.name)
      .replace('DATA_DIR', dataDir)
      .replace('NETWORK', networkName)
  )

  // Deploy the shop to IPFS.
  let hash, ipfsGateway
  const publicDirPath = `${OutputDir}/public`
  if (networkConfig.pinataKey && networkConfig.pinataSecret) {
    ipfsGateway = 'https://gateway.pinata.cloud'
    hash = await deploy({
      publicDirPath,
      remotePinners: ['pinata'],
      siteDomain: dataDir,
      credentials: {
        pinata: {
          apiKey: networkConfig.pinataKey,
          secretApiKey: networkConfig.pinataSecret
        }
      }
    })
    if (!hash) {
      throw new Error('ipfs-errir')
    }
    console.log(`Deployed shop on Pinata. Hash=${hash}`)
    await prime(`https://gateway.pinata.cloud/ipfs/${hash}`, publicDirPath)
    await prime(`https://gateway.ipfs.io/ipfs/${hash}`, publicDirPath)
    await prime(`https://ipfs-prod.ogn.app/ipfs/${hash}`, publicDirPath)
  } else if (network.ipfsApi.indexOf('localhost') > 0) {
    ipfsGateway = network.ipfsApi
    const ipfs = ipfsClient(network.ipfsApi)
    const allFiles = []
    const glob = ipfsClient.globSource(publicDirPath, { recursive: true })
    for await (const file of ipfs.add(glob)) {
      allFiles.push(file)
    }
    hash = String(allFiles[allFiles.length - 1].cid)
    console.log(`Deployed shop on local IPFS. Hash=${hash}`)
  } else {
    console.log(
      'Shop not deployed to IPFS: Pinata not configured and not a dev environment.'
    )
  }

  let domain
  if (networkConfig.cloudflareApiKey || networkConfig.gcpCredentials) {
    domain = `https://${subdomain}.${zone}`

    const opts = {
      ipfsGateway: 'ipfs-prod.ogn.app',
      zone,
      subdomain,
      hash
    }

    if (networkConfig.cloudflareApiKey) {
      await setCloudflareRecords({
        ...opts,
        email: networkConfig.cloudflareEmail,
        key: networkConfig.cloudflareApiKey
      })
    } else if (networkConfig.gcpCredentials) {
      await setCloudDNSRecords({
        ...opts,
        credentials: networkConfig.gcpCredentials
      })
    }
  }

  // Record the deployment in the DB.
  const deployment = await ShopDeployment.create({
    shopId: shop.id,
    domain,
    ipfsGateway,
    ipfsHash: hash
  })

  console.log(
    `Recorded shop deployment in the DB. id=${deployment.id} domain=${domain} ipfs=${ipfsGateway} hash=${hash}`
  )

  return { hash, domain }
}

module.exports = { deployShop }
