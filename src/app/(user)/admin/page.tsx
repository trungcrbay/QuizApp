
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SiderAdmin from "@/component/admin/sider";
import { getServerSession } from "next-auth";

const Admin = async () => {
    const session = await getServerSession(authOptions);

    const resDashboard = await fetch(`http://localhost:8081/api/v1/overview`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //@ts-ignore
            Authorization: `Bearer ${session.access_token}`,
        },
    });
    const getData = await resDashboard.json();

    return (
        <div style={{ height: "100vh" }}>
            <SiderAdmin dataDashboard={getData.DT} />
        </div>
    );
};

export default Admin;
