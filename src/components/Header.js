import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import worker from './../logos/worker.svg'
import keymaker from './../logos/key.svg'
import mason from './../logos/mason-trowel.svg'
import tutor from './../logos/speech.svg'
import tailor from './../logos/tailor.svg'
import carpenter from './../logos/carpenter.svg'
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as sRef, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {app} from '../firebase.js'
import useRandomName from '@scaleway/random-name'

// <Alert key={variant} variant={variant}>
//           This is a {variant} alert—check it out!
//         </Alert>


import { useState } from 'react';
import { Alert } from 'react-bootstrap';


function Header() {
  const [redShow, setRedShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
    const [post, setPost] = useState({
        name: '',
        phone: '',
        email: '',
        bio: "",
        work: "",
        profile: "",
        skills: "",
        experience: "",
        base: "",
        address: "",
        profession: "",
        rate: "5"
    });

  const storage = getStorage(app);
  const name = useRandomName()

  const storageRef = sRef(storage, name);
  function uploadProfilePhoto(file){
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    
    }, 
    (error) => {
      setRedShow(true)
      console.log(error.message)

    }, 
    () => {
      setSmShow(true)
      getDownloadURL(uploadTask.snapshot.ref).then((profileURL) => {
        console.log('File available at', profileURL);
        setPost({...post, profile: profileURL})
      });
    });
  }


  function uploadWorkPhotos(files){
    console.log(files)

    Object.keys(files).map(key => {
        const uploadTask = uploadBytesResumable(storageRef, files[key]);

      uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      return 0;
    
    }, 
    (error) => {
      setRedShow(true)
      console.log(error.message)
      return 0;

    }, 
    () => {
      setSmShow(true)
      getDownloadURL(uploadTask.snapshot.ref).then((photo) => {
        console.log('File available at', photo);
        setPost({...post, work: post.work + photo + ', '})
      });
    });
    })

  }

  
  function writeUserData() {
    const db = getDatabase();
    set(ref(db, 'post/'+ document.getElementById('phone').value), post);

  }


  
  return (
    <>
    <Navbar style={{backgroundColor:'#000'}} variant="dark" sticky="top" className='justify-content-between'>
          <Navbar.Brand href="/" style={{width : "20vw"}} className='d-flex align-item-center justify-content-around'>
            <img
              alt=""
              src={worker}
              width="40"
              height="40"
              style={{marginLeft:'2vw'}}
              className="d-inline-block align-top"
            />{' '}
            <h2>Service Guru</h2>
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-3"
              aria-label="Search"
              style={{width:'25vw'}}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div style={{width : "20vw"}} className='d-flex justify-content-around'>
          <Button onClick={() => setLgShow(true)} variant="outline-light">Post Your Service</Button>

          </div>
      </Navbar>
      <Nav style={{backgroundColor:"#fd7e14", fontWeight:"bold", height:"3em"}} className="justify-content-around d-flex align-item-center" activeKey="/home">
        <Nav.Item style={{display:'flex', alignItems: 'center'}}>
        <img
              alt=""
              width="30"
              height="30"
              src={carpenter}
              className="d-inline-block align-top"
            />{' '}
          <Nav.Link className='text-white'  href="/home">Carpenter</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{display:'flex', alignItems: 'center'}}>
            <img
              alt=""
              width="30"
              height="30"
              src={mason}
              className="d-inline-block align-top"
            />{' '}
          <Nav.Link className='text-white' eventKey="link-1">Mason</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{display:'flex', alignItems: 'center'}}> 
            <img
              alt=""
              width="30"
              height="30"
              src={tailor}
              className="d-inline-block align-top"
            />{' '}
          <Nav.Link className='text-white' eventKey="link-2">Tailor</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{display:'flex', alignItems: 'center'}}>
            <img
              alt=""
              width="30"
              height="30"
              src={tutor}
              className="d-inline-block align-top"
            />{' '}
          <Nav.Link className='text-white' eventKey="link-1">Tutor</Nav.Link>
        </Nav.Item>
        <Nav.Item className='d-flex' style={{display:'flex', alignItems: 'center'}}>
            <img
              alt=""
              width="30"
              height="30"
              src={keymaker}
              className="d-inline-block align-top"
            />{' '}
          <Nav.Link className='text-white' eventKey="link-2"> Electrician</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-white-50' eventKey="link-1">All Categories</Nav.Link>
        </Nav.Item>

      </Nav>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            Post Your Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={()=> writeUserData()}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e)=>setPost({...post, name:e.target.value})} required type="text" id='name' placeholder="Enter Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Profession</Form.Label>
        <Form.Control onChange={(e)=>setPost({...post, profession:e.target.value})}  required type="text" id='profession' placeholder="Enter Your Profession" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Experience</Form.Label>
       <Form.Select required onChange={(e)=>setPost({...post, experience:e.target.value})}  name="years" id="experience">
        <option disabled defaultValue>How Much Experience Do You Have?</option>
        <option value="Fresher">Fresher</option>
        <option value="1 yr">1 Year</option>
        <option value="2 yrs">2 Year</option>
        <option value="3 yrs">3 Year</option>
        <option value="4 yrs">4 Year</option>
        <option value="5 yrs">5 Year</option>
        <option value="5+ yrs">More than 5 Year</option>

       </Form.Select>
      </Form.Group>

      <Form.Group  className="mb-3" >
        <Form.Label>About Yourself</Form.Label>
        <Form.Control required id='bio' onChange={(e)=>setPost({...post, bio:e.target.value})}   type="text" placeholder="Enter Your Bio" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Base Range</Form.Label>
        <Form.Control required type="text" onChange={(e)=>setPost({...post, base:e.target.value})}  id='base' placeholder="300-600" />
      </Form.Group>
      <Form.Group  className="mb-3" >
        <Form.Label>Your Skills & Experience</Form.Label>
        <Form.Control required id='bio' onChange={(e)=>setPost({...post, skills:e.target.value})}   type="text" placeholder="Floor, Wall Painting... (Seperated By Comma)" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" id='phone' onChange={(e)=>setPost({...post, phone:e.target.value})}  required placeholder="Enter Your Phone Number" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" id='email' onChange={(e)=>setPost({...post, email:e.target.value})}  placeholder="Enter Your Email Id (Optional)" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Business Address</Form.Label>
        <Form.Control type="text" id='address' onChange={(e)=>setPost({...post, address:e.target.value})}  placeholder="Enter Your Business Address (Optional)" />
      </Form.Group>
    

        <div>
      <div className="d-flex justify-content-center mb-4">
          <img src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
          className="rounded-circle" alt="example placeholder" style={{width: "50px"}} />
      </div>
      <div className="d-flex justify-content-around mb-5">
          <div className="btn btn-primary btn-rounded">
              <label className="form-label text-white m-1"  htmlFor="customFile1">Choose Profile Photo</label>
              <input type="file"  className="form-control d-none" onChange={(e)=> {uploadProfilePhoto(e.target.files[0])}} id="customFile1" />
          </div>
          <div className="btn btn-primary btn-rounded">
              <label className="form-label text-white m-1"  htmlFor="customFile2">Your Experience Photos</label>
              <input type="file" multiple onChange={(e)=>{uploadWorkPhotos(e.target.files)}} className="form-control d-none" id="customFile2" />
          </div>
      </div>
</div>
<div className="d-flex justify-content-center">

      <Button style={{width: '95%'}} variant="primary" type="submit">
        Submit
      </Button>
</div>
    </Form>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
      >
       
        <Alert key={'success'} variant={'success'}>
          Profile Photo Successfully Uploaded!
        </Alert>   
      </Modal>
      <Modal
        size="sm"
        show={redShow}
        onHide={() => setRedShow(false)}
      >
       
        <Alert key={'danger'} variant={'danger'}>
          Warning
        </Alert>   
      </Modal>
    </>
    
  );
}

export default Header;