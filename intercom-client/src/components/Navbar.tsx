import Avatar from "./UserProfiles";
import CreateEnquiry from "./CreateEnquiry";

export default function Navbar() {
    return<nav className="flex items-center justify-between h-14 border-b px-4">
        <h1>GloView</h1>
        <div className="flex items-center gap-4">
        <CreateEnquiry/>
        <Avatar/>
        </div>
    </nav>
}