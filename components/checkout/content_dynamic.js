
const ContentDynamic = (props) => {
    if(props.shown) {
        return props.children
    }
    return null;
}

export default ContentDynamic;