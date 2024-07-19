import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import loadingImage from './loading.gif'
const Signup = ({ setSignup, setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [exist, setExist] = useState(false);
    const[vemail,setVemail] = useState('')
    const[vpassword,setVpassword] = useState('')
    const[loading,setLoading] = useState(false)

    const handleSignup = async () => {
        setLoading(true)
        try {
            const res = await axios.post('https://notes-app-phi-lac.vercel.app/user/signup', data);

            if (res.data.msg === 'found') {
                setExist(true);
                setLoading(false)
            }
            if (res.data.msg === 'created') {
                setSignup(false);
                setLogin(true);
                setLoading(false)
            }

        } catch (err) {
            console.log(`signup failed due to ${err}`);
        }
    };

    const handleCut = () => {
        setSignup(false);
    };

    const validateForm = () => {
      

    
      //  Email Validation :

        if(data.email==''){
            setVemail('Please Enter Email : ')
            console.log('please email')
        }else{
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(regex.test(data.email)){
            setVemail('')
            }else{
                 setVemail('Please Enter Valid Email : ')
            }
        }

     //   Password Validation :

       if(data.password==''){
            setVpassword('Please Enter Password : ')
            }else{
            setVpassword('')
            }


        if(!vemail && !vpassword){
             handleSignup()
        }
    };

   
    return (
        <div className="border-2 border-[#7761a7] rounded-lg flex flex-col p-5 gap-5 w-[300px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-400">
            <img src={cross} className="w-5 absolute top-[5%] right-[5%] cursor-pointer" onClick={handleCut} />
            <img src={logo} className="border-4 border-[#7761a7] w-24 rounded-full mx-auto" />
            {exist && (
                <div className="border border-red-500 rounded p-2.5 bg-white text-red-500 font-light">
                    This email already exists
                </div>
            )}
           
            <label className='text-[red]'>{vemail}</label>
            <input
                type="text"
                placeholder="email"
                name="email"
                className="h-6 rounded-lg border-2 border-[#7761a7] p-1"
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
           
            <lable className='text-[red]'>{vpassword}</lable>
            <input
                type="password"
                placeholder="password"
                name="password"
                className="h-6 rounded-lg border-2 border-[#7761a7] p-1"
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
            {loading ?
                  <img src={loadingImage} width='100px' className='mx-auto'/>
:
  <button className="bg-[#7761a7] rounded-2xl h-12 text-white mt-5" onClick={validateForm}>
                Signup
            </button>
            }
          
          
        </div>
    );
};

export default Signup;
