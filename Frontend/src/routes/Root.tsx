import { Outlet, useLoaderData, useNavigation, Params } from 'react-router-dom';

import Navbar from '../components/Header/Navbar.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function action() {
    // const contact = await createContact();
    // return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({
    request,
    params,
}: {
    request: Request;
    params: Params;
}) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') ?? '';
    const ctg = (url.searchParams.get('ctg') as string) ?? '';
    const skip = (url.searchParams.get('skip') as string) ?? 0;
    return { q, skip, ctg };
}

export default function Root() {
    const { q } = useLoaderData() as {
        q: string;
    };

    const navigation = useNavigation();

    return (
        <div className="dark:bg-[#0f172a] bg-sky-50 h-full bg-no-repeat bg-[url(./shadow.svg)] bg-[100%]">
            <Navbar q={q} />

            <ToastContainer />
            <div
                id="detail"
                className={`${
                    navigation.state === 'loading' ? 'loading' : ''
                } `}
            >
                <Outlet />
            </div>
        </div>
    );
}
