import React from "react";
import ControllerDashboard from "./src/components/schedule.tsx";
const element = React.createElement(ControllerDashboard, {});
console.log('type', typeof element, element && element.$$typeof?.toString());
console.log('keys', Object.keys(element));
