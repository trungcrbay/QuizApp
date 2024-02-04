import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DetailQuiz from "@/component/quiz/detail.quiz";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

// export async function generateStaticParams() {
//   const posts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz/all`).then((res) => res.json())

//   return posts.map((post: any) => ({
//     slug: post.id,
//   }))
// }

const DetailQuizId = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);

  const getDetailQuiz = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await sendRequest<IBackendRes<IGetDetailQuiz>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/quiz-with-qa/${params.slug}`,
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    })
    return res;
  }
  const data = await getDetailQuiz();

  return (
    <div style={{ paddingTop: '100px', height: '100%' }} className="homepage">
      <DetailQuiz detailDataQuiz={data.DT!.qa} session={session?.access_token} />
    </div>
  );
};

export default DetailQuizId;
