import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnect = {
    isConnect: 0
}

export const connect = async() => {
    if (mongoConnect.isConnect) {
        console.log("Connected to database!")
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnect.isConnect = mongoose.connections[0].readyState;

        if (mongoConnect.isConnect === 1) {
            console.log("Using last connection")
            return;
        }
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnect.isConnect = 1;
    console.log("Connected to MongoDB: ", process.env.MONGO_URL)
}

export const disconnect = async() => {
    if (process.env.NODE_ENV === 'development') return;
    if (mongoConnect.isConnect === 0) return;

    await mongoose.disconnect();
    mongoConnect.isConnect = 0;
    console.log("Disconnected from DB")
}