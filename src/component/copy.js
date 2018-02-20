import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Copy extends Component {
    constructor(){
        super();
        this.state = {
            text: "",
            copied: false
        }
        this.onChange = this.onChange.bind(this);
        this.onCopy = this.onCopy.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    onChange(text){
        this.setState({text});
        
    }

    onCopy() {
        this.setState({copied: true});
        setInterval(this.changeColor, 1500)
    }

    changeColor(){
        this.setState({copied: false})
    }

    render() {
        return (
            <div>
                <CopyToClipboard text={this.state.text} onCopy={this.onCopy}>
                    <button 
                        className={this.state.copied ? 'green' : 'blue'}>
                            Copy
                    </button>
                </CopyToClipboard>
                <input 
                    value={this.state.text}
                    onChange={e => this.onChange(e.target.value)}
                />
            </div>
        )
    }
}

export default Copy;