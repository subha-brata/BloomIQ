import axios from "axios";

type questions=[{
    text:string
}]


export async function gen(questions:questions){
    const req={
        questions:questions
    }
    const url='https://api.femizone.in/api/gen/';
    const res = await axios.post(url,req);
    return(res.data.questions);
}