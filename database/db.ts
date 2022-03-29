import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooConnect = {
    isConnect: 0
}

export const connect = async() => {
    if (mongooConnect.isConnect) {
        console.log("Connected to database!")
        return;
    }

    if (mongoose.connections.length > 0) {
        mongooConnect.isConnect = mongoose.connections[0].readyState;

        if (mongooConnect.isConnect === 1) {
            console.log("Using last connection")
            return;
        }
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnect.isConnect = 1;
    console.log("Connected to MongoDB: ", process.env.MONGO_URL)
}

export const disconnect = async() => {
    if (process.env.NODE_ENV === 'development') return;
    if (mongooConnect.isConnect === 0) return;

    await mongoose.disconnect();
    console.log("Disconnected from DB")
}