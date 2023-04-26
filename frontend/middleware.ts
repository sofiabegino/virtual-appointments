import {NextResponse} from 'next/server';

export async function middleware(req : any) {
    const token = req.cookies.get("token");
    const user = req.cookies.get("user");

    const { pathname, origin } = req.nextUrl;
    const url = req.url;

    if (url.includes("/auth")) {
        if(token && token != undefined){
            return NextResponse.redirect(`${origin}`);
        }else{
            return NextResponse.next();
        }
    }

    if((pathname=='/submissions/new' || pathname == '/submissions') && user){
        const userData = JSON.parse(user.value);
        if(userData.role == 'Doctor'){
            return NextResponse.redirect(`${origin}/404`);
        }
        else if(!userData.otherInfo){
            return NextResponse.redirect(`${origin}/profile`);
        }
    }

    if((pathname=='/submissions/pending' || pathname == '/submissions/task_history') && user){
        const userData = JSON.parse(user.value);
        if(userData.role == 'Patient'){
            return NextResponse.redirect(`${origin}/404`);
        }
    }


    if (url.includes("/submission") || url.includes("/profile") || pathname == "/") {
        if(token == undefined){
            return NextResponse.redirect(`${origin}/auth/login`);
        }
    }

    return NextResponse.next();

}