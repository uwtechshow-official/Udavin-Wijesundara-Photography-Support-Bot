module.exports = async (sock, sender) => {
    const offersText = `
**Special Offers:**

We Don't Have Offers Right Now. Please Check Later.
`;

    try {
        await sock.sendMessage(sender, { text: offersText });
        console.log('Offers message sent successfully');
    } catch (error) {
        console.error('Failed to send offers message:', error);
    }
};
