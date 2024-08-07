module.exports = async (sock, sender) => {
    const contactText = `
You can contact us through the following:

1. **Email**: hello@udavinwijesundaraphotography.com
2. **Phone**: +94758900210
3. **WhatsApp**: https://wa.link/xz9i65
4. **WhatsApp**: https://wa.link/gljtph
5. **Instagram**: https://instagram.com/udavinwijesundaraphotography
6. **Facebook**: https://shorturl.at/md0bG
7. **Website**: https://www.udavinwijesundaraphotography.com

Feel free to reach out if you have any questions!
`;

    try {
        await sock.sendMessage(sender, { text: contactText });
        console.log('Contact message sent successfully');
    } catch (error) {
        console.error('Failed to send contact message:', error);
    }
};
