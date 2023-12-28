import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DetailQuiz from "@/component/quiz/detail.quiz";
import { getServerSession } from "next-auth";
const DetailQuizId = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);
  console.log("vcl slug:", params.slug)
  const getDetailQuiz = async () => {
    const res = await fetch(
      `http://localhost:8081/api/v1/quiz-with-qa/${params.slug}`,
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
  const data = await getDetailQuiz();
  console.log("text data: ",data.DT.qa)
  return (
    <div style={{marginTop:'100px'}}>
      <DetailQuiz detailDataQuiz = {data.DT.qa}/>
    </div>
  );
};

export default DetailQuizId;
