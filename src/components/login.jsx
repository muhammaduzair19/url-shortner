import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { BeatLoader } from "react-spinners"
import Error from "@/components/error"
import { useEffect, useState } from "react"
import * as Yup from 'yup'
import useFetch from "@/hooks/use-Fetch"
import { login } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"


const Login = () => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        emal: '',
        password: ''
    });

    const navigate = useNavigate();
    const { fetchUser } = UrlState();
    const [searchParams] = useSearchParams()
    const longlink = searchParams.get('createNew')
    const { data, loading, error, fn: fnLogin } = useFetch(login, formData)

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ''}`);
            fetchUser();
        }
    }, [data, error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        setErrors({})
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Invalid Email').required('Email is required'),
                password: Yup.string().min(6, 'Password should have atleast six characters').required('Password is required')
            })

            await schema.validate(formData, { abortEarly: false })
            await fnLogin()
        } catch (e) {
            const newErrors = {}
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message
            })

            setErrors(newErrors)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>to your account if you have already registered.</CardDescription>
                {error && <Error message={errors.message} />}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className="space-y-1">
                    <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChange} />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChange} />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>
                    {loading ? <BeatLoader size={7} /> : 'Login'}
                </Button>
            </CardFooter>
        </Card>

    )
}

export default Login