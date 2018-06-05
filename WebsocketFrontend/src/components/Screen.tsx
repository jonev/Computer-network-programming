import * as React from "react";

export class Screen extends React.Component<{}, { width: number, height: number, showScreen: boolean, password: string, ws: WebSocket}> {
    constructor(props: any){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: document.body.clientHeight,
            showScreen: false,
            password: "",
            ws: new WebSocket("ws://192.168.1.142:8181/")
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.sendClick = this.sendClick.bind(this);
        let react = this;

        this.state.ws.onmessage = function (e) {
            
            if (e.data === "ERR") {
                react.setState({ showScreen: false, password: "WRONG PASSWORD" });
            }
            if (e.data === "SUCC") {
                react.setState({ showScreen: true });
            }
            let c: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement
            var ctx = c.getContext("2d");

            var objurl = window.URL.createObjectURL(e.data);
            var img = new Image();
            img.src = objurl;
            img.onload = function () {
                ctx.drawImage(img, 0, 0)
            }
        }
    }

    render() {
        return (
            (this.state.showScreen) ?
                <div onClick={this.sendClick}>
                    <canvas id="myCanvas" width={this.state.width} height={this.state.height} />
                </div>
                :
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Password:
                            <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        );
    }

    sendClick(event: any): void {
        this.state.ws.send("mouse" + ";" + event.clientX + ";" + event.clientY)
        event.preventDefault();
    }

    handleSubmit(event: any): void {
        this.state.ws.send(this.state.password + ";" + this.state.width + ";" + this.state.height)
        event.preventDefault();
    }

    handleChangePassword(event: any): void {
        this.setState({
            password: event.target.value
        })
    }

    updateDimensions(): void{
        this.setState({ width: window.innerWidth, height: document.body.clientHeight });
        this.state.ws.send("update;"+this.state.width + ";" + this.state.height)
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
}