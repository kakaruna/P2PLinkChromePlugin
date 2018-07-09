// import '~bootstrap/scss/bootsctrap.scss'
import './index.scss'

import { h, render } from 'preact';
import { App } from "./app";
render(<App name="cool working" />, document.getElementById("app"));

console.log("popup");