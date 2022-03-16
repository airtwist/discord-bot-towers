import {TimeSpan} from "./TimeSpan";
import {CronJob} from "cron";

export class TowerTimer {
    layerName = "";
    startTime: TimeSpan;
    private onElapsed: (timer: TowerTimer) => void;
    private scheduleJob: CronJob | null = null;
    private repeatableJob: CronJob | null = null;

    constructor(layerName: string, scheduleTimerStart: TimeSpan, onElapsed: (timer: TowerTimer) => void) {
        this.layerName = layerName;
        this.startTime = scheduleTimerStart;
        this.onElapsed = onElapsed;

    }


    schedule() {
        this.scheduleJob = new CronJob(
            `${this.startTime.minutes} ${this.startTime.hours} * * * `,
            () => {
                this.startRepeatableJob();
                this.onElapsed(this)
            },null,true,`Europe/Berlin`)
        this.scheduleJob.start()
    }

    private startRepeatableJob() {

        //var cronRepeatablePattern = "*/10 * * * * *";
         var cronRepeatablePattern = "0 */6 * * *";
        this.repeatableJob = new CronJob(cronRepeatablePattern, () => {
            this.onElapsed(this);
        })
        this.repeatableJob.start();

    }

    cancel() {
        if (this.repeatableJob?.running) {
            this.repeatableJob.stop();
            this.repeatableJob = null;
        }
        if (this.scheduleJob?.running) {
            this.scheduleJob.stop();
            this.repeatableJob = null;
        }
    }
}