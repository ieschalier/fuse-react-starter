import { hello } from "./hello"
import * as moment from 'moment'

import "./main.css";
import "./extra.scss";

const time = moment().format('MMMM Do YYYY, h:mm:ss a');
const name: string = `Mr. Mike`;

document.body.innerHTML = `
<div class="content">
  <h1>Welcome to FuseBox!</h1>
  <h2>${name}</h2>
  <h3>${time}</h3>
</div>`;
