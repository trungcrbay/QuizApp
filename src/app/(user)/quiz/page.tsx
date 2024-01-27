import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomeQuiz from "@/component/quiz/home.quiz";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

const DashboardQuiz = async () => {
  const session = await getServerSession(authOptions);
  console.log("check session: ", session)

  const getAllQuiz = async () => {
    const res = await sendRequest<IBackendRes<IGetQuizByParticipant>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz-by-participant`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    })

    return res;

  };
  const data = await getAllQuiz()
  console.log("vcl data: ", data.DT)
  return (
    <div style={{ marginTop: 0 }}>
      <HomeQuiz dataQuiz={data.DT} />
    </div>
  );
};

export default DashboardQuiz;
