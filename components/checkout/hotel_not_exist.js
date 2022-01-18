const HotelNotExist = (props) => {
    if (props.hotelExist) {
        return null;
    }
    return props.children
}

export default HotelNotExist;