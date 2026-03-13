
import { Time } from "../entities/Time";
export interface ItimeService {
    findFullTime(timeID: number): Promise<Time>
}