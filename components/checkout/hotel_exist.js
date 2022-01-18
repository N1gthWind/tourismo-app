const HotelExist = (props) => {
    if(props.hotelExist) {
        return props.children
    }
    return null;
}

export default HotelExist;