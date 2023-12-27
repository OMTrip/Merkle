import {useSelector} from 'react-redux';
import {
  cutAfterDecimal,
  formatDateFromTimestamp,
} from '../../../Utils/web3/helperFunction';
export const ConfirmTransactionHtml = (
  data,
  extras,
  MerklePrice,
  BsbtPrice,
  BubtPrice,
  BtycPrice,
  MBtycPrice,
) => {
  const {
    blockNumber,
    chain,
    from,
    hash,
    functionName,
    methodId,
    value,
    txreceipt_status,
    symbol,
    timeStamp,
    gasPrice,
    gas,
  } = data;
  const {current_price, slug} = extras;

  function calculateGasValue(gas, symbol, currentPrice) {
    return (
      (Number(gas) / 10 ** 9) *
      (symbol === 'MRK'
        ? MerklePrice
        : currentPrice || symbol === 'BTYC'
        ? BtycPrice
        : currentPrice || symbol === 'BSBT'
        ? BsbtPrice
        : currentPrice || symbol === 'BUBT'
        ? BubtPrice
        : currentPrice || symbol === 'mBTYC'
        ? MBtycPrice
        : currentPrice)
    );
  }
  const calculateValue = (value, symbol, extras) => {
    const getPrice = symbol => {
      switch (symbol) {
        case 'MRK':
          return MerklePrice;
        case 'BTYC':
          return BtycPrice;
        case 'BSBT':
          return BsbtPrice;
        case 'BUBT':
          return BubtPrice;
        case 'mBTYC':
          return MBtycPrice;
        default:
          return extras?.current_price;
      }
    };

    const price = getPrice(symbol);

    if (data.is_erc20) {
      return cutAfterDecimal(
        (Number(data?.logs?.value) / 10 ** Number(extras?.decimals)) * price,
        5,
      );
    } else {
      return (Number(data?.value) / 10 ** Number(extras?.decimals)) * price;
    }
  };
  return `<!DOCTYPE html>
    <html>
    <head>
        <style>
            /* Container Styles */
            .container {
                font-family: Arial, sans-serif;
                background-color: #f3f4f7;
                padding: 20px;
                max-width: 800px; /* Set a maximum width for content */
                margin: 0 auto; /* Center content on larger screens */
            }
    
            /* Header Styles */
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
    
            .back-button {
                font-size: 25px;
                color: #444;
            }
    
            .back-button:hover {
                cursor: pointer;
            }
    
            .title {
                font-size: 24px;
                font-weight: 600;
                color: #444;
                text-align:center;
            }
    
            /* Transaction Card Styles */
            .transaction-card {
                background-color: #fff;
                padding: 20px;
                border-radius: 6px;
                margin-top: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
    
            /* Transaction Info Styles */
            .transaction-info {
                display: flex;
                justify-content: space-between; /* Justify between labels and values */
                margin-bottom: 20px;
            }
    
            .info-label {
                font-size: 18px;
                font-weight: 600;
                color: #444;
            }
    
            .info-value {
                font-size: 18px;
                color: #888;
                margin-top: 5px;
                text-align: right; /* Align the value to the right */
            }
    
            /* View on Block Explorer Styles */
            .block-explorer-link {
                color: #007bff; /* Blue link color */
                font-size: 18px;
                text-decoration: none;
                margin-top: 20px;
                display: inline-block;
                transition: color 0.2s;
            }
    
            .block-explorer-link:hover {
                color: #0056b3; /* Darker blue on hover */
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="title">Transaction Details</div>
            </div>
            <div class="transaction-card">
                <div class="transaction-info">
                    <div class="info-label">Value</div>
                    <div class="info-value">${
                      data.is_erc20
                        ? cutAfterDecimal(
                            Number(data?.logs?.value) /
                              10 ** Number(extras?.decimals),
                            5,
                          )
                        : cutAfterDecimal(
                            Number(data.value) / 10 ** Number(extras?.decimals),
                            5,
                          )
                    } ${extras.symbol}</div>
                </div>
                <div class="transaction-info">
                    <div class="info-label">Approximate Value</div>
                    <div class="info-value">$${calculateValue(
                      data.value,
                      extras.symbol,
                      extras,
                    )}</div>
                </div>
                <div class="transaction-info">
                    <div class="info-label">Date</div>
                    <div class="info-value">${formatDateFromTimestamp(
                      timeStamp,
                    )}</div>
                </div>
                <div class="transaction-info">
                    <div class="info-label">Status</div>
                    <div class="info-value">${
                      txreceipt_status === '1' ? 'Completed' : 'Failed'
                    }</div>
                </div>
                <div class="transaction-info">
                    <div class="info-label">Sender</div>
                    <div class="info-value">${from?.slice(
                      0,
                      8,
                    )}...${from?.slice(-6)}</div>
                </div>
                <div class="transaction-info">
                    <div class="info-label">Network Fee</div>
                    <div class="info-value">${cutAfterDecimal(
                      Number(gas) / 10 ** Number(9),
                      5,
                    )} ${symbol}</div>
                </div>
                <div class="info-value">
                ($${calculateGasValue(
                  gas,
                  extras.symbol,
                  extras.current_price,
                )?.toFixed(2)})
                </div>
             
            </div>
        </div>
    </body>
    </html>
    
    `;
};
