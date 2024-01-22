export { };

declare global {
    interface IAssignQuiz {
        quizId: any;
        userId: any;
    }

    interface IAddQUestion {
        quizId: number;
        description: string;
        file: File | null;
    }

    interface IAddQuiz {
        description: string;
        name: string;
        difficulty: string;
        file: File;
    }

    interface IAddUser {
        email: string;
        password: string;
        username: string;
        role: string;
        file: File;
    }

    interface IUpdateUser {
        id: any;
        username: string;
        role: string;
        image: File
    }

    interface IUpdateQuiz {
        id: number;
        description: string;
        name: string;
        difficulty: string;
        file: File;
    }

    interface IRegister {
        email: string;
        username: string;
        password: string
    }

    interface IAnswerData {
        id: number;
        description: string;
        imageFile: string;
        imageName: string;
        checkSelected?: boolean;
        answers: {
            id: number;
            description: string;
            isCorrect: boolean;
            isSelected: boolean;
        }[];
    }

    interface Answer {
        questionId: number;
        userAnswerId: number[];
    }

    interface Payload {
        quizId: number;
        answers: Answer[];
    }

    interface Result {
        countCorrect: number;
        countTotal: number;
        quizData?: any
    }

    interface IUserProfile {
        username: string;
        image: File | null;
    }


}