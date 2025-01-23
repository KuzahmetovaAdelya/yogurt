import AdminHeader from "../components/AdminHeader";
import AdminMainSection from "../components/AdminMainSection";

export default function AdminPage({}) {
    return (
        <>
            <div className="w-screen h-screen bg-admin-gray">
                <AdminHeader />
                <AdminMainSection header={'Каталог'} />
            </div>
        </>
    )
}