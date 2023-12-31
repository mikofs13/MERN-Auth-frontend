import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import Loader from "../components/Loader"
import { setCredentials } from "../slices/authSlice"
import { Form,Button } from "react-bootstrap"
import { useUpdateUserMutation } from "../slices/usersApiSlice"
const ProfileScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [name,setName] = useState("");

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) =>state.auth);
    const [updateProfile, {isLoading}] = useUpdateUserMutation();
    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
        
    },[userInfo.setName, userInfo.setEmail])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
        }else{
            try {
                const res = await updateProfile({ 
                    _id: userInfo._id,
                    name,
                    email,
                    password
                  }).unwrap();
            dispatch(setCredentials({...res}))
            toast.success("Profile Updated successfully")
            
        }catch(err){
            toast.error(err?.data.message || err?.error);
        }
        }
        
    }
  return (
    <FormContainer>
        <h1>
            Update Profile
        </h1>
        <Form onSubmit={submitHandler} >
            <Form.Group className="my-2" controlId="text">
                <Form.Label>Change Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Change Email Adress</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="Password">

                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">

                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
            </Form.Group>
            {isLoading && <Loader/>}
            
            <Button type="submit" variant="primary" className="mt-3">
                Update Profile
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen