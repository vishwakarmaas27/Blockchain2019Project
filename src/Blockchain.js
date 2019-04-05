var SHA256=require("crypto-js/sha256");

export
 function currentTimeStamp(){
    return (new Date().toLocaleString());
}

export
 class Block
{
    constructor(timestamp, data, previousHash = '') 
    {
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash=this.calculateHash();
      this.nonce=0;
    }
    
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty)
    {
        //Keep changing the nonce value until the desired difficulty is achieved
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
          }
        console.log("Block mined, with Hash Value: "+this.hash+" Nonce: "+this.nonce);
    }
}

export
 class Blockchain
{
    constructor() 
    {
      this.blockchainName = this.getBlockchainName();
      this.difficulty = 1;
      this.chain = [this.createGenesisBlock()];    
    }

    createGenesisBlock()
    {
        return new Block("1/27/2019, 7:30:00 AM","Genesis Block - Blockchain created.", '0');
    }
    
    getBlockchainName()
    {
      let name=prompt("Enter Your Product Name: ");
      if(name != "" && name != null)
        return name;
      else
        return this.getBlockchainName();
    }

    addBlock(newBlock)
    {
        // The new block needs to point to the hash of the latest block on the chain.
        newBlock.previousHash = this.getLatestBlock().hash;
        // Calculate the hash of the new block, by mining the block
        newBlock.mineBlock(this.difficulty);
        // Now the block is ready and can be added to chain!
        this.chain.push(newBlock);
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        // Check if the Genesis block hasn't been tampered with by comparing the output of createGenesisBlock with the first block on our chain
        let realGenesis = JSON.stringify(this.createGenesisBlock());
    
        if (realGenesis !== JSON.stringify(this.chain[0])) {
          return false;
        }        
    
        // Check the remaining blocks on the chain to see if there hashes are correct
        for (let i = 2; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
    
          if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
          }
    
          if (currentBlock.previousHash !== previousBlock.calculateHash()) {
            return false;
          }
        }
    
        return true;
      }

}




   /* let myBlockchain = new Blockchain();
    myBlockchain.addBlock(new Block(currentTimeStamp(),{loc: "Mumbai" , status: "Shipment Loaded."}));
   /* myBlockchain.addBlock(new Block(currentTimeStamp(),{loc: "Aurangabad" , status: "Shipment In Transit."}));
    myBlockchain.addBlock(new Block(currentTimeStamp(),{loc: "Nagpur" , status: "Shipment Received"}));
    console.log(JSON.stringify(myBlockchain,null,4));
    console.log("Is the Chain Valid? "+ (myBlockchain.isChainValid() ? "Yes!" : "No!") );
*/