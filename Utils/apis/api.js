import axios from 'axios';
import { fetch } from "whatwg-fetch"
import {uniqueNumber} from '../web3/helperFunction';
const api_key = 'b8627f-52b6f9-0167e4-dc88fc-8d40fa';
const token = 'bc6d9f-7828b8-6792ac-aef9b2-e17b37';
const api = 'https://www.kwikapi.com/api/v2/';
const transferValidate =
  'https://www.kwikapi.com/app_v1_5/Services/Dmt/expressController.php';
const cmc_api_key = 'b96c35d0-d0cb-4d75-8843-0f5fec332a3f';
const onMetaKey = 'a2410220-5fd6-46a0-bf21-872ad1646dca'

export async function circleCode() {
  try {
    const response = await fetch(`${api}circle_codes.php?api_key=${api_key}`, {
      method: 'GET',
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error; // You can handle the error further up the call stack
  }
}

// export async function operatorCode() {
//   try {
//     const response = await fetch(
//       `${api}operator_codes.php?api_key=${api_key}`,
//       {
//         method: 'GET',
//         redirect: 'follow',
//       },
//     );
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const result = await response.text();
//     return result;
//   } catch (error) {
//     console.log('Error:', error);
//     throw error;
//   }
// }

export async function operatorCode() {
  try {
    const response = await axios.get(`${api}operator_codes.php?api_key=${api_key}`);
    
    if (!response.data) {
      throw new Error('Network response was not ok');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


export async function OperatorCircle(phoneNumber) {
  const url = api + 'operator_fetch.php';

  const formData = new FormData();
  formData.append('api_key', api_key);
  formData.append('number',phoneNumber);

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}






export async function fetchPlan(circle, operator) {
  console.log(circle, operator, 'circle, operator');

  const myHeaders = new Headers();

  const formdata = new FormData();
  formdata.append('api_key', api_key);
  formdata.append('state_code', circle);
  formdata.append('opid', operator);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  try {
    const response = await fetch(api + 'recharge_plans.php', requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function rechargePlans() {
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append('api_key', 'Api Key');
  formdata.append('state_code', 'circle code');
  formdata.append('opid', 'Operator Code');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch(api + 'recharge_plans.php', requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
}

export async function currencyPriceInInr(crypto_symbol) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto_symbol}&vs_currencies=inr`,
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export async function getCryptoPriceInINR(cryptoSymbol) {
  // console.log(cryptoSymbol,"cryptoSymbolcryptoSymbol");
  try {
    if (cryptoSymbol?.length > 0) {
      const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=INR`;

      // Set up the request headers with your API key
      const headers = {
        'X-CMC_PRO_API_KEY': cmc_api_key,
      };

      // Make the API request
      const response = await axios.get(apiUrl, {headers});

      if (response.status === 200) {
        // console.log(response,"data")
        const data =
          response?.data.data[cryptoSymbol?.toUpperCase()].quote['INR'].price;

        return data;
      } else {
        throw new Error('Error fetching data from CoinMarketCap API');
      }
    } else {
      return 0;
    }
  } catch (error) {
    console.log('cmc error', error);
    throw error;
  }
}

export async function makeRechargeRequest({
  number,
  amount,
  opid,
  stateCode,
  orderId,
}) {
  console.log(
    number,
    amount,
    opid,
    stateCode,
    orderId,
    'number, amount, opid, stateCode, orderId',
  );

  try {
    const url = `https://www.kwikapi.com/api/v2/recharge.php?api_key=${api_key}&number=${number}&amount=${amount}&opid=${opid}&state_code=${stateCode}&order_id=${orderId}`;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result;
    // return {
    //  status:"SUCCESS",
    //  order_id:"36573475787587"
    // }
  } catch (error) {
    console.error('paymentError:::', error);
    return false;
  }
}

export async function validateBill(
  number,
  opt2,
  amount,
  opid,
  order_id,
  mobile,
) {
  const apiUrl = api + 'bills/validation_v2_2.php';
  const apiUrlWithParams = `${apiUrl}?api_key=${api_key}&number=${number}&amount=${amount}&opt2=${opt2}&opid=${opid}&order_id=${order_id}&mobile=${mobile}`;
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(apiUrlWithParams, requestOptions);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Request Error:', error);
  }
}

function generateUniqueNumber(account, number) {
  const accountDigits = account.toString().slice(0, 4);
  const numberDigits = number.toString().slice(0, 4);

  const randomDigits = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

  const uniqueNumber = accountDigits + numberDigits + randomDigits;

  return uniqueNumber;
}

export async function validateBankAccount(account, number, ifsc) {
  try {
    const uniqueNumber = generateUniqueNumber(account, number);

    const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('account', account);
    formData.append('number', number);
    formData.append('ifsc', ifsc);
    formData.append('order_id', uniqueNumber);

    const response = await fetch(api + 'dmt/account_validate', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
}

export async function transferFund(account, number, ifsc, name, amount) {
  console.log(
    account,
    number,
    ifsc,
    name,
    amount,
    'account, number, ifsc, name,amount',
  );
  const uniqueNumber = generateUniqueNumber(account, number);

  try {
    const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('account_no', account);
    formData.append('order_id', uniqueNumber);
    formData.append('ifsc_code', ifsc);
    formData.append('bene_name', name);
    formData.append('amount', amount);
    const response = await fetch(api + 'payments/index.php', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
}

export async function billFetch(number, opid, amount, dob, mobile) {
  const unique = uniqueNumber(number, mobile);

  const url = api + 'bills/payments_v2_2.php';
  const formData = new FormData();

  formData.append('number', number);
  formData.append('api_key', api_key);
  formData.append('opid', opid);
  formData.append('amount', amount);
  formData.append('order_id', unique);
  formData.append('opt2', opt2);
  formData.append('mobile', mobile);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function fetchAssetData() {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/assets-main/assets-main/assets.json',
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch JSON data. Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null; // You can return a specific value or handle the error as needed
  }
}

export async function fetchChainData() {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/OMTrip/merkle_wallet/main/Chains-main/Chains-main/chain.json',
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch JSON data. Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null; // You can return a specific value or handle the error as needed
  }
}

// Function to fetch title and description from a website URL
export async function fetchWebsiteInfo(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const title = doc.querySelector('title').textContent;

      const metaDescription = doc.querySelector('meta[name="description"]');
      const description = metaDescription
        ? metaDescription.getAttribute('content')
        : '';

      return {title, description};
    });
}

export async function fetchAllCryptos() {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': cmc_api_key,
        },
      },
    );

    if (response.status === 200) {
      const data = response.data.data;
      // Iterate through data to get cryptocurrency names and prices in USD
      const d = data.map(crypto => {
        // const id = crypto.platform ? crypto.platform.id : '';
        const name = crypto.name;
        const symbol = crypto.symbol;
        const current_price = crypto.quote.USD.price;
        // const slug = crypto.platform ? crypto.platform.slug : '';
        // const token_address = crypto.platform
        //   ? crypto.platform.token_address
        //   : '';
        const price_change_percentage_24h = crypto.quote.USD.percent_change_24h;
        const fully_diluted_market_cap =
          crypto.quote.USD.fully_diluted_market_cap;
        const percent_change_7d = crypto.quote.USD.percent_change_7d;
        const percent_change_1h = crypto.quote.USD.percent_change_1h;
        const volume_24h = crypto.quote.USD.percent_change_1h;
        const volume_change_24h = crypto.quote.USD.volume_change_24h;
        const image = crypto?.id
          ? `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
          : '';

           // token_address,

        // console.log({id,name,symbol,usd,slug,percent_change_24h,fully_diluted_market_cap,token_address,percent_change_7d,percent_change_1h,percent_change_1h,volume_24h,volume_change_24h},"{name,symbol,usd:priceUsd,slug,percent_change_24h,fully_diluted_market_cap,token_address,percent_change_7d,percent_change_1h,percent_change_1h,volume_24h,volume_change_24h}")
      

        return {
           name,
        symbol,
          current_price,
          
          price_change_percentage_24h,
          fully_diluted_market_cap,
         
          percent_change_7d,
          percent_change_1h,
          percent_change_1h,
          volume_24h,
          volume_change_24h,
          image
        };
      });

      return d;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Error:', error.message);
    return [];
  }
}

export async function fetchTokenPrice(tokenSymbol) {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokenSymbol}&convert=USD`, {
      headers: {
        'X-CMC_PRO_API_KEY': cmc_api_key,
      },
    });

    if (response.status === 200) {
      const data = response.data.data[tokenSymbol];
      if (data) {
        const priceUsd = data.quote.USD.price;
        console.log(`The price of ${tokenSymbol} in USD is $${priceUsd} :::::::::::::::::::::::::::::::::::`);
        return priceUsd
      } else {
        console.warn(`Token ${tokenSymbol} not found.`);
        return 0;
      }
    } else {
      console.warn('Failed to fetch data:', response.statusText);
      return 0;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return 0;
  }
}

export async function loginUserOnMeta(email) {
  try {
    const response = await axios.post('https://stg.api.onmeta.in/v1/users/login', {
      email: email, // Replace 'String' with the actual email value
    }, {
      headers: {
        Accept: 'application/json',
        'x-api-key': onMetaKey, // Replace 'YourApiKey' with the actual API key
      },
    });

    console.log('Response Data:', response.data);
    return response.data
  } catch (error) {
    console.error('Error:', error);
    return null
  }
}

export async function refreshTokenOnMeta() {
  try {
    const response = await axios.get('https://stg.api.onmeta.in/v1/users/refresh-token', {
      headers: {
        Accept: 'application/json',
        'x-api-key': onMetaKey, // Replace 'string' with the actual API key value
        Authorization: 'string' // Replace 'string' with the actual authorization token
      }
    });

    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}


export async function accountLinkOnMeta() {
  try {
    const requestBody = {
      name: 'test',
      panNumber: 'test',
      email: 'test@onmeta.in',
      kycVerfied: true,
      phone: {
        countryCode: '+91',
        number: '1212121212'
      },
      bankDetails: {
        accountNumber: '131124',
        accountName: 'test',
        ifsc: 'IIEH12314',
        branchAddress: 'test'
      }
    };

    const response = await axios.post('https://stg.api.onmeta.in/v1/users/account-link', requestBody, {
      headers: {
        Accept: 'application/json',
        Authorization: 'string', // Replace 'string' with the actual authorization token
        'x-api-key': 'string' // Replace 'string' with the actual API key value
      }
    });

    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}

export async function getQuote() {
  try {
    const url = 'https://stg.api.onmeta.in/v1/quote/sell';
    
    const headers = {
      Accept: 'application/json',
      'x-api-key': 'string', // Replace 'string' with your API key
    };

    const data = {
      sellTokenSymbol: 'string',
      sellTokenAddress: 'string',
      chainId: Number, // Replace Number with the actual chain ID
      fiatCurrency: 'string',
      sellTokenAmount: Number, // Replace Number with the actual amount
      senderAddress: 'string',
    };

    const response = await axios.post(url, data, { headers });
    console.log('Response Data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function makeBuyQuoteRequest(buyTokenSymbol,chainId,fiatAmount,buyTokenAddress) {
  try {
    // Define the request data
    const requestData = {
      buyTokenSymbol: buyTokenSymbol,
      chainId: chainId,
      fiatCurrency: 'inr',
      fiatAmount: fiatAmount,
      // buyTokenAddress: buyTokenAddress,
    };

    // Define the Axios request configuration
    const axiosConfig = {
      method: 'POST',
      url: 'https://stg.api.onmeta.in/v1/quote/buy',
      headers: {
        Accept: 'application/json',
        'x-api-key': 'a2410220-5fd6-46a0-bf21-872ad1646dca', 
      },
      data: requestData,
    };

    // Make the Axios request
    const response = await axios(axiosConfig);

    // Handle the response data
    return response.data
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
}
export async function fetchOnMetaTokens() {
  try {
    const axiosConfig = {
      method: 'GET',
      url: 'https://stg.api.onmeta.in/v1/tokens/',
      headers: {
        Accept: 'application/json',
        'x-api-key': 'a2410220-5fd6-46a0-bf21-872ad1646dca',
      },
    };
    const response = await axios(axiosConfig);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error,"ERRRRRRRRRRRRRRR:::::::");
  }
}








