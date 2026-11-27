import { cn } from "cn"
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { getIdToken, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/features/auth";

export function LoginForm({
  className,
  ...props
}) {

    //  function executes when the user clicks the Google Login button
    const handleGoogleLogin=async()=>{
      try{
        const result = await signInWithPopup(auth, googleProvider)  // This function is provided by Firebase Authentication    
        // auth-->Firebase Authentication instance   
        // googleProvider-->	Specifies Google as the authentication provider
        // 1. Firebase opens a Google login popup.
        // 2. The user selects their Google account.
        // 3. Google authenticates the user.
        // 4. Firebase receives the authentication response.
        // 5. Firebase resolves the Promise with an authentication result.

        // result variable contains an authentication result object.
        // Firebase has authenticated the user. Now you need an ID token to prove that authentication to your backend.
        // - data.user represents the authenticated user.
        // - getIdToken() is a Firebase User method.
        // - It returns a Promise containing a Firebase ID token
        const token = await result.user.getIdToken()
        const data = await login(token)  // call the login function and pass firebase token in it
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">Welcome To AutoNex</CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form>
            <FieldGroup>
              <Field>
                <Button
                onClick={handleGoogleLogin}
                 variant="outline" 
                 type="button" 
                 className="h-12 w-full gap-3 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-white transition hover:border-violet-400/50 hover:bg-white/[0.08] hover:text-white">
                  
                  <FcGoogle />
                  Login with Google
                </Button>
              </Field>
              
             
            
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
