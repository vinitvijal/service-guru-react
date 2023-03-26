import React, { useEffect, useState } from 'react';
import Card from './Card';
import { ref, child, get } from "firebase/database";
import database from './../firebase.js'


const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database)

        get(child(dbRef, `post/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            setData(snapshot.val())
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }, []);
    
    const dataBox = {
        name: 'Ram',
        phone: 987654322,
        email: 'asdfghj@sdfghj.com',
        profession: 'Builder',
        skills: 'sd,sdvdf,fdv,df,fdv'
    }


    const images = [
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/5403/production/_104970512_mediaitem104970511.jpg',
        'https://images.yourstory.com/cs/wordpress/2018/07/Untitled-design-12-1.png',
        'https://c8.alamy.com/comp/2HMDWED/focus-on-carpenter-young-indian-carpenter-polising-or-shaping-chariot-by-using-carpentry-tools-at-workplace-concept-of-craftperson-self-employed-2HMDWED.jpg',
        'https://media.licdn.com/dms/image/C5103AQF1jQir2z6Hgw/profile-displayphoto-shrink_800_800/0/1524212715373?e=2147483647&v=beta&t=vxYg-HTTKKoX22nBNUNb0EJhZOOq_InbqBOWitWFZgY',
        'https://thumbs.dreamstime.com/b/indian-village-carpenter-working-sawmill-indian-village-carpenter-working-sawmill-workers-standing-infont-wooden-logs-162009309.jpg',
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/A585/production/_88437324_anushreefadnavis-indusimages-16.jpg',
        'https://media.licdn.com/dms/image/C5603AQFocU_xBjlgTQ/profile-displayphoto-shrink_800_800/0/1626609513521?e=2147483647&v=beta&t=3frPivANoORuCgD9OI2GRhcKmWfpxNtv7jBLi5HoUmo',
        'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201606/modi-govt%2C-narendra-5_647_060116094448_0.jpg?VersionId=VWrY_L9Cl0QqB7jY1TEw1SqNCLXi1EdS',
        'https://i.koloapp.in/tr:n-fullscreen_md/6843704a-22a9-fe40-b1be-ead7e898ccda',
        'https://www.nobroker.in/blog/wp-content/uploads/2022/02/cost-of-painting-a-house-per-square-foot-in-India-1-1.jpg',
        'https://threebestrated.in/images/ChiragElectricalIndia-Meerut-UP.jpeg',
]
    return (
        <>
        <div className='grider' >
            {(Object.keys(data)).map(key => (
                <Card data={data[key]} key={key}/>    
            ))}
        </div>

       
        </>
        
        
    );
}

export default Home;
