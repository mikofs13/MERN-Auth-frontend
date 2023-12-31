import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import {toast} from "react-toastify"
import Loader from "../components/Loader"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
const RegisterScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [name,setName] = useState("");

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) =>state.auth);
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    },[navigate, userInfo])
    const [register, { isLoading }, ] = useRegisterMutation();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match")
        }else{
            try {
                const res = await register({ name,email, password }).unwrap();
            dispatch(setCredentials({...res}))
            navigate("/")
        }catch(err){
            toast.error(err.data.message || err.error);
        }
        }
    }
  return (
    <FormContainer>
        <h1>
            Sign Up
        </h1>
        <Form onSubmit={submitHandler} >
            <Form.Group className="my-2" controlId="text">
                <Form.Label>Enter name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Adress</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                        
                    </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="Password">

                <Form.Label>Password</Form.Label>
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
                Sign Up
            </Button>
            <Row className="py-3" >
                <Col>
                Alredy have an account? <Link to={"/login"} >Login</Link></Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen