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
import { signup } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"
import useFetch from "@/hooks/use-Fetch"



const Signup = () => {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        emal: '',
        password: ''
    });

    const navigate = useNavigate();
    const { fetchUser } = UrlState();
    const [searchParams] = useSearchParams()
    const longlink = searchParams.get('createNew')
    const { data, loading, error, fn: fnSignup } = useFetch(signup, formData)

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ''}`);
            fetchUser();
        }
    }, [data, error]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSignup = async () => {
        setErrors({})
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid Email').required('Email is required'),
                password: Yup.string().min(6, 'Password should have atleast six characters').required('Password is required'),
                profile_pic: Yup.mixed().required('Profile Pic is required')
            })

            await schema.validate(formData, { abortEarly: false })
            await fnSignup()
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
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>an account now to short your URLs.</CardDescription>
                <Error message={error?.message} />
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className="space-y-1">
                    <Input name='name' type='text' placeholder='Enter Name' onChange={handleInputChange} />
                    {errors.name && <Error message={errors.name} />}
                </div>
                <div className="space-y-1">
                    <Input name='email' type='email' placeholder='Enter email' onChange={handleInputChange} />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input name='password' type='password' placeholder='Enter password' onChange={handleInputChange} />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="space-y-1 text-white">
                    <Input name='profile_pic' type='file' accept='image/*' onChange={handleInputChange} />
                    {errors.profile_pic && <Error message={errors.profile_pic} />}
                </div>

            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>
                    {loading ? <BeatLoader size={7} /> : 'Create Account'}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Signup