import r2wc from '@r2wc/react-to-web-component';
import App from './App';

const lastbotWidget = r2wc(App, { props: { baseUrl: "string" }});

customElements.define("lastbot-widget", lastbotWidget);