import { Injectable } from "@nestjs/common";
import { LoggerService } from "src/common/services/logger.service";
import { WebsocketService } from "src/common/services/websocket.service";

const SMTPServer = require("smtp-server").SMTPServer;

@Injectable()
export class EmailServerService {
    private server: any; // Declare server instance

    constructor() {
        // Initialize SMTP server
        this.server = new SMTPServer({
            secure: false,
            authOptional: true,
            name: "cobra.example.com",
            onConnect(session, callback) {
                console.log(session.remoteAddress);
                return callback();
            },
            onClose(session) {
                console.log("closed connection");
            },
            onData(stream, session, callback) {
                console.log("got data");
                let data: string = '';
                stream.on('data', (chunk) => {
                    if (data.indexOf("Subject:") == -1) {
                        data += chunk;
                    }
                });
                stream.on('end', () => {
                    console.log('Received email:', data);
                    EmailServerService.sendToClient(data);
                    callback();
                });
            }
        });

        // Start the SMTP server
        this.server.listen(25, () => {
            console.log('SMTP server started');
        });

        // Handle errors
        this.server.on('error', (err: any) => {
            console.error('SMTP server error:', err);
            LoggerService.logError(err, "SMTP server");
        });
    }

    public static async sendToClient(data: string): Promise<void> {
        const start: number = data.indexOf("Subject:") + 9;
        const end: number = data.indexOf("Sendor:") - 2;
        WebsocketService.motionDetected(data.substring(start, end));
    }


}