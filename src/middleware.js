import { NextResponse } from 'next/server';

export { auth as middleware } from "@/auth"

/*export*/ function middleware(request) {
    // TODO: Add user authentication. For test right now /User is private
    const user = '';
    if(!user)
    {
        return NextResponse.redirect(new URL ('/', request.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/user']
}
