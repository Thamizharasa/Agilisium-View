import React from 'react';


class WalletList extends React.Component
{
    constructor()
    {
      super();
    }

    render()
    {

        return(
            <div>
            {this.props.Walletlst!==undefined  ? <ul style={{listStyleType:"none"}}>  { (this.props.Walletlst||[]).map((Wallet,index)=><li key={index}>{Wallet.WalletDate +" || "+  Wallet.Description+" || "+  Wallet.Type +" || "+Wallet.Amount} <button name="removeTask" onClick={event=>this.props.delete(Wallet._id)}>Delete</button> <button name="Edit" onClick={event=>this.props.Edit(Wallet)}>Edit</button></li>)} </ul> :<h1>No Wallet Found</h1>}
            </div>
                         
        )
    }
}

export default WalletList;