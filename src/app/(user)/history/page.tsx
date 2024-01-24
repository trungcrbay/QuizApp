import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HistoryUser from "@/component/user/history.user";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const HistoryPage = async () => {
    const session = await getServerSession(authOptions);
    
    const fetchHistory = async () => {
        const res = await sendRequest<IBackendRes<IGetDetailQuiz>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/history`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`,
            },
        })
        return res;
    }
    const data = await fetchHistory();
    console.log("check data history: ", data.DT)
    return (
        <>
            <HistoryUser historyData={data.DT} />
        </>
    )
}

export default HistoryPage;