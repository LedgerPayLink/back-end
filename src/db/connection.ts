import { connect } from 'mongoose';
import * as Mongoose from "mongoose";


const dbURI = "mongodb://localhost/ledger-pay-link?retryWrites=true&w=majority"
export function connectToDb(): Promise<boolean> {
    return connect(dbURI)
        .then(() => true)
        .catch(err => {
            console.log(err);
            return false;
        });
}
