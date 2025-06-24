import Link from "next/link";
import { useState } from "react";

const Users = ({users}) => {

    return (
        <div>
            <div>
            </div>
            <h1 className="text-white text-p-lg text-semibold mx-5 mb-5">Its users page</h1>
            <ul className="text-white text-2xl text-regular *:my-2 *:mx-5">
                {users.map(user => 
                    <li key={user.id}>
                        <Link href={`/item/${user.id}`}>
                            <p className="hover:text-gray">
                                {user.name}
                            </p>
                        </Link>  
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Users;

export async function getStaticProps(context) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    return {
        props: {users},
    }
}