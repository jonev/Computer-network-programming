import * as React from "react";

export class Screen extends React.Component<{}, {}> {
    render() {
        return <canvas id="myCanvas" width={window.innerWidth} height={window.innerHeight} ></ canvas>;
    }
}