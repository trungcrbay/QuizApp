import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageChangePassword from "@/component/user/modal.pass";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

const ChangePassword = async () => {
    const session = await getServerSession(authOptions);

    return(
        <div style={{paddingTop:'80px',height:'100%'}} className="homepage">
            <PageChangePassword session = {session}/>
        </div>
    )
}

export default ChangePassword;