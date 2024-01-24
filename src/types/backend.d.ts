export { };

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        DT?: T
    }

    interface IGetQuizByParticipant {
        id: number;
        description: string;
        image: File | null;
        ParticipantQuiz: {
            quiz_id: number;
            participant_id: number;
            is_finish: boolean;
            time_start: null;
            time_end: null
        }
    }

    interface IGetAllUser {
        id: number;
        username: string;
        email: string;
        role: string;
        image?: File | string;
    }

    interface IGetDetailQuiz {
        quizId:number;
        qa:{
            id:number;
            description:string;
            imageFile: File | string | null;
            imageName : string;
            answers:{
                id:string;
                description:string;
                isCorrect:boolean;      
            }
        }
    }

}