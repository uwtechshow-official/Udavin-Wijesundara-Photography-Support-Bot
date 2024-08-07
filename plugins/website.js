module.exports = async (sock, sender) => {
    const offersText = `
**Official Website**

www.udavinwijesundaraphotography.com
`;

    try {
        await sock.sendMessage(sender, { text: offersText });
        console.log('Website message sent successfully');
    } catch (error) {
        console.error('Failed to send website message:', error);
    }
};
