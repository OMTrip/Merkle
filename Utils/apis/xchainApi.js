import axios from 'axios';
import {fetch} from 'whatwg-fetch';

const api = 'http://192.168.1.18:3000';

export async function getAllChain() {
  try {
    const response = await fetch(api + '/chains');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "error::: api");
    return [];
  }
}
export async function getChain(chainId) {
    try {
      const data = await fetch(api+'/chains?chainId='+chainId);
      return await data.json();
    } catch (error) {
      return [];
    }
  }
  export async function getAllPair() {
    try {
      const data = await fetch(api+'/pairs');
      return await data.json();
    } catch (error) {
      return [];
    }
  }
  export async function getAllTokens() {
    try {
      const data = await fetch(api+'/tokens');
      return await data.json();
    } catch (error) {
      return [];
    }
  }