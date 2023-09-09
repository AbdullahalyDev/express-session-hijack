import express from "express";
export default class SessionClass {
    static config(callback?: () => void): (request: express.Request) => Promise<void>;
}
