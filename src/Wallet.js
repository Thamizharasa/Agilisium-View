import React from 'react';
import axios from 'axios';
import WalletList from './Walletlst';
import { Row, Col, Container,Box} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";



class Wallet extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            WalletDate :"",
            Description:" ",
            Type:"Income",
            Amount:0,
            id:"",
            mode:"Add",
            Walletlst:[{}]

        }
        this.onchange=this.onchange.bind(this);
        this.onAdd=this.onAdd.bind(this);
        this.HandleDelete = this.HandleDelete.bind(this)
        this.HandleEdit = this.HandleEdit.bind(this)
        this.Onclear = this.Onclear.bind(this)
    }

    componentDidMount()
    {
        axios.get("https://powerful-crag-72765.herokuapp.com/getwallet").then((data)=>{
            this.setState({Walletlst:data.data.Wallets})
            
        }).catch((err)=>{
            console.log(err);
        })
    }

    HandleEdit(val)
    {
        console.log(val._id)
        this.setState({Description:val.Description,WalletDate:val.WalletDate,Type:val.Type,Amount:val.Amount,id:val._id, mode:"Edit"})
    }

    HandleDelete(id)
    {
            axios.post("https://powerful-crag-72765.herokuapp.com/deleteWallet",{id:id}).then((data)=>{
                        this.setState({Walletlst:data.data})
                        this.Onclear()
                }).catch((err)=>{
                   console.log(err);
               })
    }


    onAdd(e)
    {
        

        if(this.state.mode==="Edit")
        {
                    axios.post("https://powerful-crag-72765.herokuapp.com/editWallet",this.state).then((data)=>{
                        this.setState({Walletlst:data.data.Data,id:""})
                        this.Onclear()
                }).catch((err)=>{
                    console.log(err);
                })

           
      }
      else
      {
                
                    axios.post("https://powerful-crag-72765.herokuapp.com/addwallet",this.state).then((data)=>{
                        this.setState({Walletlst:data.data.Data})
                        this.Onclear()
                }).catch((err)=>{
                    console.log(err);
                }) 
      }
       
    }

    onchange(e)
    {
        this.setState({[e.target.name]:e.target.value})
       
       
    }

    Onclear()
    {
        this.setState({
        WalletDate :"",
        Description:" ",
        Type:"Income",
        Amount:0,
        id:"",
        mode:"Add"
    })

    }

render()
    {
            return(
                <div>

            <Container>
            <Row>
            <Col  lg="3">
            <label>Wallet Date  </label>
            <input type="date" name= "WalletDate" value={this.state.WalletDate} width="120" height="40" onChange={this.onchange.bind()}/>
            </Col>
            <Col  lg="3">
            <label>Description  </label>
            <input type="text" name= "Description" value={this.state.Description} width="120" height="40" onChange={this.onchange.bind()}/>
            </Col>
            <Col  lg="3">
            <label>Type  </label>
            <div>
            <select id = "Type" name="Type" width="120" value={this.state.Type} height="40" onChange={this.onchange.bind()}>
                  <option key="Income" value="Income">Income</option>
                  <option key="Expense" value="Expense">Expense</option>
                </select>
                </div>
            </Col>
            <Col  lg="3">
            <label>Amount  </label>
            <div>
            <input type="text" name= "Amount" width="120" height="40" value={this.state.Amount} onChange={this.onchange.bind()}/>  
            </div>
            </Col>
                     </Row>

<br/>


                   <Row>
              <Col lg="3">
                 <input type="button" name="Add" width="120" value="Add" height="40" onClick={this.onAdd.bind()}/>
                
            </Col>
            <Col lg="3">
                <input type="button" name="Add" width="120" value="Clear" height="40" onClick={this.Onclear.bind()}/>
            </Col> 
            </Row>  
            <br/>
<Row>
     <WalletList  Walletlst={this.state.Walletlst} delete={this.HandleDelete.bind()}  Edit={this.HandleEdit.bind()}/>    
</Row>

</Container>


                 
</div>

            )
    }


}

export default Wallet;


