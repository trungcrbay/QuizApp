import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SiderAdmin from "@/component/admin/sider";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

const Admin = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://localhost:8081/api/v1/participant/all", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      //@ts-ignore
      Authorization: `Bearer ${session.access_token}`,
      "Access-Control-Allow-Origin": "localhost:3000",
    },
  });
  const data = await res.json();

  const fetchAllQuiz = await fetch("http://localhost:8081/api/v1/quiz/all", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      //@ts-ignore
      Authorization: `Bearer ${session.access_token}`,
      "Access-Control-Allow-Origin": "localhost:3000",
    },
  });
  const dataQuiz = await fetchAllQuiz.json();
  console.log("check all dataquiz: ",dataQuiz);
  return (
    <div style={{ height: "100vh" }}>
      <SiderAdmin listUser={data.DT} listQuiz={dataQuiz.DT} session={session}/>
    </div>
  );
};

export default Admin;
