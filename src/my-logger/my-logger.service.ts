import { Injectable, ConsoleLogger, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPormises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger{

    async logToFile(entry){
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Chicago'
        }).format(new Date())}\t${entry}\n`

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))){
                await fsPormises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPormises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry)
        }catch(e) {
            if (e instanceof Error) console.error(e.message)
        }
    }

    log(message: any, context?: string){
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }

    error(message: any, stackOrContext?: string){
        const entry = `${stackOrContext}\t${message}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
