import Web3 from 'web3';

let node = 'http://172.168.3.227:8545'
class Dapp {

  async loadClient() {
    if (this.client) {
      return true;
    }
    this.client = new Web3(node || Web3.givenProvider);
  }

  static sendETHTransaction(params) {
    console.log("send");
    return new Promise((resolve, reject) => {
      this.client.eth
          .sendTransaction(params)
          .on("transactionHash", (res) => {
            console.log("res1", res);
            // @ts-ignore
            if (res.indexOf("0x") > -1) {
              resolve(res);
            } else {
              reject({
                err: res
              });
            }
          })
          .on("error", (err) => {
            console.log("err");
            console.log("err2", err);
            reject({
              err
            });
          });
    });
  }
}

const dapp = new Dapp();

export default dapp;
