import Link from "next/link";
import { useState } from "react";
import A from "../components/A";

const Users = () => {
    const [users, setUsers] = useState([
        {id: 1, name: 'Vasya'},
        {id: 2, name: 'Ivan'},
        {id: 3, name: 'Lenya'},
        {id: 4, name: 'Dasha'},
    ])

    return (
        <div>
            <div>
                <A href={'/'} text={'Main'} />

                <A href={'/users'} text={'Users'} />
            </div>
            <h1>Its users page</h1>
            <ul>
                {users.map(user => 
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <p>
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