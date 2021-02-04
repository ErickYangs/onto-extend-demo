export const findAbiParamter = (arr:Array<any> = [], a: string, b: string, a1: string, b1: string) => {
  return arr.find(item => item[a] === a1 && item[b] === b1)
}

export const comptrollerAddress = '0x41ccb8431E892467C800C970BE816BAC9a068e6d';

// underlying token / OToken
// ctoken / FToken

export const tokenDemo1 = {
  type: 'ERC20',
  OToken: '0xd193Ef1e33e5Fd381e6A090B2E46437cC2cda446',
  FToken: '0xE8A0d328563606C44C086Db01481D33e7EbF81E6'
}

export const tokenDemo2 = {
  type: 'ERC20',
  OToken: '0x1a3b96772037522583E101699931A85dFB4252Bd',
  FToken: '0xF0b81e821300f235FEa58D364d4Fe689Ad760902'
}
