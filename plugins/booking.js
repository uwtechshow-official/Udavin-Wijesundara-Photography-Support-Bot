module.exports = async (sock, sender) => {
    const bookingText = `
To book a session with us, please provide the following details:

1. **Name**
2. **Preferred Date and Time**
3. **Service Required**
`;

    try {
        await sock.sendMessage(sender, { text: bookingText });
        console.log('Booking message sent successfully');
    } catch (error) {
        console.error('Failed to send booking message:', error);
    }
};
