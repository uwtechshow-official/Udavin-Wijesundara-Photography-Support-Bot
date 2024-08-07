module.exports = async (sock, sender) => {
    const pricingText = `
Our pricing is as follows:

**Model Photography:**
1. **Lite Package** - Starting Prices From Rs:6000/=
2. **Simple Package** - Starting Prices From Rs:8000/=
3. **Standard Package** - Starting Prices From Rs:10000/=

**Birthday Photography:**
1. **Lite Package** - Starting Prices From Rs:7000/=
2. **Simple Package** - Starting Prices From Rs:9000/=
3. **Standard Package** - Starting Prices From Rs:11000/=

**Event Photography:**
1. **Lite Package** - Starting Prices From Rs:8000/=
2. **Simple Package** - Starting Prices From Rs:15000/=
3. **Standard Package** - Starting Prices From Rs:20000/=

**Additional Services:**
1. **Photo Editing** - Starting Prices From Rs:100/= (Per Image)
2. **Photo Retouching** - Starting Prices From Rs:500/= (Per Image)
3. **Video Editing** - Starting Prices From Rs:2000/= (Per Video)

For custom quotes or more details, please contact us directly.
`;

    try {
        await sock.sendMessage(sender, { text: pricingText });
        console.log('Pricing message sent successfully');
    } catch (error) {
        console.error('Failed to send pricing message:', error);
    }
};
