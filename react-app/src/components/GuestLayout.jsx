import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="GuestLayout">
            <div>GuestLayout</div>
            <Outlet />
        </div>
    );
}
