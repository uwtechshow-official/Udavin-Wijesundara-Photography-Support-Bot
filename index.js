const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const config = require('./config');

async function startBot() {
    console.clear();
    console.log('Connecting to WhatsApp...');

    try {
        const { state, saveCreds } = await useMultiFileAuthState('Session');
        const sock = makeWASocket({ auth: state });

        sock.ev.on('creds.update', saveCreds);
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                console.log('Scan the QR code below to authenticate:');
                qrcode.generate(qr, { small: true });
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    console.log('Connection closed, attempting to reconnect...');
                    setTimeout(startBot, 5000);
                }
            } else if (connection === 'open') {
                console.clear();
                console.log('Connected to WhatsApp');

                const botNumber = `${config.botNumber}@s.whatsapp.net`;

                try {
                    await sock.sendMessage(botNumber, { text: 'Bot Connected Successfully' });
                    console.log('Connected message sent');
                } catch (error) {
                    console.error('Failed to send initial message:', error);
                }
            }
        });

        sock.ev.on('messages.upsert', async (m) => {
            const messages = m.messages || [];
            for (const message of messages) {
                try {
                    if (!message || !message.key || !message.message) {
                        continue;
                    }

                    const text = message.message.conversation || message.message.extendedTextMessage?.text || '';
                    const sender = message.key.remoteJid;

                    if (text.startsWith('.')) {
                        await handleCommands(sender, text, sock);
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            }
        });

        const handleCommands = async (sender, text, sock) => {
            switch (text.toLowerCase()) {
                case '.start':
                    await sendMenu(sender, sock);
                    break;
                case '.website':
                    await require('./plugins/website')(sock, sender);
                    break;
                case '.packages':
                    await require('./plugins/packages')(sock, sender);
                    break;
                case '.booking':
                    await require('./plugins/booking')(sock, sender);
                    break;
                case '.pricing':
                    await require('./plugins/pricing')(sock, sender);
                    break;
                case '.contact':
                    await require('./plugins/contact')(sock, sender);
                    break;
                case '.offers':
                    await require('./plugins/offers')(sock, sender);
                    break;
                default:
                    await sock.sendMessage(sender, { text: 'Unknown command. Type .menu to see available commands.' });
            }
        };

        const sendMenu = async (sender, sock) => {
            const videoPath = './media/welcome.mp4';
            const captionText = `
Choose an option from the menu below:

1. Website - View our Website
2. Packages - View our Packages
3. Book a Session - Schedule a session
4. Pricing - Check our pricing
5. Contact - Contact us
6. Special Offers - See special offers

Type the command corresponding to the option you want.
The commands are 
1. .website - View our Website
2. .packages - View our Packages
3. .booking - Schedule a session
4. .pricing - Check our pricing
5. .contact - Contact us
6. .offers - See special offers
`;

            try {
                await sock.sendMessage(sender, {
                    video: fs.readFileSync(videoPath),
                    caption: captionText,
                    mimetype: 'video/mp4'
                });

                console.log('Menu message and video sent successfully');
            } catch (error) {
                console.error('Failed to send menu message and video:', error);
            }
        };

    } catch (error) {
        console.error('Failed to start bot:', error);
    }
}

startBot();
