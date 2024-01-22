import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HistoryUser from "@/component/user/history.user";
import { getServerSession } from "next-auth";

const HistoryPage = async () => {
    const session = await getServerSession(authOptions);
    const res = await fetch("http://localhost:8081/api/v1/history", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //@ts-ignore
            Authorization: `Bearer ${session.access_token}`,
        },
    });
    const data = await res.json();
    console.log("check data history: ",data.DT)
    return (
        <>
            <HistoryUser historyData ={data.DT}/>
        </>
    )
}

export default HistoryPage;