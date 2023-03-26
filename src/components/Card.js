import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import telephone from '../logos/telephone.svg'
import home from '../logos/home.svg'
import email from '../logos/email.svg'



function Cards(props) {
  const [show, setShow] = useState(false);
  console.log(props)
  return (<>
    <Card style={{width : '20vw'}} onClick={()=>setShow('Hii')}>
        <Card.Img variant="top" src={props.data.profile || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"} />
        <Card.Body>
          <Card.Title><h3>{props.data.name}</h3>{props.data.profession}</Card.Title>
          <Card.Text>
            {props.data.bio}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{backgroundColor: '#F9F5EB'}}>
          <small className="text-muted"><span style={{color:'black', fontWeight:'bold'}}>Experience : {props.data.experience}</span></small>
        </Card.Footer>
      </Card>
      
      <Modal
      size='lg'
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header >
            <div style={{width:'100%', justifyContent:'space-around', marginTop:'5vh', marginBottom:'5vh'}} className='d-flex'>
                <img
                    src={props.data.profile || "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"}
                    alt=''
                    height={'250'}
                />
                <div style={{ }}>
                    <h1>{props.data.name}</h1>
                    <h3>{props.data.profession}</h3>
                </div>
            </div>
            
        </Modal.Header>
        <Modal.Body>
          <p>
            <h3 style={{fontWeight:700}}>Bio</h3>
            {props.data.bio}
          </p>
          <hr />
          <div className='d-flex justify-content-between'>
            <h3 style={{fontWeight:700}}>Experience : <span style={{color:'grey'}}>{props.data.experience}</span></h3> 
            <h3 style={{fontWeight:700}}>Ratings : {'⭐️'.repeat(parseInt(props.data.rate))}</h3>
          </div>
          <div className='d-flex justify-content-between'>
            <h3 style={{fontWeight:700}}>Base Charges : <span style={{color:'grey'}}>Rs {props.data.base || 'Depends'}</span></h3> 
          </div>
          <hr />


          <h3 style={{fontWeight:700}}>Skills & Experience</h3>
          <ul>
            {((props.data.skills).split(',')).map(item => (
              <li>{item}</li>
            ))}
          </ul>

          <hr />
          <h3 style={{fontWeight:700}}>Work</h3>
          <br />
          <Carousel slide={false}>
            {((props.data.work || 'No, No, No').split(',')).map(item => (
              <Carousel.Item>
              <img
                className="d-block w-100"
                src={item}
                key={item}
                alt="slide"
              />
            </Carousel.Item>
            ))}
     
  
    </Carousel>

    <hr />

        <h3 style={{fontWeight:700}}>Contact</h3>
        <br />
        <ul style={{listStyle:'none',fontSize: '1.2em'}}>
            <li className='d-flex  align-item-center'><img style={{height: '1.4em', marginRight:'10px'}} src={telephone} alt="" />  Contact Number : {props.data.phone}</li>
            <li className='d-flex  align-item-center'><img style={{height: '1.4em', marginRight:'10px'}} src={email} alt="" />   Email Id : {props.data.email || 'Not Available'}</li>
            <li className='d-flex  align-item-center'><img style={{height: '1.4em', marginRight:'10px'}} src={home} alt="" />   Address : {props.data.address || 'Not Available'}</li>
        </ul>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      
      
      </>
  );
}

export default Cards;