const test = () => {
    const value = {
        startReader: window.blueDevice.rfidReader.start,
        closeReader: window.blueDevice.rfidReader.close,
        checkOut: window.blueDevice.rfidReader.checkOut,
        checkIn: window.blueDevice.rfidReader.checkIn,
        startIdCard: window.blueDevice.idCard.start,
        closeIdCard: window.blueDevice.idCard.close,
        startReaderCard: window.blueDevice.readerCard.start,
        closeReaderCard: window.blueDevice.readerCard.stop,
        print: window.blueDevice.print
    }

    return value;
}
const init = () => {
    if (window.blueDevice) {
        return test();
    } else {
        return false;
    }
}
export default init;