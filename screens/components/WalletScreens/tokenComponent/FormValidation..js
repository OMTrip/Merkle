export const validateFieldStandard = (standards,setErrors) => {
    const newErrors = {};

    if (!standards.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!standards.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!standards.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(standards.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    }else if (!Number.isInteger(Number(standards.decimal))) {
      newErrors.decimal = 'Decimals must be in Integer';
    }

    if (!standards.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (isNaN(standards.tokensupply)) {
      newErrors.tokensupply = 'Total Supply must be a number';
    }else if (!Number.isInteger(Number(standards.tokensupply))) {
      newErrors.tokensupply = 'Token Supply must be in Integer';
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };

 export const validateFieldsLiquidity = (liquiditygenerators,setErrors) => {
    const newErrors = {};

    if (!liquiditygenerators.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!liquiditygenerators.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!liquiditygenerators.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(liquiditygenerators.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    }else if (!Number.isInteger(Number(liquiditygenerators.decimal))) {
      newErrors.decimal = 'Decimals must be in Integer';
    }

    if (!liquiditygenerators.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (
      isNaN(
        liquiditygenerators.tokensupply
      ) &&
      !Number.isInteger(Number(liquiditygenerators.tokensupply))
    ) {
      newErrors.tokensupply = 'Total Supply must be a non-decimal Number.';
    }

    if (
      !liquiditygenerators.maxtransactionamounts ||
      isNaN(liquiditygenerators.maxtransactionamounts)
    ) {
      newErrors.maxtransactionamounts =
        'Max Transaction Amount must be a number';
    }else if(!Number.isInteger(Number(liquiditygenerators.maxtransactionamounts))){
      newErrors.maxtransactionamounts =
        'Max Transaction Amount must be a Integer';
    }

    if (!liquiditygenerators.marketinguser) {
      newErrors.marketinguser = 'Marketing User is required';
    }else if(!liquiditygenerators.marketinguser.startsWith('0x')){
      newErrors.marketinguser = 'Marketing User is invalid.';
    }

    if (!liquiditygenerators.marketingtaxperc) {
      newErrors.marketingtaxperc = 'Marketing User (%) is required';
    } else if (isNaN(liquiditygenerators.marketingtaxperc)) {
      newErrors.marketingtaxperc = 'Marketing User (%) must be a number';
    }else if(!Number.isInteger(Number(liquiditygenerators.marketingtaxperc))){
      newErrors.marketingtaxperc =
        'Marketing User (%) must be a Integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  export const validateFieldsSafemoon = (safemoons,setErrors) => {
    const newErrors = {};

    if (!safemoons.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!safemoons.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!safemoons.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(safemoons.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    }else if(!Number.isInteger(Number(safemoons.decimal))){
      newErrors.decimal = 'Decimals must be a integer';
    }

    if (!safemoons.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (
      isNaN(safemoons.tokensupply) ||
      !Number.isInteger(Number(safemoons.tokensupply))
    ) {
      newErrors.tokensupply = 'Total Supply must be a non-decimal number';
    }

    if (!safemoons.taxfeesperc) {
      newErrors.taxfeesperc = 'Tax fees are required';
    } else if (isNaN(safemoons.taxfeesperc)) {
      newErrors.taxfeesperc = 'Tax fees must be a number';
    }else if(!Number.isInteger(Number(safemoons.taxfeesperc))){
      newErrors.taxfeesperc = 'Tax fees must be a integer';

    }

    if (!safemoons.liquidityfeesperc) {
      newErrors.liquidityfeesperc = 'Liquidity fees are required';
    } else if (isNaN(safemoons.liquidityfeesperc)) {
      newErrors.liquidityfeesperc = 'Liquidity fees must be a number';
    }else if(!Number.isInteger(Number(safemoons.liquidityfeesperc))){
      newErrors.liquidityfeesperc = 'Liquidity fees must be a integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  export const validateFieldsDynamic = (dynamics,setErrors) => {
    const newErrors = {};

    if (!dynamics.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!dynamics.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!dynamics.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (!Number.isInteger(Number(dynamics.decimal))) {
      newErrors.decimal = 'Decimals must be an integer';
    }

    if (!dynamics.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (!Number.isInteger(Number(dynamics.tokensupply))) {
      newErrors.tokensupply = 'Total Supply must be an integer';
    } else if (Number(dynamics.tokensupply) > Number(dynamics.cappedsupply)) {
      newErrors.tokensupply = 'Total Supply Should be less than capped supply.';
    }

    if (!dynamics.cappedsupply) {
      newErrors.cappedsupply = 'Capped Supply is required.';
    }else if (isNaN(dynamics.tokensupply)) {
      newErrors.cappedsupply = 'Capped Supply must be an number';
    }
    else if (!Number.isInteger(Number(dynamics.tokensupply))) {
      newErrors.cappedsupply = 'Capped Supply must be an integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  export const validateFieldsMarketing = (marketingtaxs,setErrors) => {
    const newErrors = {};

    if (!marketingtaxs.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!marketingtaxs.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!marketingtaxs.decimal || isNaN(marketingtaxs.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.decimal))){
      newErrors.decimal = 'Decimals must be a integer';
    }

    if (!marketingtaxs.tokensupply || isNaN(marketingtaxs.tokensupply)) {
      newErrors.tokensupply = 'Total Supply must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.tokensupply))){
      newErrors.tokensupply = 'Decimals must be a integer';
    }

    if (!marketingtaxs.marketinguser) {
      newErrors.marketinguser = 'Marketing User is required';
    }else if(!marketingtaxs.marketinguser.startsWith('0x')){
      newErrors.marketinguser = 'Marketing User is invalid';
    }

    if (!marketingtaxs.buytaxperc || isNaN(marketingtaxs.buytaxperc)) {
      newErrors.buytaxperc = 'Buy Tax (%) must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.buytaxperc))){
      newErrors.selltaxperc = 'Buy Tax (%) must be a integer';
    }

    if (!marketingtaxs.selltaxperc || isNaN(marketingtaxs.selltaxperc)) {
      newErrors.selltaxperc = 'Sell Tax (%) must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.selltaxperc))){
      newErrors.selltaxperc = 'Sell Tax (%) must be a integer';
    }

    if (
      !marketingtaxs.maxtransactionperc ||
      isNaN(marketingtaxs.maxtransactionperc)
    ) {
      newErrors.maxtransactionperc = 'Max Transaction (%) must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.maxtransactionperc))){
      newErrors.maxtransactionperc = 'Max Transaction (%) must be a integer';
    }

    if (!marketingtaxs.maxuserperc || isNaN(marketingtaxs.maxuserperc)) {
      newErrors.maxuserperc = 'Max User (%) must be a number';
    }else if(!Number.isInteger(Number(marketingtaxs.maxuserperc))){
      newErrors.maxuserperc = 'Max User (%) must be a integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  export const validateFieldsSmartTax = (smarttaxs,setErrors) => {
    const newErrors = {};

    if (!smarttaxs.tokenreward) {
      newErrors.tokenreward = 'Reward Token is required';
    } else if (!smarttaxs.tokenreward.startsWith('0x')) {
      newErrors.tokenreward = 'Provide valid token address.';
    }

    if (!smarttaxs.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!smarttaxs.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!smarttaxs.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(smarttaxs.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    } else if (Number.isInteger(Number(smarttaxs.decimal))) {
      newErrors.decimal = 'Decimals must be a Integer.';
    }

    if (!smarttaxs.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (isNaN(smarttaxs.tokensupply)) {
      newErrors.tokensupply = 'Total Supply must be a number';
    }
    else if (!Number.isInteger(Number(smarttaxs.tokensupply))) {
      newErrors.tokensupply = 'Total Supply must be an integer';
    }

    // if (checked1) {
    if (!smarttaxs.maxuserperc) {
      newErrors.maxuserperc = 'Max User (%) is required';
    } else if (isNaN(smarttaxs.maxuserperc)) {
      newErrors.maxuserperc = 'Max User (%) must be a number';
    } else if (!Number.isInteger(Number(smarttaxs.maxuserperc))) {
      newErrors.maxuserperc = 'Max User (%) must be an integer';
    }

    // }

    // if (checked2) {
    if (!smarttaxs.maxtransactionamount) {
      newErrors.maxtransactionamount = 'Max Transaction Amount is required';
    } else if (isNaN(smarttaxs.maxtransactionamount)) {
      newErrors.maxtransactionamount =
        'Max Transaction Amount must be a number';
    } else if (!Number.isInteger(Number(smarttaxs.maxtransactionamount))) {
      newErrors.maxtransactionamount = 'Max Transaction Amount must be an integer';
    }
    // }

    if (!smarttaxs.marketinguser) {
      newErrors.marketinguser = 'Marketing User is required';
    }else if(!smarttaxs.marketinguser.startsWith('0x')){
      newErrors.marketinguser = 'Marketing User is invalid.';
    }

    if (!smarttaxs.marketinguserperc) {
      newErrors.marketinguserperc = 'Marketing User (%) is required';
    } else if (isNaN(smarttaxs.marketinguserperc)) {
      newErrors.marketinguserperc = 'Marketing User (%) must be a number';
    } else if (!Number.isInteger(Number(smarttaxs.maxtransactionamount))) {
      newErrors.marketinguserperc = 'Marketing User (%) must be an integer';
    }

    if (!smarttaxs.liquidityfeesperc) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) is required';
    } else if (isNaN(smarttaxs.liquidityfeesperc)) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) must be a number';
    }else if (!Number.isInteger(Number(smarttaxs.liquidityfeesperc))) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) must be an integer';
    }

    if (!smarttaxs.taxfeesperc) {
      newErrors.taxfeesperc = 'Tax Fees (%) is required';
    } else if (isNaN(smarttaxs.taxfeesperc)) {
      newErrors.taxfeesperc = 'Tax Fees (%) must be a number';
    }else if (!Number.isInteger(Number(smarttaxs.taxfeesperc))) {
      newErrors.taxfeesperc = 'Tax Fees (%) must be an integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  export const validateFieldsReward = (rewardtokens,setErrors) => {
    const newErrors = {};

    if (!rewardtokens.tokenreward) {
      newErrors.tokenreward = 'Reward Token is required';
    } else if (!rewardtokens.tokenreward.startsWith('0x')) {
      newErrors.tokenreward = 'Provide a valid token address';
    }

    if (!rewardtokens.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!rewardtokens.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!rewardtokens.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(rewardtokens.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    } else if (!Number.isInteger(Number(rewardtokens.decimal))) {
      newErrors.decimal = 'Decimals must be an integer';
    }

    if (!rewardtokens.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (isNaN(rewardtokens.tokensupply)) {
      newErrors.tokensupply = 'Total Supply must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.tokensupply))) {
      newErrors.tokensupply = 'Total Supply must be an integer';
    }

    if (!rewardtokens.minimumholds) {
      newErrors.minimumholds = 'Minimum Hold is required';
    } else if (isNaN(rewardtokens.minimumholds)) {
      newErrors.minimumholds = 'Minimum Hold must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.minimumholds))) {
      newErrors.minimumholds = 'Minimum Hold must be an integer';
    }

    if (!rewardtokens.marketinguser) {
      newErrors.marketinguser = 'Marketing User is required';
    }else if (!rewardtokens.marketinguser.startsWith('0x')) {
      newErrors.marketinguser = 'Provide a valid Marketing User';
    }

    if (!rewardtokens.marketingfeeperc) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) is required';
    } else if (isNaN(rewardtokens.marketingfeeperc)) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.marketingfeeperc))) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) must be an integer';
    }

    if (!rewardtokens.rewardfeeperc1) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) is required';
    } else if (isNaN(rewardtokens.rewardfeeperc1)) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.rewardfeeperc1))) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) must be an integer';
    }

    if (!rewardtokens.liquidityfeesperc) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) is required';
    } else if (isNaN(rewardtokens.liquidityfeesperc)) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.liquidityfeesperc))) {
      newErrors.liquidityfeesperc = 'Liquidity Fees (%) must be an integer';
    }

    if (!rewardtokens.extrasellfeesperc) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) is required';
    } else if (isNaN(rewardtokens.extrasellfeesperc)) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) must be a number';
    }else if (!Number.isInteger(Number(rewardtokens.extrasellfeesperc))) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) must be an integer';
    }

    if (!rewardtokens.rewardtoholder) {
      newErrors.rewardtoholder = 'Reward to Holders is required';
    }else if (!rewardtokens.rewardtoholder.startsWith('0x')) {
      newErrors.rewardtoholder = 'Provide a valid Marketing User';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  export const validateFieldsProMax = (promaxs,setErrors) => {
    const newErrors = {};

    if (!promaxs.tokenname) {
      newErrors.tokenname = 'Name is required';
    }

    if (!promaxs.tokensymbol) {
      newErrors.tokensymbol = 'Symbol is required';
    }

    if (!promaxs.decimal) {
      newErrors.decimal = 'Decimals are required';
    } else if (isNaN(promaxs.decimal)) {
      newErrors.decimal = 'Decimals must be a number';
    } else if (!Number.isInteger(Number(promaxs.decimal))) {
      newErrors.decimal = 'Decimals must be an integer';
    }

    if (!promaxs.tokensupply) {
      newErrors.tokensupply = 'Total Supply is required';
    } else if (isNaN(promaxs.tokensupply)) {
      newErrors.tokensupply = 'Total Supply must be a number';
    }else if (!Number.isInteger(Number(promaxs.tokensupply))) {
      newErrors.tokensupply = 'Total Supply must be an integer';
    }

    if (!promaxs.minimumholds) {
      newErrors.minimumholds = 'Minimum Hold is required';
    } else if (isNaN(promaxs.minimumholds)) {
      newErrors.minimumholds = 'Minimum Hold must be a number';
    }else if (!Number.isInteger(Number(promaxs.minimumholds))) {
      newErrors.minimumholds = 'Minimum Hold must be an integer';
    }

    if (!promaxs.marketinguser) {
      newErrors.marketinguser = 'Marketing User is required';
    }else if (!promaxs.marketinguser.startsWith('0x')) {
      newErrors.marketinguser = 'Provide a valid Marketing User';
    }

    if (!promaxs.marketingfeeperc) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) is required';
    } else if (isNaN(promaxs.marketingfeeperc)) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) must be a number';
    }else if (!Number.isInteger(Number(promaxs.marketingfeeperc))) {
      newErrors.marketingfeeperc = 'Marketing Fees (%) must be an integer';
    }

    if (!promaxs.rewardfeeperc1) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) is required';
    } else if (isNaN(promaxs.rewardfeeperc1)) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) must be a number';
    }else if (!Number.isInteger(Number(promaxs.rewardfeeperc1))) {
      newErrors.rewardfeeperc1 = 'Reward Fees (%) must be an integer';
    }

    if (!promaxs.liquidityfeeperc) {
      newErrors.liquidityfeeperc = 'Liquidity Fees (%) is required';
    } else if (isNaN(promaxs.liquidityfeeperc)) {
      newErrors.liquidityfeeperc = 'Liquidity Fees (%) must be a number';
    }else if (!Number.isInteger(Number(promaxs.liquidityfeeperc))) {
      newErrors.liquidityfeeperc = 'Liquidity Fees (%) must be an integer';
    }

    if (!promaxs.extrasellfeesperc) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) is required';
    } else if (isNaN(promaxs.extrasellfeesperc)) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) must be a number';
    }else if (!Number.isInteger(Number(promaxs.extrasellfeesperc))) {
      newErrors.extrasellfeesperc = 'Extra Sell Fees (%) must be an integer';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };