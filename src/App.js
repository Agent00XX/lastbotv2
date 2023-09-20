import "./App.css";
import { ChatContainer } from "./component/ChatContainer";
import { Header } from "./component/Header";

function App({baseUrl}) {
	return (
		<>
			<ChatContainer BASE_URL={baseUrl} />
		</>
	);
}

export default App;