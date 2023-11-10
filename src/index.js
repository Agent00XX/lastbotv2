import r2wc from '@r2wc/react-to-web-component';
import App from './App';

const lastbotWidget = r2wc(App, { props: { baseUrl: "string" }, shadow: 'open' });

customElements.define("lastbot-widget", lastbotWidget);