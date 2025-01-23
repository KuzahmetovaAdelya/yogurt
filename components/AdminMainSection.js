import AdminTable from "./AdminTable";

export default function AdminMainSection({header}) {
    return (
        <>
            <div className="pt-44 pl-56">

                <h2 className="text-light-gray text-2xl font-semibold">{header}</h2>

                <AdminTable header={header} />

            </div>
        </>
    )
}