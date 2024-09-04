import { client } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    
    
  ],
  callbacks:{
    async signIn(params){
      if(!params.user.email){
        return false;
      }
      try{
        await client.user.create({
          data:{
            email:params.user.email,
            provider:"Google"
          }
        })
        return true;
      }catch(e){
        console.log("error in singin",e);
        return false
      }


    }
  }
});
export { handler as GET, handler as POST }