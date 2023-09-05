import r2wc from '@r2wc/react-to-web-component';
import App from './App';

const wcChecklist = r2wc(App, { props: { items: "json" } });

customElements.define("r2w-checklist", wcChecklist);