module.exports = async (sock, sender) => {
    const packagesText = `
**Photography Packages:**

**Model Photography:**
1. **Lite Package**
   - Duration: 1 hour
   - 10 edited photos
   - Price: Rs:6000/=

2. **Simple Package**
   - Duration: 2 hours
   - 20 edited photos
   - Price: Rs:8000/=

3. **Standard Package**
   - Duration: 3 hours
   - 30 edited photos
   - Price: Rs:10000/=

**Birthday Photography:**
1. **Lite Package**
   - Duration: 1 hour
   - 15 edited photos
   - Price: Rs:7000/=

2. **Simple Package**
   - Duration: 2 hours
   - 25 edited photos
   - Price: Rs:9000/=

3. **Standard Package**
   - Duration: 3 hours
   - 35 edited photos
   - Price: Rs:11000/=

**Event Photography:**
1. **Lite Package**
   - Duration: 3 hours
   - 50 edited photos
   - Price: Rs:8000/=

2. **Simple Package**
   - Duration: 4 hours
   - 70 edited photos
   - Price: Rs:15000/=

3. **Standard Package**
   - Duration: 6 hours
   - 100 edited photos
   - Price: Rs:20000/=

**Additional Services:**
1. **Photo Editing**
   - Per photo: Rs:100/=

2. **Photo Retouching**
   - Per photo: Rs:500/=

3. **Video Editing**
   - Starting price: Rs:2000/=

For custom quotes or more details, please contact us directly.
`;

    try {
        await sock.sendMessage(sender, { text: packagesText });
        console.log('Packages message sent successfully');
    } catch (error) {
        console.error('Failed to send packages message:', error);
    }
};
