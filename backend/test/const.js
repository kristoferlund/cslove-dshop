const TMP_DIR = `/tmp/dshop_cache-${new Date().toISOString()}`
const BACKEND_PORT = 8357

module.exports = {
  BACKEND_PORT,
  ROOT_BACKEND_URL: `http://localhost:${BACKEND_PORT}`,
  IPFS_GATEWAY: `http://localhost:8080`,
  TEST_NETWORK_ID: 999,
  TMP_DIR,
  TEST_DATABASE_URL: `sqlite:${TMP_DIR}/dshop.db`,
  TEST_DSHOP_CACHE: TMP_DIR,
  TEST_HASH_1: 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx',
  TEST_DOMAIN_1: 'originprotocol.com',
  TEST_LISTING_ID_1: '999-001-999',
  TEST_SHOP_TOKEN_1: 'test-shop',
  TEST_UNSTOPPABLE_DOMAIN_1: 'testname.crypto',
  USER_EMAIL_1: 'test@originprotocol.com',
  USER_PASS_1: 'asdf1234',
  PGP_KEY_PASSPHRASE: 'asdf1234',
  PGP_PUBLIC_KEY: `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBF7hL7gBCACxrkcaj+YXor57Z69IC6+N9sT/6d+/Yi2wWA9Jc1OdZlfGRHaY
u8mf9Yuxv58npodcEl0FV4c5FEsLiUMoZr4+k8zmjip3cp0n63qu3AUpqvgwEnLX
cW+D5a+KBHfMDpaNxX3Xs6uS0mjQQ2ro81NZ1OKqzFhN0OGkBUCHk4fcjMb7G2Y3
smmthdd9NIP5YlQoZ1rMHfQzPUUQ8xnjrGNYCXkOIClR9Q3jZIzgRQ9nfvuTZZZC
50YxJToPT7hyjl0eEccNtJU/qZ6XLR6b9VD8nbF8i687kUCdeXcL0wM6YZEy7EG8
G+/U5cAcK9ufYz5MBvv0zAYw0sxK8tklYiGHABEBAAG0SVRlc3QgVXNlciAoVGhp
cyBpcyBhIHRlc3Qga2V5IGV4cG9zZWQgcHVibGljbHkpIDx0ZXN0QG9yaWdpbnBy
b3RvY29sLmNvbT6JAU4EEwEIADgWIQSr4LKG5pcVL6p7fHdOIWT3uYrRlgUCXuEv
uAIbAwULCQgHAgYVCgkICwIEFgIDAQIeAQIXgAAKCRBOIWT3uYrRliNNB/0aihwF
1cRaC/hfK7iO8orEBT8Ff58SuDpN06ENH0cfHGm633XgfHugDSWvORqvXIxK2OT3
/2gyK9Si7HWRFg1dTWTKugHWhqXvTuwUxDAk7vyJZhwYC8diOHtXz0hjiI/e5xUP
bXf3DveF9BDDzqk7lA06wVa//ihiyT1ywKZEwjU77dXfju5flY3i5z1ZBf1dENhn
wAGoM/ljBAoFL6vZwYNuDWuqJXcYQ2EDbVFDBRjyunz+w1Wn1Fnv0+nZLczaojw5
XU0YKLYlmkai/UzTPiMciJgnAUsdMIGpOeiXcgBla4BA/oLcHRXJVkfkLvW0luGw
UvNFfsCN0hi/5YWvuQENBF7hL7gBCAC2tAOLipjRfw0eOFHZ2Vu1N/vUp9typ5Ye
nBh3W3BhjH08hV8wihSbKPlva5QiQWpXVZ8uCQjBlwKGNrm/GXW392Kkqm9GL7gq
Tfo+n8RYCxoW4m2YJzS2oKKAFdTlinP5rUoLq7KzuLX9qFVv5cgAINaZO169QMAD
F7qU0P9PRsznkVM3eMfQ6iidJHxlgbNFnc4GZ4AsSy7ZtkezPqdD5YFQvYbJ0kJu
jo3NpKhmdDfD5+QzKXnVPt4sqwknftWu66vZvoGh6N9Bknrk21s9M0PbZvOXCcMj
uY1NxMJiVhh8A2yk+0K2i6FeSjWx4tTr2KuJyD3Z2JFOT4xrVn8JABEBAAGJATYE
GAEIACAWIQSr4LKG5pcVL6p7fHdOIWT3uYrRlgUCXuEvuAIbDAAKCRBOIWT3uYrR
lhLUB/0Re5qH6/Aem2r+6YjW5Z6OYvXcP8ijA0KmMU0vMTaKgCUMQXHyXVchZpBq
S4ixai3wWw+6OYMiwV25XlphHqDGDFRDlWzJiCytcUjYUQDlToe5E99iMv9YoadA
NFdz1bgGclZD/e2mWRZtxKb0WgXwOaPihNl0QLE56q8M1uLMgmwPXpT+/5iX0iSd
mpaMaod2AyusHIqnMYE1xhuFLtbvmWaSG4T8CRuTuudJ7pfYV0w6ezaZ4FSrd8yg
yFVOv9weoexPq27f+qE+LARdPe63WDEWKdqOZsGLmOaDU5r+1o00rPdai24PL/9n
7mklWu5QHIlBjMvRS8hPxEceC/IU
=/YU2
-----END PGP PUBLIC KEY BLOCK-----`,
  PGP_PRIVATE_KEY: `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
/2fuaSVa7lAciUGMy9FLyE/ERx4L8hQ=
=7cHK
-----END PGP PRIVATE KEY BLOCK-----`
}
