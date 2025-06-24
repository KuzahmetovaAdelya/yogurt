import { useRouter } from "next/router";

export default function ({user}) {
    const query = useRouter().query;

    return (
        <div>
            <h1 className="text-white text-p-lg mx-5 text-semibold">User with id {query.id}</h1>
            <div className="mx-5 mt-5 space-y-2.5 text-white">
                <h2 className="text-big-para text-medium">User name:</h2>
                <p className="text-2xl text-regular">{user.name}</p>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${context.params.id}`);
    const user = await response.json();

    return {
        props: {user},
    }
}