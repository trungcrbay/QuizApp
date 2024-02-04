import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SiderAdmin from "@/component/admin/sider";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

const Admin = async () => {
  const session = await getServerSession(authOptions);

  // const res = await fetch("http://localhost:8081/api/v1/participant/all", {
  //   method: "GET",

  //   headers: {
  //     "Content-Type": "application/json",
  //     //@ts-ignore
  //     Authorization: `Bearer ${session.access_token}`,
  //     "Access-Control-Allow-Origin": "localhost:3000",
  //   },
  // });

  const fetchAllUser = async () => {
    const res = await sendRequest<IBackendRes<IGetAllUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participant/all`,
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    })
    return res;
  };

  const data = await fetchAllUser();

  const fetchAllQuiz = async () => {
    const res = await sendRequest<IBackendRes<IGetAllQuiz>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/all`,
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
        "Access-Control-Allow-Origin": "localhost:3000",
      },
    })
    return res;
  }

  const dataQuiz = await fetchAllQuiz()

  return (
    <div style={{ height: "100vh" }}>
      <SiderAdmin listUser={data.DT} listQuiz={dataQuiz.DT} session={session} />
    </div>
  );
};

export default Admin;
