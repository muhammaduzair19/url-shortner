import Login from "@/components/login"
import Signup from "@/components/signup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrlState } from "@/context"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get('createNew');
  const navigate = useNavigate()

  const { isAuthenticated, loading, fetchUser } = UrlState();

  useEffect(() => {
    fetchUser();
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ''}`);
    }

  }, [isAuthenticated, loading])



  return (
    <div className='mt-16 flex flex-col items-center gap-10'>
      <h2 className='text-5xl font-extrabold'>{longlink ? "Hold up! Let's login first.. " : "Login / Signup"}</h2>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Auth