import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomeQuiz from "@/component/quiz/home.quiz";
import { getServerSession } from "next-auth";

const DashboardQuiz = async () => {
  const session = await getServerSession(authOptions);
  const getAllQuiz = async () => {
    const res = await fetch(
      `http://localhost:8081/api/v1/quiz-by-participant`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //ts-ignore
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    return res.json();

  };
  const data = await getAllQuiz()
  console.log("vcl data oi: ", data.DT)
  return (
    <div style={{ marginTop: 0 }}>
      <HomeQuiz dataQuiz={data.DT} />
    </div>
  );
};

export default DashboardQuiz;
