import React,{useState,useEffect} from 'react'
import { Container,Button ,Form,Col,Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from '../config/Url';
import { getUser } from '../config/MyService';
import axios from 'axios';
export default function MyAccount() {
    let email=JSON.parse(localStorage.getItem('user')).email;
    let token=localStorage.getItem('_token');
    let [ischange,setChange]=useState(false)
    let [logo,setLogo]=useState('');
    let [logo1,setLogo1]=useState('');
    let [firstname,setfirstname]=useState('')
    const falogo=(<i className='fa fa-camera'></i>)
    const navigate=useNavigate();
    const styles = {
        container :{ position: "relative "},
        img1 :{ display:" block",
                marginTop:"1%",
            marginLeft:"5%" },
      fa1 : { position: "absolute",
         bottom:20,
         left:230,
        backgroundColor:'white' }
      };
      useEffect(()=>{
      
        let data=JSON.parse(localStorage.getItem('user'))
        getUser(data.email)
        .then(res=>{
            if(res.data.user){
                setLogo(res.data.user.logo)
            }
        })
      },[])
      const upload=()=>{
          setChange(true)
        //   navigate('/addlogo');
      }
      const upload1=()=>{
        let form_data=new FormData();
             console.log(logo);
             form_data.append("myfile",logo1);
             axios.post(`${MAIN_URL}neostore/uploadlogo/${email}`,form_data,{
                 headers:{"Authorization":`Bearer ${token}`,
                 'Content-Type': 'multipart/form-data'}})
                 .then(res=>{
                     if(res.data.err){
                         alert(res.data.err)
                     }else{
                         alert(res.data.msg)
                         setChange(false)
                        window.location.reload()
                     }
                 })
         }
    return (
        <div>
            
              <Container style={styles.container}>
                    <img src={`${MAIN_URL}neostore/${logo}`}   className="rounded-circle " alt="Profile pic" width="230px" height="150px" style={styles.img1}/>
                   {ischange?   <Container style={styles.container} className="mt-5">
                     <Form method="post"  encType="multipart/form-data">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Logo
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control  type="file" placeholder={falogo} name="myfile" id="myfile" onChange={(e)=>{setLogo1(e.target.files[0])}} />
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={upload1} >Update</Button>
                    </Form>
                    </Container>: <Button variant='outline-primary' onClick={upload}  style={styles.fa1}><i className='fa fa-camera'></i></Button>}
                 <h5 style={{marginLeft:150}} className='mt-2'>{firstname}</h5>
                    </Container>
                    <Container className='d-grid gap-2 mt-5' style={{textAlign:'justify'}}>
                        <Button variant='outline-dark'style={{textAlign:'justify'}} size='lg' href="/userprofile"><i className='fa fa-user p-2'></i>User Profile</Button>
                        <Button variant='outline-dark' style={{textAlign:'justify'}} size='lg' href="/editaddress"><i className='fa fa-address-card p-2'></i>Address</Button>
                        <Button variant='outline-dark'style={{textAlign:'justify'}} size='lg' href="/order"><i className='fa fa-user p-2'></i>Order</Button>
                        <Button variant='outline-dark'style={{textAlign:'justify'}} size='lg' href="/changepassword"><i className='fa fa-key p-2'></i>Change Password</Button>
                    </Container>
        </div>
    )
}
