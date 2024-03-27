import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Constants } from "../constants.class";
import { LoggerService } from "./logger.service";

@Injectable()
export class WebsocketService {
    public static async motionDetected(name: string) {
        try {
            await axios.post<void>(`${Constants.WEBSOCKET_PATH}/channel/motion`, {name: name});
        }
        catch (err) {
            console.log(err);
            LoggerService.logError(err, "websocket");
        }
    }
}