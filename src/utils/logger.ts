enum LogType {
    INFO,
    WARN,
    ERROR
}

const writeLog = (type: LogType = LogType.INFO, screen: string = '', message: any = '', traceData?: any) => {
    if (!traceData) {
        console.log(`[${LogType[type]}][${screen.toUpperCase()}]: ${message}`);
    } else {
        console.log(`[${LogType[type]}][${screen.toUpperCase()}]: ${message} =>`, JSON.stringify(traceData));
    }
}

const info = (screen: string = 'App', message: any = '', traceData?: any) => {
    writeLog(LogType.INFO, screen, message, traceData);
}

const warn = (screen: string = 'App', message: any = '', traceData?: any) => {
    writeLog(LogType.WARN, screen, message, traceData);
}

const error = (screen: string = 'App', message: any = '', traceData?: any) => {
    writeLog(LogType.ERROR, screen, message, traceData);
}

export {info, warn, error}