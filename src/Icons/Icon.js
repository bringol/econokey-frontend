import React from "react";

const Icon = (props) => {
    const styles = {
        img: {
            width: 24,
            height: 24
        }
    };
    return (<img style={styles.img} src={props.icon} alt=''/>);
};

export default Icon;
