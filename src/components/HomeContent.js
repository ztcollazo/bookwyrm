import React from "react";
import "../style/HomeContent.css";

class HomeContent extends React.Component {
    constructor(props){
        super(props);

        this.buttons = [
            {
                name: "Top Books",
                link: "/top-books"
            },
            {
                name: "Browse",
                link: "/browse"
            },
            {
                name: "Give Suggestions",
                link: "/forum"
            },
            {
                name: "Review a Book",
                link: "/review"
            }
        ];

        this.buttonList = this.buttons.map((link, i) => {
            return (
                <a id={ "button-" + i } href={ link.link }>{ link.name }</a>
            );
        });
    }

    render() {
        return (
            <>
                <h1>BookWyrm</h1>
                <h2>The Place for all books</h2>
                <div id="buttons">
                    { this.buttonList }
                </div>
            </>
        );
    }
}

export default HomeContent;