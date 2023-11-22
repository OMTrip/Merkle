import axios from 'axios';
import { fetch } from "whatwg-fetch"

export const auditTemplate = async (address, platform, type,jsonData) => {
  // const apiEndpoint = `https://solidityscan.com/app/api-quick-scan-sse/?contract_address=${address}&contract_platform=${platform === 'bsc_testnet' ? 'bscscan' : platform}&contract_chain=${type}`;

  // Fetch data from the API
  try {
    // const response = await axios.get(apiEndpoint);
    // const jsonData = response.data;

  

    const template = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
  
        .container {
          max-width: 800px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
  
        .issue {
          border: 1px solid #ccc;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
  
        .issue h2 {
          font-size: 20px;
          margin-top: 0;
        }
  
        .issue-description {
          margin-top: 10px;
          font-size: 16px;
        }
  
        .issue-status {
          margin-top: 10px;
          font-weight: bold;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Scan Report</h1>
          <p><strong>Compiler Version:</strong> <span id="compiler-version">${jsonData.scan_report.compilerversion}</span></p>
          <p><strong>Contract Address:</strong> <span id="contract-address">${jsonData.scan_report.contract_address}</span></p>
          <p><strong>Contract Chain:</strong> <span id="contract-chain">${jsonData.scan_report.contract_chain}</span></p>
          <p><strong>Contract Platform:</strong> <span id="contract-platform">${jsonData.scan_report.contract_platform}</span></p>
          <p><strong>Currency:</strong> <span id="currency">${jsonData.scan_report.currency}</span></p>
          <p><strong>License Type:</strong> <span id="license-type">${jsonData.scan_report.licensetype}</span></p>

          <h2>Quick File Scan Details</h2>
          <div id="quick-scan-details">
            ${jsonData.scan_report.quick_file_scan_details.map(detail => `
              <div class="issue">
                <h2>${detail.issue_name}</h2>
                <p class="issue-description">${detail.issue_description}</p>
                <p class="issue-status">Issue Status: ${detail.issue_status?.toUpperCase()}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
    </html>
  `;

    return template;

  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};






