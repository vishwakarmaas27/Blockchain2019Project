import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.css';
import {Block,Blockchain,currentTimeStamp} from './Blockchain';

//Multiple Blockchains code
let myBlockchain;
let Blockchains=[];

function createNewBlockchain()
{
  Blockchains.push(new Blockchain());
}


class Main extends React.Component
{
  render()
  {
    return(
      <div className="App">
        <header className="App-header">
          <img id="logo" className="Applogo" src={logo} alt="logo" height="45px" width="45px"/>
          <h2>  Blockchain Project Playground  </h2>
        </header>

        <div className="Page">
          <MainPage />
          <br/>
          <br/>
        </div>

        <footer className="App-footer">
          <p>Made By: Shivam Vishwakarma <br/> Blockchain_Project, 2019</p>
        </footer>
      </div>
    );
  }
}

class MainPage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      mainpage: false,
    }
    this.handleStart=this.handleStart.bind(this);
  }

  handleStart()
  {
    this.setState({mainpage:true});
    createNewBlockchain();
    myBlockchain=Blockchains[Blockchains.length -1];
  }

  render()
  {
    if(this.state.mainpage==false)
    {
      return(
        <div className="Page1-Content">
          <br/>
          <div className="centre"><h2>This is the Blockchain Playground!</h2></div>
          <br/>
          <p>This Playground is basically designed to demonstrate the basic functioning of Blockchain. </p>
          <p>You can create a blockchain for multiple products using this playground and Add multiple transaction updates of the product (For eg. Entries of transactions that are performed in Supply Chain Management) and see how the Public Ledger which is interally maintained by the application gets automatically updated in real-time.</p>
          <p>This Blockchain Playground uses Proof of Work (Consensus Algorithm) to Verify if a Node can be added to the chain or not.</p>
          <p>You can also verify if your Blockchain is Valid or not, If it has been tampered with then automatically the Validity check shall return a Message as Invalid Chain.</p>
          <p>So Let's start with the creation of Blockchain for a Product.</p>
          <div className="centre"><button id="button3" className="button" onClick={this.handleStart}> Create Blockchain for the Product</button></div>
        </div>
      );
    }
    else
    {
        return ( 
          <div>
            <AppMain />
          </div> 
        );
    }
  }

}

class AppMain extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      text: JSON.stringify(myBlockchain,null,4)  ,
      valid: myBlockchain.isChainValid() ? "Yes!" : "No!"
    };
    this.handleTransaction=this.handleTransaction.bind(this);
    this.handleAddBlockchain=this.handleAddBlockchain.bind(this);
    this.handleBlockchainSelect=this.handleBlockchainSelect.bind(this);
  }

  addOptionToBlockchainDropdown()
  {
    let newOption=document.createElement("option");
    let node=document.createTextNode(Blockchains[Blockchains.length-1].blockchainName);
    newOption.appendChild(node);
    document.getElementById("BlockchainDropdown").appendChild(newOption);
  }

  handleAddBlockchain()
  {
    createNewBlockchain();
    this.addOptionToBlockchainDropdown();
    console.log("Added: "+Blockchains[Blockchains.length - 1]);
    myBlockchain=Blockchains[0];
  }

  handleBlockchainSelect(e)
  {
    let name=e.target.value.toString();
    for(let i=0;i<Blockchains.length;i++)
    {
      if(Blockchains[i].blockchainName === name)
      {
        myBlockchain=Blockchains[i];
        console.log(myBlockchain);
        break;
      }
    }
    this.setState({text: JSON.stringify(myBlockchain,null,4) , valid: myBlockchain.isChainValid() ? "Yes!" : "No!" });
  }

  handleTransaction()
  {
      var varloc=prompt("Product's Current Location: ");
      var varstatus=prompt("Product's Current Status: ");
      if( (varloc!=null && varloc!="") && (varstatus!=null && varstatus!="") )
          myBlockchain.addBlock(new Block( currentTimeStamp(),{loc: varloc , status: varstatus } ));
      this.setState({text: JSON.stringify(myBlockchain,null,4) , valid: myBlockchain.isChainValid() ? "Yes!" : "No!" });
      console.log("Chain Valid: "+myBlockchain.isChainValid());
  }

  render()
  {
    return(
      
      <div className="App-data">

            <br />
            <h3>A] Select a Product to view it's Ledger: </h3>
            <select id="BlockchainDropdown" onChange={this.handleBlockchainSelect}>
                <option id="b1" value={Blockchains[0].blockchainName}>{Blockchains[0].blockchainName}</option>
            </select>
            <br />
            <button id="button1" className="button" onClick={this.handleAddBlockchain}> + Add Another Product</button>
            
            <br/>
            <br/>
            <h3>B] Update Product's Status: </h3>
            <button id="button2" className="button" onClick={this.handleTransaction}> + Add an Update </button>
            
            <br/>
            <br/>
            <h3>C] {myBlockchain.blockchainName}'s Public Ledger: </h3>
            <textarea id="Chain" value={this.state.text} cols={100} rows={35} autoFocus/>
            
            <br/>
            <br/>
            <h3>D] Validity of Chain:</h3>
            <p id="ChainStatus">Is the Chain Valid? : {this.state.valid}</p>
 
        </div>

    );
  }
}


export default Main;