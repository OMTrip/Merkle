const verifyTokenJson = {
  bsc: {
    api: 'https://api.bscscan.com/api',
    key: 'IVRMCPRHTR6EVUJBJE2DHNF269JP7WUTPC',
  },
  bsc_testnet: {
    api: 'https://api-testnet.bscscan.com/',
    key: '534GZPDUWFEKTT7QBIE81G683CGFISFUIF',
  },
  polygon: {
    api: 'https://api.polygonscan.com/api',
    key: 'SERV1Q1D9G3WFF963SRWZ4WU8F6EVYDDIY',
  },
  ethereum: {
    api: 'https://api.etherscan.io/api',
    key: '72YD1VSIXTR6A5XYP7P5678ASE2VA88JYX',
  },
};
export async function verifyToken(
  recriptData,
  source,
  name,
  argument,
  slug,
  Toast,
) {
  try {
    let dat = await axios.post(
      verifyTokenJson[slug].api,
      {
        apiKey: verifyTokenJson[slug].key,
        module: 'contract',
        action: 'verifysourcecode',
        sourcecode: source,
        contractaddress: recriptData.contractAddress,
        codeformat: 'solidity-single-file',
        contractname: name,
        compilerversion: 'v0.8.17+commit.8df45f5f',
        optimizationUsed: 1,
        runs: 200,
        constructorArguements: argument,
      },
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    );
    if (dat) {
      Toast.show('success', 'Token Verification Successfull.');
    }

    return true;
  } catch (error) {
    Toast.show('error', 'Token created but not verified.');
    return true;
  }
}
