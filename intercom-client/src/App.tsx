import AppContextProvider from "./AppContext";
import ChatSidebar from "./components/ChatSidebar";
import Messages from "./components/Messages";
import Navbar from "./components/Navbar";

export default function App() {
  return <AppContextProvider>
    <main>
      <Navbar />
      <div className="w-full h-[calc(100vh-3.5rem)] flex items-start justify-between">
        <ChatSidebar />
        <Messages />
      </div>
    </main>
  </AppContextProvider>
}